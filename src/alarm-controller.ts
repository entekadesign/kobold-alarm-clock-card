import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import { Helpers } from './helpers';
import { localize } from './localize';

import type { CardConfig, NextAlarmObject, TimeObject, AlarmActionsObject, Duration } from './types';

// HA types
import type { HomeAssistant } from "custom-card-helpers";

export class AlarmController {

    private _hass: any;
    private _config: CardConfig;
    private _isAlarmRinging: boolean = false;
    private readonly _mappingMediaPlayer = { 'turn_on': 'media_play', 'turn_off': 'media_pause' };
    private _cardId?: string;
    private _alarmActionsScript?: Array<Record<string, boolean>> = [];
    private _koboldConnected: boolean;
    static oldTabs: boolean;

    static defaultConfig = {
        name: "kobold_clock",
        type: "custom:kobold-alarm-clock-card",
        alarms_enabled: false,
        next_alarm: { ...AlarmController.createNextAlarm({ enabled: false, time: "07:00:00" }), overridden: false },
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
        period_icon: false,
        clock_display_font: 0,
        hide_cards_default: true,
        debug: false,
    };

    static DOMAINS_ALARM_ENTITIES = [
        "input_boolean",
        "switch",
        "media_player"
    ];

    constructor(config: CardConfig, cardId?: string) {
        this._cardId = cardId;
        this._config = config; // TODO: make a copy here instead of get nextAlarm method?
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
        // tab element replacement beginning in HA 2025.10: https://github.com/thomasloven/hass-browser_mod/commit/2288d98896f6a8156b4a921827d7be23d70b4d21
        // console.log('*** _saveConfigEntries; current HA version: ', this._hass.config.version);
        AlarmController.oldTabs = !Helpers.atLeastVersion(this._hass.config.version, 2025, 10, 1);
        this._evaluate();
    }

    snooze() {
        this._throttleAlarmRinging(false);
        // allow animations to complete before saving
        window.setTimeout(() => {
            this.nextAlarmReset(true);
        }, 250);
        if (this._config.alarm_actions) {
            this._config.alarm_actions
                .filter((action) => action.when === 'on_snooze')
                .forEach(action => this._runAction(action));
        }
    }

    dismiss() {
        this._throttleAlarmRinging(false);
        // allow animations to complete before saving
        window.setTimeout(() => {
            this.nextAlarmReset();
        }, 250);

        if (this._config.alarm_actions) {
            this._config.alarm_actions
                .filter((action) => action.when === 'on_dismiss')
                .forEach(action => this._runAction(action));
            this._alarmActionsScript = [];
        }
    }

    nextAlarmReset(snooze = false) {
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
            const dayTomorrow = dayjs().add(1, 'day').format('dd').toLowerCase();
            const dayToday = dayjs().format('dd').toLowerCase();
            const forToday = dayjs().format('HH:mm:ss') < this._config[dayToday].time;
            const newAlarm = forToday ? this._config[dayToday] : this._config[dayTomorrow];
            keyValue = AlarmController.createNextAlarm(newAlarm, forToday);
        }
        if (!!Helpers.deepCompareObj(this.nextAlarm, keyValue)) this.nextAlarm = keyValue;
    }

    _nextAlarmResetThrottled = Helpers.throttle(() => {
        if (this._config.debug) {
            console.warn('*** _evaluate(); Resetting nextAlarm because nextAlarm date is in the past');
            this._hass.callService('system_log', 'write', { 'message': '*** Resetting nextAlarm because nextAlarm date is in the past', 'level': 'info' });
        }
        this.nextAlarmReset();
    }, 1000);

    static createNextAlarm(alarm: TimeObject, forToday = false, overridden = false): NextAlarmObject {
        let alarmDate = dayjs();
        if (!((alarm.time >= alarmDate.format('HH:mm:ss')) && forToday)) {
            alarmDate = alarmDate.add(1, 'day');
        }

        let data: NextAlarmObject = {
            ...alarm,
            date: alarmDate.format('YYYY-MM-DD'),
            date_time: `${alarmDate.format('YYYY-MM-DD')} ${alarm.time}`,
        }

        if (overridden) data.overridden = true;

        return data;
    }

    set koboldConnected(connectedState: boolean) {
        this._koboldConnected = connectedState;
    }

    set configEntries(entries: Object) {
        this._saveConfigEntries(entries);
    }

    set nextAlarm(nextAlarm: NextAlarmObject) {
        // console.log('*** saving nextalarm config');
        this._saveConfigEntries({ next_alarm: nextAlarm });
    }
    get nextAlarm(): NextAlarmObject {
        const nextAlarm = Object.assign({}, this._config.next_alarm); // TODO: make copy  in constructor instead?

        if (!nextAlarm) {
            console.warn('*** get nextAlarm(); NextAlarm undefined: returning default config');
            return AlarmController.defaultConfig.next_alarm;
        }

        // console.log('*** nextAlarm: ', nextAlarm);
        // console.log('*** workday sensor state: ', this._hass.states[this._config.workday_sensor].state);

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
        this.configEntries = { hide_cards_default: keyValue };
    }

    isAlarmRinging() {
        return this._isAlarmRinging;
    }

    evaluateAlarms() {
        this._evaluate();
    }

    _evaluate() {

        if (Helpers.getPreview() || !this._koboldConnected || !window.hassConnection) return;
        // console.log('*** evaluating now');
        // console.log('*** lovelace: ', Helpers.getLovelace().shadowRoot);
        // console.log('*** koboldConnected: ', this._koboldConnected);

        const nextAlarm = this.nextAlarm;
        const dateToday = dayjs().format('YYYY-MM-DD');

        // is nextAlarm in the past?
        if ((nextAlarm.date < dateToday || (dayjs().subtract(1, 'minute') > dayjs(nextAlarm.date_time) && nextAlarm.date === dateToday)) && !this.isAlarmRinging()) {
            this._nextAlarmResetThrottled();
            return;
        }

        // should nextAlarm be disabled because it is a holiday?
        if (this._config.workday_sensor && this._hass.states[this._config.workday_sensor] && this._config.workday_enabled) {

            this._checkWorkdayDate(nextAlarm.date).then((response) => {
                // console.log('*** Workday Sensor response: ' + JSON.stringify(response));
                const nextAlarmIsWorkday = response.response[this._config.workday_sensor].workday;
                if ((!nextAlarmIsWorkday && !nextAlarm.holiday && !nextAlarm.overridden) || (!nextAlarmIsWorkday && nextAlarm.holiday && nextAlarm.enabled && !nextAlarm.overridden)) {
                    this.nextAlarm = {
                        ...nextAlarm,
                        enabled: false,
                        holiday: true
                    };
                } else if (nextAlarmIsWorkday && nextAlarm.holiday) {
                    this._deleteHolilday(nextAlarm);
                };
            }, (error) => {
                if (this._config.debug) {
                    console.error('*** Failed to connect to Workday Sensor: ', error.message);
                    this._hass.callService('system_log', 'write', { 'message': '*** Failed to connect to Workday Sensor: ' + error.message, 'level': 'info' });
                }
            });
        } else {
            if (nextAlarm.holiday) {
                this._deleteHolilday(nextAlarm);
            }
        }

        if (!this.isAlarmEnabled) return;

        // trigger or dismiss alarm?
        if (!this.isAlarmRinging() && dayjs().format('HH:mm:ss') >= nextAlarm.time && nextAlarm.date === dateToday) {
            this._throttleAlarmRinging(true);
            // return;
        } else if (this.isAlarmRinging()) {
            // dismiss alarm after alarm_duration_default time elapses
            if (dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(this._config.alarm_duration_default)).format('HH:mm:ss') <= dayjs().format('HH:mm:ss')) {
                this.dismiss();
            }
            // return;
            // NOTE: alarm_actions don't execute during nap or snooze
        } else if (!nextAlarm.snooze && !nextAlarm.overridden && this._config.alarm_actions) {
            this._config.alarm_actions
                .filter(action => action.when !== 'on_snooze' && action.when !== 'on_dismiss' && !this._alarmActionsScript[`${action.entity}-${action.when}`])
                .forEach(action => {
                    let myDuration: Duration = structuredClone(action.offset);
                    if (action.negative && action.offset) {
                        myDuration = { hours: myDuration.hours *= -1, minutes: myDuration.minutes *= -1, seconds: myDuration.seconds *= -1 };
                    }
                    if (dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(myDuration)).format('HH:mm:ss') <= dayjs().format('HH:mm:ss')) {
                        this._runAction(action);
                        // return;
                    }
                });
        }
    }

    _deleteHolilday = (nextAlarm) => {
        // console.log('deleting holiday');
        delete nextAlarm.holiday;
        this.nextAlarm = nextAlarm;
        this._nextAlarmResetThrottled();
    }

    async _checkWorkdayDate(date: string) {
        //callService(domain: string, service: string, serviceData?: object, target?: HassServiceTarget, notifyOnError?: boolean, returnResponse?: boolean): ServiceCallResponse;
        return await this._hass.callService('workday', 'check_date', { check_date: date }, { entity_id: this._config.workday_sensor }, false, true);
    }

    async _saveConfigEntries(entries) {
        try {
            const lovelace = Helpers.getLovelace().lovelace;
            const newConfig = structuredClone(lovelace.config);
            const tabGroupArry = [...Helpers.getLovelace().shadowRoot.querySelectorAll(AlarmController.oldTabs ? 'sl-tab-group sl-tab' : 'ha-tab-group ha-tab-group-tab')];
            const viewIndex = tabGroupArry.findIndex((tab) => { return tab.hasAttribute('active') });
            const cardConfig = Helpers.findNested(newConfig.views[viewIndex > -1 ? viewIndex : 0], 'type', 'custom:kobold-alarm-clock-card');

            if (cardConfig) {
                Object.keys(entries).forEach(entry => {
                    if (cardConfig[entry] !== undefined) {
                        cardConfig[entry] = entries[entry];
                    } else {
                        console.warn('*** _saveConfigEntries(); Expected configuration entry is undefined');
                    };
                });
                cardConfig.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');

                await lovelace.saveConfig(newConfig);

                Helpers.testUntilTimeout(() => Helpers.getNotification(), 5000)
                    .then(() => {
                        if (Helpers.getNotification().labelText.includes('dashboard was updated')) {
                            Helpers.fireEvent('hass-notification', { message: localize('notification.configuration_updated') }, Helpers.getHa());
                        }
                    }).catch(() => { }); //timed out
            } else throw { message: 'Unable to find Kobold card in lovelace configuration or kobold card config is corrupt' };
        } catch (err: any) {
            // alert(`Saving failed: ${err.message}.`);
            alert(`${localize('error.saving_failed')}: ${err.message}.`);
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

    _throttleAlarmRinging = Helpers.throttle((state) => {
        if (state) {
            this._isAlarmRinging = true;
            this._callAlarmRingingService('turn_on');
        } else {
            this._isAlarmRinging = false;
            this._callAlarmRingingService('turn_off');
        }
    }, 1000);

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
                            // console.log('*** entity: ' + entity + '; action: ' + action);
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
