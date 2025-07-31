import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import type { CardConfig, NextAlarmObject, TimeObject, Duration } from './types';

// HA types
import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";

export class AlarmController {

    private _hass: any;
    private _config: CardConfig;
    private _isAlarmRinging: boolean = false;
    private readonly _mappingMediaPlayer = { 'turn_on': 'media_play', 'turn_off': 'media_pause' };
    private _setAlarmRinging: (state: boolean) => void;
    private _cardId?: string;
    private _alarmActionsScripts?: Array<Record<string, boolean>> = [];

    constructor(config: CardConfig, cardId?: string) {

        this._cardId = cardId;
        this._config = config;

        this._setAlarmRinging = Helpers.throttle((state) => {
            if (state) {
                this._isAlarmRinging = true;
                this._callAlarmRingingService('turn_on');
            } else {
                this._isAlarmRinging = false;
                this._callAlarmRingingService('turn_off');
            }
        }, 1000);
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
        this._evaluate();
    }

    snooze() {
        this._setAlarmRinging(false);
        // allow animations to complete before saving
        window.setTimeout(() => {
            this.nextAlarmReset(true);// TODO: should not refer directly to config, rather to accessors on this controller; same everywhere
        }, 250);
        if (this._config.alarm_actions) {
            this._config.alarm_actions
                .filter((action) => action.when === 'on_snooze')
                .forEach(action => this._runAction(action));
        }
    }

    dismiss() {
        this._setAlarmRinging(false);
        // console.log('*** dismiss fired');
        // allow animations to complete before saving
        window.setTimeout(() => {
            this.nextAlarmReset();// TODO: should not refer directly to config, rather to accessors on this controller; same everywhere
        }, 250);

        if (this._config.alarm_actions) {
            this._config.alarm_actions
                .filter((action) => action.when === 'on_dismiss')
                .forEach(action => this._runAction(action));
            this._alarmActionsScripts = [];
        }
    }

    // snoozeConfig(snoozeDuration: Duration) {
    //     const nextAlarmTime = dayjs().add(dayjs.duration(snoozeDuration));
    //     const keyValue = {
    //         overridden: true,
    //         snooze: true,
    //         enabled: true,
    //         time: nextAlarmTime.format('HH:mm:ss'),
    //         date: nextAlarmTime.format('YYYY-MM-DD'),
    //         date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss')
    //     }
    //     // console.log('*** time now: ' + dayjs().format('HH:mm:ss') + '; new nextAlarm time: ' + keyValue.time);
    //     this._saveConfig('next_alarm', keyValue);
    // }

    //TODO: Rename or combine with createNextAlarmNew? why is createnextalarmnew called here and again in set nextAlarm? move this code to editor?
    // dismissConfig() {
    //     const momentTomorrow = dayjs().add(1, 'day');
    //     const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()]; //create accessor?
    //     const keyValue = AlarmController.createNextAlarmNew(alarmTomorrow);
    //     this._saveConfig('next_alarm', keyValue);
    // }

    // TODO: snoozeconfig and dismissconfig should maybe be setters on this controller, since they modify and save config
    nextAlarmReset(snooze = false) {
        // console.log('*** nextAlarmReset fired');
        let keyValue;
        if (snooze) {
            const nextAlarmTime = dayjs().add(dayjs.duration(this._config.snooze_duration_default));
            keyValue = {
                overridden: true,
                snooze: true,
                enabled: true,
                time: nextAlarmTime.format('HH:mm:ss'),
                date: nextAlarmTime.format('YYYY-MM-DD'),
                date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss')
            }
        } else {
            const momentTomorrow = dayjs().add(1, 'day');
            const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()]; //create accessor?
            keyValue = AlarmController.createNextAlarm(alarmTomorrow);
        }
        this._saveConfig('next_alarm', keyValue);
    }

    static createNextAlarm(alarm: TimeObject, forToday = false): NextAlarmObject {
        let alarmDate = dayjs();
        if (!((alarm.time >= alarmDate.format('HH:mm:ss')) && forToday)) {
            alarmDate = alarmDate.add(1, 'day');
        }

        return {
            ...alarm,
            date: alarmDate.format('YYYY-MM-DD'),
            date_time: `${alarmDate.format('YYYY-MM-DD')} ${alarm.time}`,
        }
    }

    set nextAlarm(alarm: TimeObject) {
        // console.log('*** set nextAlarm on contoller');
        const forToday = true;
        const keyValue = {
            ...AlarmController.createNextAlarm(alarm, forToday),
            overridden: true
        };
        this._saveConfig('next_alarm', keyValue);
    }

    get nextAlarm(): NextAlarmObject {
        const nextAlarm = Object.assign({}, this._config.next_alarm); // TODO: necessary to make a copy? this should happen when saving, not now, right?
        if (!nextAlarm) {
            console.warn('*** get nextAlarm; NextAlarm undefined: returning default config');
            return Helpers.defaultConfig.next_alarm;
        }
        return nextAlarm;
    }

    get isAlarmEnabled() {
        const nextAlarm = this.nextAlarm;

        if (nextAlarm.overridden && nextAlarm.enabled) {
            return true;
        }
        return this._config.alarms_enabled && nextAlarm.enabled;
    }

    set hideCardsDefault(keyValue) {
        // console.log('*** saving hide_cards_default: ', keyValue);
        this._saveConfig('hide_cards_default', keyValue);
    }

    async _saveConfig(key, value) {
        try {
            const lovelace = Helpers.getLovelace().lovelace;
            const newConfig = structuredClone(lovelace.config);
            const cardConfig = Helpers.findNested(newConfig, 'type', 'custom:kobold-alarm-clock-card');
            if (cardConfig && cardConfig[key] !== undefined) {
                cardConfig[key] = value;
                cardConfig.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');

                await lovelace.saveConfig(newConfig);
            } else throw { message: 'Unable to find kobold card in lovelace configuration' };
        } catch (err: any) {
            alert(`Saving failed: ${err.message}.`);
        }
    }

    isAlarmRinging() {
        return this._isAlarmRinging;
    }

    evaluateAlarms() {
        this._evaluate();
    }

    _evaluate() {
        // console.log('*** isAlarmRinging: ', this.isAlarmRinging());

        const nextAlarm = this.nextAlarm;
        const dateToday = dayjs().format('YYYY-MM-DD');

        // if day is ending and nextAlarm is not set for tomorrow, then reset nextAlarm
        // if (dayjs().format('HH:mm') === '23:58' && nextAlarm.date <= dateToday) {
        // if nextAlarm has passed, reset alarm
        if (dayjs().subtract(1, 'minute').format('HH:mm:ss') > nextAlarm.time && nextAlarm.date <= dateToday && !this.isAlarmRinging()) {
            // console.log('*** alarm resetting automatically');
            this.nextAlarmReset();
            // if (this._config.debug) {
            //     console.warn('*** _evaluate(); No nextAlarm for tomorrow; resetting nextAlarm');
            //     this._hass.callService('system_log', 'write', { 'message': '*** No nextAlarm for tomorrow; resetting nextAlarm', 'level': 'info' });
            // }
        }

        if (!this._config.alarms_enabled && !nextAlarm.nap) {
            return;
        }

        if (!nextAlarm.enabled) {
            return;
        }
        if (!this.isAlarmRinging() && dayjs().format('HH:mm:ss') >= nextAlarm.time && nextAlarm.date === dateToday) {
            this._setAlarmRinging(true);
        } else if (this.isAlarmRinging()) {
            // dismiss alarm after alarm_duration_default time elapses
            if (dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(this._config.alarm_duration_default)).format('HH:mm:ss') <= dayjs().format('HH:mm:ss')) {
                this.dismiss();
            }
            // NOTE: alarm_actions don't execute during nap or snooze
        } else if (!nextAlarm.snooze && !nextAlarm.nap && this._config.alarm_actions) {
            this._config.alarm_actions
                .filter(action => action.when !== 'on_snooze' && action.when !== 'on_dismiss' && !this._alarmActionsScripts[`${action.entity}-${action.when}`])
                .filter(action => dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(Helpers.convertToMinutes(action.when))).format('HH:mm:ss') <= dayjs().format('HH:mm:ss'))
                .forEach(action => this._runAction(action));
        }
    }

    _runAction(action: Record<'entity' | 'when', string>) {
        const tempAction = {
            service: 'homeassistant.turn_on',
            ...action
        }
        const actionServiceCommand = tempAction.service.split('.');
        this._hass.callService(actionServiceCommand[0], actionServiceCommand[1], { "entity_id": tempAction.entity });
        this._alarmActionsScripts[`${tempAction.entity}-${tempAction.when}`] = true;
    }

    _callAlarmRingingService(action: string) {
        if (this._config.debug) {
            this._hass.callService('system_log', 'write', { 'message': '*** _callAlarmRingingService; action: ' + action + '; editor ID: ' + this._cardId, 'level': 'info' });
        }
        try {
            if (this._config.alarm_entities) {
                this._config.alarm_entities.forEach(entity => {
                    const entityState = this._hass.states[entity].state;
                    if (entity.startsWith('media_player')) {
                        if ((action === 'turn_on' && entityState !== 'on') || (action === 'turn_off' && entityState !== 'off')) {
                            this._hass.callService('media_player', this._mappingMediaPlayer[action], { 'entity_id': entity });
                        }
                    } else {
                        if ((action === 'turn_on' && entityState !== 'on') || (action === 'turn_off' && entityState !== 'off')) {
                            this._hass.callService('homeassistant', action, { 'entity_id': entity });
                        }
                    }
                });
            }
        }

        catch (err) {
            if (this._config.debug) {
                this._hass.callService('system_log', 'write', { 'message': '*** _callAlarmRingingService; Error while calling service: ' + err, 'level': 'info' });
            }
            console.warn('*** _callAlarmRingingService(); Error while calling service: ' + err);
            return;
        }
    }
}

export class Helpers {
    static fireEvent = (event, detail = undefined, element = this.getLovelace()) => {
        element.dispatchEvent(new CustomEvent(event, { detail, bubbles: true, cancelable: false, composed: true, }));
    }

    static deepMerge(obj1, obj2) {
        const result = { ...obj1 };

        for (let key in obj2) {
            if (obj2.hasOwnProperty(key)) {
                if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
                    result[key] = this.deepMerge(obj1[key], obj2[key]);
                } else {
                    result[key] = obj2[key];
                }
            }
        }

        return result;
    }

    // returns object containing all and only changed properties
    static deepCompareObj(original, current) {
        if (original === current) return null;

        // Handle non-object types (including null)
        if (
            typeof original !== 'object' ||
            typeof current !== 'object' ||
            original === null ||
            current === null
        ) {
            return current;
        }

        const changes = {};
        let hasChanges = false;

        // Check for changes in current object
        for (const key of Object.keys(current)) {
            if (!(key in original)) {
                changes[key] = current[key];
                hasChanges = true;
                continue;
            }

            const diff = this.deepCompareObj(original[key], current[key]);
            if (diff !== null) {
                changes[key] = diff;
                hasChanges = true;
            }
        }

        // Check for deleted keys
        for (const key of Object.keys(original)) {
            if (!(key in current)) {
                changes[key] = undefined;
                hasChanges = true;
            }
        }

        return hasChanges ? changes : null;
    }

    static findNested(obj, key, val) {
        let found;
        JSON.stringify(obj, (_, nestedVal) => {
            if (nestedVal && nestedVal[key] === val) {
                found = nestedVal;
            }
            return nestedVal;
        });
        return found;
    };

    static getHa = () => {
        let root: any = document.querySelector('home-assistant');
        return root;
    }

    static getEditor = () => {
        let root: any = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-dialog-edit-card');
        // console.log('*** getEditor(); root: ', root);
        return root;
    };

    static getPreview = () => {
        let root: any = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-dialog-edit-card');
        root = root && root.shadowRoot;
        root = root && root.querySelector('div.element-preview');
        // console.log('*** getPreview(); root: ', root);
        return root;
    };

    static getEditorButtons = () => {
        let root: any = this.getEditor();
        root = root && root.shadowRoot;
        root = root && root.querySelector('div[slot="primaryAction"]');
        // console.log('*** getEditorButtons(); root: ', root);
        return root;
    }

    static getLovelace = () => {
        let root: any = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('home-assistant-main');
        root = root && root.shadowRoot;
        root = root && root.querySelector('ha-panel-lovelace');
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-root');
        // console.log('*** getLovelace(); root: ', root);
        return root;
    };

    static getDrawer = () => {
        let root: any = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('home-assistant-main');
        root = root && root.shadowRoot;
        root = root && root.querySelector('ha-drawer');
        root = root && root.shadowRoot;
        root = root && root.querySelector('aside');
        // console.log('*** getDrawer(); root: ', root);
        return root;
    };

    static throttle<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
        let timerFlag = null;
        return (...args: T) => {
            if (timerFlag === null) {
                fn(...args);
                timerFlag = setTimeout(() => {
                    timerFlag = null;
                }, delay);
            }
        };
    }

    static convertToMinutes(HHMM: string): { 'minutes': number } {
        // HHMM is a string in the format "HH:MM" (e.g., "08:30", "-08:30", "00:00", "12:00")
        const [H, M] = HHMM.split(":").map(val => parseInt(val));
        // https://dev.to/emnudge/identifying-negative-zero-2j1o
        let minutes = Math.abs(H) * 60 + M; minutes *= Math.sign(1 / H || H);
        return { 'minutes': minutes };
    };

    static updateHeight(element: LovelaceCard): boolean {
        if (this._updateHeightOnNormalCard(element)) return true;
        if (this._updateHeightOnNestedCards(element)) return true;
        if (this._updateHeightOnMediaControlCards(element)) return true;
        return false;
    }
    static _updateHeightOnNormalCard(element: LovelaceCard) {
        if (element.shadowRoot) {
            let cardTag: LovelaceCard = element.shadowRoot.querySelector('ha-card');
            if (cardTag) {
                cardTag.style.height = "100%";
                cardTag.style.boxSizing = "border-box";
                return true;
            }
        }
        return false;
    }
    static _updateHeightOnNestedCards(element: LovelaceCard) {
        if (element.firstChild && element.children[0].shadowRoot) {
            let cardTag: LovelaceCard = element.children[0].shadowRoot.querySelector('ha-card');
            if (cardTag) {
                cardTag.style.height = "100%";
                cardTag.style.boxSizing = "border-box";
                return true;
            }
        }
        return false;
    }
    static _updateHeightOnMediaControlCards(element: LovelaceCard) {
        if (!element.getAttribute('type-media-control')) return; // TODO: could not find this attribute anywhere in github for HA frontend; eliminate, modify?
        if (element.children[0] && element.children[0].shadowRoot) {
            (element.children[0] as LovelaceCard).style.height = '100%';
            let bannerTag: LovelaceCard = element.children[0].shadowRoot.querySelector('div.banner');
            if (bannerTag) {
                bannerTag.style.boxSizing = "border-box";
                bannerTag.style.height = "calc(100% - 72px)";
                return true;
            }
        }
        return false;
    }

    static defaultConfig: CardConfig = {
        name: "kobold_clock",
        type: "custom:kobold-alarm-clock-card",
        alarms_enabled: false,
        next_alarm: { enabled: false, time: "07:00", date: "", date_time: "", overridden: false },
        mo: { enabled: false, time: "07:00:00" },
        tu: { enabled: false, time: "07:00:00" },
        we: { enabled: false, time: "07:00:00" },
        th: { enabled: false, time: "07:00:00" },
        fr: { enabled: false, time: "07:00:00" },
        sa: { enabled: false, time: "09:00:00" },
        su: { enabled: false, time: "09:00:00" },
        snooze_duration_default: { hours: 0, minutes: 15, seconds: 0 },
        alarm_duration_default: { hours: 0, minutes: 30, seconds: 0 },
        nap_duration: { hours: 0, minutes: 30, seconds: 0 },
        time_format: "12hr",
        clock_display_font: 0,
        hide_cards_default: true,
        debug: false,
    };
}
