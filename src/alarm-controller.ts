import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import { Helpers } from './helpers';

import type { CardConfig, NextAlarmObject, TimeObject, AlarmActionsObject, Duration } from './types';

// HA types
import type { HomeAssistant } from "custom-card-helpers";

export class AlarmController {

    private _hass: any;
    private _config: CardConfig;
    private _isAlarmRinging: boolean = false;
    private readonly _mappingMediaPlayer = { 'turn_on': 'media_play', 'turn_off': 'media_pause' };
    // private _throttleAlarmRinging: (state: boolean) => void;
    // private _throttleNextAlarmReset: () => void;
    private _cardId?: string;
    private _alarmActionsScript?: Array<Record<string, boolean>> = [];

    static defaultConfig = (nextAlarm = { enabled: false, time: "07:00:00", date: "2013-09-17", date_time: "2013-09-17 07:00:00" }): CardConfig => {
        return {
            name: "kobold_clock",
            type: "custom:kobold-alarm-clock-card",
            alarms_enabled: false,
            next_alarm: { ...nextAlarm, overridden: false },
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
            // dark_mode: false,
            clock_display_font: 0,
            hide_cards_default: true,
            debug: false,
        }
    };

    static DOMAINS_ALARM_ENTITIES = [
        "input_boolean",
        "switch",
        "media_player"
    ];

    constructor(config: CardConfig, cardId?: string) {

        this._cardId = cardId;
        this._config = config; // TODO: make a copy here?

        // this._throttleNextAlarmReset = Helpers.throttle(() => {
        //     this.nextAlarmReset();
        // }, 1000);

        // this._throttleAlarmRinging = Helpers.throttle((state) => {
        //     if (state) {
        //         this._isAlarmRinging = true;
        //         this._callAlarmRingingService('turn_on');
        //     } else {
        //         this._isAlarmRinging = false;
        //         this._callAlarmRingingService('turn_off');
        //     }
        // }, 1000);
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
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
        // console.log('*** dismiss fired');
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
    //     this._saveConfigEntry('next_alarm', keyValue);
    // }

    //Rename or combine with createNextAlarmNew? why is createnextalarmnew called here and again in set nextAlarm? move this code to editor?
    // dismissConfig() {
    //     const momentTomorrow = dayjs().add(1, 'day');
    //     const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()]; //create accessor?
    //     const keyValue = AlarmController.createNextAlarmNew(alarmTomorrow);
    //     this._saveConfigEntry('next_alarm', keyValue);
    // }

    // _throttleNextAlarmReset = Helpers.throttle(() => {
    //     if (this._config.debug) {
    //         console.warn('*** _evaluate(); Resetting nextAlarm');
    //         this._hass.callService('system_log', 'write', { 'message': '*** Resetting nextAlarm', 'level': 'info' });
    //     }
    //     this.nextAlarmReset();
    // }, 1000);

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
            // new nextAlarm will set snooze, and overridden to default settings
            const dayTomorrow = dayjs().add(1, 'day').format('dd').toLowerCase();
            const dayToday = dayjs().format('dd').toLowerCase();
            const forToday = dayjs().format('HH:mm:ss') < this._config[dayToday].time;
            const newAlarm = forToday ? this._config[dayToday] : this._config[dayTomorrow];
            keyValue = AlarmController.createNextAlarm(newAlarm, forToday);
            // const momentTomorrow = dayjs().add(1, 'day');
            // const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()]; //create accessor?
            // keyValue = AlarmController.createNextAlarm(alarmTomorrow);
        }
        // this._saveConfigEntry('next_alarm', keyValue);
        this.nextAlarm = keyValue;
        // console.log('*** nextAlarmReset; saving new nextAlarm: ', keyValue);
    }

    static createNextAlarm(alarm: TimeObject, forToday = false, overridden = false): NextAlarmObject {
        // console.log('*** createnextalarm fired');
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

    // set nextAlarmOld(alarm: TimeObject) {
    //     // console.log('*** set nextAlarmOld on contoller');
    //     const forToday = true;
    //     const keyValue = {
    //         ...AlarmController.createNextAlarm(alarm, forToday),
    //         overridden: true
    //     };
    //     this._saveConfigEntry('next_alarm', keyValue);
    // }

    // set napDuration(napDuration: Duration) {
    //     // console.log('*** set nextAlarm on contoller');
    //     this._saveConfigEntry('nap_duration', napDuration);
    // }

    set configEntries(entries: Object) {
        this._saveConfigEntries(entries);
    }

    set nextAlarm(nextAlarm: NextAlarmObject) {
        // console.log('*** set nextAlarm on contoller; nextAlarm: ', nextAlarm);
        this._saveConfigEntries({ next_alarm: nextAlarm });
    }
    get nextAlarm(): NextAlarmObject {
        // console.log('*** nextAlarm: ', Helpers.defaultConfig(AlarmController.createNextAlarm({ enabled: false, time: "07:00:00" })).next_alarm);
        // console.log('*** getting nextAlarm before: ', this._config.next_alarm);// new Date().toJSON());
        const nextAlarm = Object.assign({}, this._config.next_alarm); // TODO: necessary to make a copy? this should happen when saving, not now, right?
        // const nextAlarm = this._config.next_alarm;
        if (!nextAlarm) {
            console.warn('*** get nextAlarm(); NextAlarm undefined: returning default config');
            return AlarmController.defaultConfig(AlarmController.createNextAlarm({ enabled: false, time: "07:00:00" })).next_alarm;
        }
        // console.log('*** getting nextAlarm after: ', this._config.next_alarm);// new Date().toJSON());
        return nextAlarm;
    }

    get controllerConfigLastUpdated() {
        return this._config.last_updated;
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
        // this._saveConfigEntry('hide_cards_default', keyValue);
        // this._saveConfigEntries({ hide_cards_default: keyValue });
        this.configEntries = { hide_cards_default: keyValue };
    }

    // async _saveConfigEntry(key, value) {
    //     try {
    //         const lovelace = Helpers.getLovelace().lovelace;
    //         // console.log('*** saveConfigEntry(); lovelace: ', lovelace);
    //         // console.log('*** saveConfigEntry(); this: ', this);
    //         const newConfig = structuredClone(lovelace.config);
    //         const tabGroupArry = [...Helpers.getLovelace().shadowRoot.querySelectorAll('sl-tab-group sl-tab')];
    //         // console.log('*** _saveConfigEntry on controller(); tabGroup: ', tabGroup);
    //         const viewIndex = tabGroupArry.findIndex((tab) => { return tab.hasAttribute('active') });
    //         // console.log('*** _saveConfigEntry on controller(); viewIndex: ', viewIndex);
    //         // console.log('*** _saveConfigEntry on controller(); newCardConfig: ', newConfig.views[viewIndex]);

    //         const cardConfig = Helpers.findNested(newConfig.views[viewIndex > -1 ? viewIndex : 0], 'type', 'custom:kobold-alarm-clock-card');
    //         // console.log('*** _saveConfigEntry(); cardConfig[key]: ', cardConfig[key]);
    //         // console.log('*** _saveConfigEntry(); newConfig: ', newConfig);
    //         if (cardConfig && cardConfig[key] !== undefined) {
    //             cardConfig[key] = value;
    //             // console.log('*** saveConfigEntry on controller(); key: ' + JSON.stringify(key) + '; value: ' + JSON.stringify(value));
    //             cardConfig.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
    //             // console.log('*** saveConfigEntry on controller(); last_updated: ', this._config.last_updated);
    //             // console.log('*** saveConfigEntry on controller(); saving newConfig: ', newConfig);
    //             // console.log('*** saveConfigEntry on controller(); saving cardConfig: ', cardConfig);
    //             // console.log('*** saveConfigEntry on controller(); cardConfig.next_alarm: ', cardConfig.next_alarm);
    //             // console.log('*** saveConfigEntry on controller(); newConfig.next_alarm: ', Helpers.findNested(newConfig, 'type', 'custom:kobold-alarm-clock-card').next_alarm);

    //             await lovelace.saveConfig(newConfig);

    //             Helpers.testUntilTimeout(() => Helpers.getNotification(), 5000)
    //                 .then(() => {
    //                     if (Helpers.getNotification().labelText.includes('dashboard was updated')) {
    //                         Helpers.fireEvent('hass-notification', { message: 'Configuration updated' }, Helpers.getHa());
    //                     }
    //                 }).catch(() => { }); //timed out
    //         } else throw { message: 'Unable to find Kobold card in lovelace configuration or kobold card config is corrupt' };
    //     } catch (err: any) {
    //         alert(`Saving failed: ${err.message}.`);
    //     }
    // }

    async _saveConfigEntries(entries) {
        try {
            const lovelace = Helpers.getLovelace().lovelace;
            // console.log('*** saveConfigEntry(); lovelace: ', lovelace);
            // console.log('*** saveConfigEntry(); this: ', this);
            const newConfig = structuredClone(lovelace.config);
            const tabGroupArry = [...Helpers.getLovelace().shadowRoot.querySelectorAll('sl-tab-group sl-tab')];
            // console.log('*** _saveConfigEntry on controller(); tabGroup: ', tabGroup);
            const viewIndex = tabGroupArry.findIndex((tab) => { return tab.hasAttribute('active') });
            // console.log('*** _saveConfigEntry on controller(); viewIndex: ', viewIndex);
            // console.log('*** _saveConfigEntry on controller(); newCardConfig: ', newConfig.views[viewIndex]);

            const cardConfig = Helpers.findNested(newConfig.views[viewIndex > -1 ? viewIndex : 0], 'type', 'custom:kobold-alarm-clock-card');
            // console.log('*** _saveConfigEntry(); cardConfig[key]: ', cardConfig[key]);
            // console.log('*** _saveConfigEntry(); newConfig: ', newConfig);

            if (cardConfig) {
                Object.keys(entries).forEach(entry => {
                    if (cardConfig[entry] !== undefined) {
                        cardConfig[entry] = entries[entry];
                    } else {
                        console.warn('*** _saveConfigEntries(); Expected configuration entry is undefined');
                    };
                });
                cardConfig.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');

                // if (cardConfig && cardConfig[entry] !== undefined) {
                // cardConfig[key] = value;
                // console.log('*** saveConfigEntry on controller(); key: ' + JSON.stringify(key) + '; value: ' + JSON.stringify(value));
                // cardConfig.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
                // console.log('*** saveConfigEntry on controller(); last_updated: ', this._config.last_updated);
                // console.log('*** saveConfigEntry on controller(); saving newConfig: ', newConfig);
                // console.log('*** saveConfigEntry on controller(); saving cardConfig: ', cardConfig);
                // console.log('*** saveConfigEntry on controller(); cardConfig.next_alarm: ', cardConfig.next_alarm);
                // console.log('*** saveConfigEntry on controller(); newConfig.next_alarm: ', Helpers.findNested(newConfig, 'type', 'custom:kobold-alarm-clock-card').next_alarm);

                await lovelace.saveConfig(newConfig);

                Helpers.testUntilTimeout(() => Helpers.getNotification(), 5000)
                    .then(() => {
                        if (Helpers.getNotification().labelText.includes('dashboard was updated')) {
                            Helpers.fireEvent('hass-notification', { message: 'Configuration updated' }, Helpers.getHa());
                        }
                    }).catch(() => { }); //timed out
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
        // console.log('*** evaluate(); nextAlarm.date_time: ', nextAlarm.date_time);
        // console.log('*** evaluate; date test: ', dayjs('2025-09-05 00:00:00').subtract(1, 'minute') > dayjs('2025-09-05 11:00:00'));

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
        // if ((nextAlarm.date < dateToday || (dayjs().subtract(1, 'minute').format('HH:mm:ss') > nextAlarm.time && nextAlarm.date === dateToday)) && !this.isAlarmRinging()) {
        if ((nextAlarm.date < dateToday || (dayjs().subtract(1, 'minute') > dayjs(nextAlarm.date_time) && nextAlarm.date === dateToday)) && !this.isAlarmRinging()) {
            // console.log('*** _evaluate; nextAlarm passed');
            // this._throttleNextAlarmReset();
            Helpers.throttle(() => {
                if (this._config.debug) {
                    console.warn('*** _evaluate(); Resetting nextAlarm because nextAlarm date is in the past');
                    this._hass.callService('system_log', 'write', { 'message': '*** Resetting nextAlarm because nextAlarm date is in the past', 'level': 'info' });
                }
                this.nextAlarmReset();
            }, 1000);
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
            this._throttleAlarmRinging(true);
        } else if (this.isAlarmRinging()) {
            // dismiss alarm after alarm_duration_default time elapses
            if (dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(this._config.alarm_duration_default)).format('HH:mm:ss') <= dayjs().format('HH:mm:ss')) {
                // console.log('*** _evaluate(); dismissing ringing automatically');
                this.dismiss();
            }
            // NOTE: alarm_actions don't execute during nap or snooze
            // } else if (!nextAlarm.snooze && !nextAlarm.nap && this._config.alarm_actions) {
        } else if (!nextAlarm.snooze && !nextAlarm.overridden && this._config.alarm_actions) {
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
