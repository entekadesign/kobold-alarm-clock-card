import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import type { CardConfig, NextAlarmObject, TimeObject, AlarmActionsObject, Duration } from './types';

// HA types
import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";

export class AlarmController {

    private _hass: any;
    private _config: CardConfig;
    private _isAlarmRinging: boolean = false;
    private readonly _mappingMediaPlayer = { 'turn_on': 'media_play', 'turn_off': 'media_pause' };
    private _setAlarmRinging: (state: boolean) => void;
    private _cardId?: string;
    private _alarmActionsScript?: Array<Record<string, boolean>> = [];

    constructor(config: CardConfig, cardId?: string) {

        this._cardId = cardId;
        this._config = config; // TODO: make a copy here?

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
            this._alarmActionsScript = [];
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
            // new nextAlarm will set nap, snooze, and overridden to default settings
            const dayTomorrow = dayjs().add(1, 'day').format('dd').toLowerCase();
            const dayToday = dayjs().format('dd').toLowerCase();
            const forToday = dayjs().format('HH:mm:ss') < this._config[dayToday].time;
            const newAlarm = forToday ? this._config[dayToday] : this._config[dayTomorrow];
            keyValue = AlarmController.createNextAlarm(newAlarm, forToday);
            // const momentTomorrow = dayjs().add(1, 'day');
            // const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()]; //create accessor?
            // keyValue = AlarmController.createNextAlarm(alarmTomorrow);
        }
        this._saveConfig('next_alarm', keyValue);
    }

    static createNextAlarm(alarm: TimeObject, forToday = false): NextAlarmObject {
        // console.log('*** createnextalarm fired');
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
        // console.log('*** getting nextAlarm: ', this._config.next_alarm);// new Date().toJSON());
        const nextAlarm = Object.assign({}, this._config.next_alarm); // TODO: necessary to make a copy? this should happen when saving, not now, right?
        // const nextAlarm = this._config.next_alarm;
        if (!nextAlarm) {
            console.warn('*** get nextAlarm; NextAlarm undefined: returning default config');
            return Helpers.defaultConfig.next_alarm;
        }
        return nextAlarm;
    }

    get isAlarmEnabled() {
        // console.log('*** checking whether alarm enabled');
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
            // console.log('*** saveConfig(); lovelace: ', lovelace);
            // console.log('*** saveConfig(); this: ', this);
            const newConfig = structuredClone(lovelace.config);
            const cardConfig = Helpers.findNested(newConfig, 'type', 'custom:kobold-alarm-clock-card');
            if (cardConfig && cardConfig[key] !== undefined) {
                cardConfig[key] = value;
                cardConfig.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
                // console.log('*** saveConfig on controller(); last_updated: ', this._config.last_updated);

                await lovelace.saveConfig(newConfig);
            } else throw { message: 'Unable to find Kobold card in lovelace configuration or kobold card config is corrupt' };
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

        // console.log('*** evaluate(); config: ', this._config);

        // if (dayjs().format('HH:mm') === '23:58' && nextAlarm.date <= dateToday) {
        // if nextAlarm has passed, reset alarm
        // const myA = dayjs().subtract(1, "minute").format("HH:mm:ss") > nextAlarm.time && nextAlarm.date === dateToday;
        // const myB = nextAlarm.date < dateToday;
        // console.log('*** nextAlarm date is today & time is past: ' + myA + '; nextAlarm date before today: ' + myB + '; alarm not ringing: ' + !this.isAlarmRinging());
        // console.log('*** nextAlarm date is today: ', nextAlarm.date === dateToday);
        // console.log('*** nextAlarm date: ', nextAlarm.date);
        // console.log('*** date today: ', dateToday);
        // console.log('*** nextAlarm time is past: ', dayjs().subtract(1, "minute").format("HH:mm:ss") > nextAlarm.time);
        // if time now is later than alarm, reset nextAlarm (should only happen if continuous operation of Kobold is interrupted)
        if ((nextAlarm.date < dateToday || (dayjs().subtract(1, 'minute').format('HH:mm:ss') > nextAlarm.time && nextAlarm.date === dateToday)) && !this.isAlarmRinging()) {
            this.nextAlarmReset();
            if (this._config.debug) {
                console.warn('*** _evaluate(); Resetting nextAlarm');
                this._hass.callService('system_log', 'write', { 'message': '*** Resetting nextAlarm', 'level': 'info' });
            }
        }

        // if (!this._config.alarms_enabled && !nextAlarm.nap) {
        //     return;
        // }

        // if (!nextAlarm.enabled) {
        //     return;
        // }

        // console.log('*** evaluate(); alarmActionsScript: ', this._alarmActionsScript);

        if (!this.isAlarmEnabled) return;

        // console.log('*** _evaluate(); alarm enabled');

        // console.log('*** _evaluate(); snooze: ' + nextAlarm.snooze + '; nap: ' + nextAlarm.nap + '; actions: ' + this._config.alarm_actions);

        if (!this.isAlarmRinging() && dayjs().format('HH:mm:ss') >= nextAlarm.time && nextAlarm.date === dateToday) {
            this._setAlarmRinging(true);
        } else if (this.isAlarmRinging()) {
            // dismiss alarm after alarm_duration_default time elapses
            if (dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(this._config.alarm_duration_default)).format('HH:mm:ss') <= dayjs().format('HH:mm:ss')) {
                // console.log('*** _evaluate(); dismissing ringing automatically');
                this.dismiss();
            }
            // NOTE: alarm_actions don't execute during nap or snooze
        } else if (!nextAlarm.snooze && !nextAlarm.nap && this._config.alarm_actions) {
            // console.log('*** _evaluate(); not ringing, no nap, no snooze alarm actions present');
            // this._config.alarm_actions
            //     .filter(action => action.when !== 'on_snooze' && action.when !== 'on_dismiss' && !this._alarmActionsScript[`${action.entity}-${action.when}`])
            //     .filter(action => dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(Helpers.convertToMinutes(action.when))).format('HH:mm:ss') <= dayjs().format('HH:mm:ss'))
            //     .forEach(action => this._runAction(action));
            this._config.alarm_actions
                .filter(action => action.when !== 'on_snooze' && action.when !== 'on_dismiss' && !this._alarmActionsScript[`${action.entity}-${action.when}`])
                .forEach(action => {
                    let myDuration: Duration = structuredClone(action.offset);
                    if (action.negative && action.offset) {
                        myDuration = { hours: myDuration.hours *= -1, minutes: myDuration.minutes *= -1, seconds: myDuration.seconds *= -1 };
                    }
                    // console.log('*** _evaluate(); alarm action time: ', dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(myDuration)).format('HH:mm:ss'));
                    if (dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(myDuration)).format('HH:mm:ss') <= dayjs().format('HH:mm:ss')) {
                        this._runAction(action);
                        // console.log('*** _evaluate(); alarm action triggered for: ', action);
                    }
                    // dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(Helpers.convertToMinutes(action.when))).format('HH:mm:ss') <= dayjs().format('HH:mm:ss'))
                    // .forEach(action => this._runAction(action));
                });
        }
    }

    _runAction(action: AlarmActionsObject) {
        const myAction = {
            service: 'homeassistant.turn_on',
            ...action
        }
        const actionServiceCommand = myAction.service.split('.');
        this._hass.callService(actionServiceCommand[0], actionServiceCommand[1], { "entity_id": myAction.entity });
        this._alarmActionsScript[`${myAction.entity}-${myAction.when}`] = true;
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


    // from source: frontend/src/common/config/version.ts
    // @param version (this._hass.config.version)
    // @param major (major version number)
    // @param minor (minor version number)
    // @returns boolean
    static atLeastVersion = (
        version: string,
        major: number,
        minor: number,
        patch?: number
    ): boolean => {
        // if (__DEMO__) {
        //     return true;
        // }

        const [haMajor, haMinor, haPatch] = version.split(".", 3);

        return (
            Number(haMajor) > major ||
            (Number(haMajor) === major &&
                (patch === undefined
                    ? Number(haMinor) >= minor
                    : Number(haMinor) > minor)) ||
            (patch !== undefined &&
                Number(haMajor) === major &&
                Number(haMinor) === minor &&
                Number(haPatch) >= patch)
        );
    };

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
        next_alarm: { enabled: false, time: "07:00:00", date: dayjs().add(1, 'day').format('YYYY-MM-DD'), date_time: dayjs().add(1, 'day').format('YYYY-MM-DD') + " 07:00:00", overridden: false },
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