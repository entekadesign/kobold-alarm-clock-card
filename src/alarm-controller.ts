import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import type { CardConfig, NextAlarmObject, TimeObject, Duration } from './types';

// HA types
import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";

export class AlarmController {

    // private _controllersAlarmConfig: AlarmConfiguration;
    private _hass: any;
    private _config: CardConfig;
    private _isAlarmRinging: boolean = false;
    private readonly _mappingMediaPlayer = { 'turn_on': 'media_play', 'turn_off': 'media_pause' };
    private _alarmRinging: (state: boolean) => void;
    private _cardId?: string;
    private _alarmActionsScripts?: Array<Record<string, boolean>> = [];
    private _saving: boolean;

    constructor(config: CardConfig, cardId?: string) {

        this._cardId = cardId;
        this._config = config;

        this._alarmRinging = Helpers.throttle((state) => {
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
        // this._controllersAlarmConfig = null;
        this._evaluate();
    }

    get alarmRingingEntity() {
        return this._hass.states[`input_boolean.${this._config.name}`];
    }

    // get alarmSoundLocalEntity() {
    //     return this._hass.states[this._config.alarm_entity_local];
    // }

    // get alarmClockVariableEntity() {
    //     return this._hass.states[`sensor.${this._config.name}`];
    // }

    // get alarmClockPingEntity() {
    //     if (this._config.ping_entity) {
    //         return this._hass.states[this._config.ping_entity];
    //     }
    // }

    // get controllersAlarmConfig() {
    //     if (!this._controllersAlarmConfig) {
    //         if (this._hass.states[`sensor.${this._config.name}`]) {
    //             this._controllersAlarmConfig = Object.assign(new AlarmConfiguration, this._hass.states[`sensor.${this._config.name}`].attributes);
    //         } else {
    //             alert(`Card requires Variables+History integration whose entity ID is sensor.${this._config.name}`);
    //             if (this._config.debug) {
    //                 this._hass.callService('system_log', 'write', { 'message': `*** Card requires Variables+History integration whose entity ID is sensor.${this._config.name}`, 'level': 'info' });
    //             }
    //         }
    //     }
    //     return this._controllersAlarmConfig;
    // }

    // saveControllersAlarmConfig(configuration: AlarmConfiguration) {
    //     this._saveConfiguration(configuration);
    // }

    // isConfigCorrect() {
    //     return this.alarmClockVariableEntity
    //         && this.alarmRingingEntity;
    // }

    // isSafetyConfigSet() {
    //     return this.alarmClockPingEntity
    //         && this.alarmSoundLocalEntity;
    // }

    snooze() {
        this.nextAlarmReset(true);
        if (this._config.alarm_actions) {
            this._config.alarm_actions
                .filter((action) => action.when === 'on_snooze')
                .forEach(action => this._runAction(action));
        }
        this._alarmRinging(false);
    }

    dismiss() {
        console.log('*** dismiss fired');
        this.nextAlarmReset();// TODO: should not refer directly to config, rather to accessors on this controller; same everywhere
        if (this._config.alarm_actions) {
            this._config.alarm_actions
                .filter((action) => action.when === 'on_dismiss')
                .forEach(action => this._runAction(action));
            this._alarmActionsScripts = [];
        }
        this._alarmRinging(false);
    }

    snoozeConfig(snoozeDuration: Duration) {
        const nextAlarmTime = dayjs(this.nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(snoozeDuration));
        const keyValue = {
            // ...this.nextAlarm, // TODO: to capture overridden? is this necessary?
            overridden: true,
            snooze: true,
            enabled: true,
            time: nextAlarmTime.format('HH:mm:ss'),
            date: nextAlarmTime.format('YYYY-MM-DD'),
            date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss')
        }
        this._saveConfig('next_alarm', keyValue);
    }

    //TODO: Rename or combine with createNextAlarmNew? why is createnextalarmnew called here and again in set nextAlarm? move this code to editor?
    dismissConfig() {
        console.log('*** dismissConfig() fired');
        const momentTomorrow = dayjs().add(1, 'day');
        // const alarmTomorrow = this[momentTomorrow.format('dd').toLowerCase()];
        const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()]; //create accessor?
        // this.nextAlarm = AlarmController.createNextAlarmNew(alarmTomorrow);
        // this.nextAlarm = alarmTomorrow;
        //this.nextAlarm is a getter on this controller--it accepts a TimeObject, not a NextAlarmObject
        const keyValue = AlarmController.createNextAlarmNew(alarmTomorrow);
        this._saveConfig('next_alarm', keyValue);
    }

    // snoozeconfig and dismissconfig should maybe be setters on this controller, since they modify and save config
    nextAlarmReset(snooze = false) {
        // const controllersAlarmConfig = this.controllersAlarmConfig;
        if (snooze) {
            // controllersAlarmConfig.snooze(controllersAlarmConfig['snoozeDurationDefault'].time);
            this.snoozeConfig(this._config.snooze_duration_default);
        } else {
            // controllersAlarmConfig.dismiss();
            this.dismissConfig();
        }
        // this._saveConfiguration(controllersAlarmConfig);
        // Helpers.fireEvent('config-changed', { config: this._config }); //this is prolly not necessary; _saveConfig is enough
    }

    static createNextAlarmNew(alarm: TimeObject, forToday = false): NextAlarmObject {
        console.log('*** createNextAlarmNew(); creating new next_alarm object');
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

    get nextAlarm(): NextAlarmObject {
        // console.log('*** get nextAlarm on contoller');
        // const nextAlarm = this.controllersAlarmConfig.nextAlarm;
        const nextAlarm = Object.assign({}, this._config.next_alarm); // TODO: necessary to make a copy? this should happen when saving, not now, right?
        // const nextAlarm = this._config.nextAlarm;

        if (!nextAlarm) {
            console.log('*** get nextAlarm; nextAlarm undefined: returning default config');
            // return { enabled: false, time: '07:00', date: '', date_time: '' };
            return Helpers.defaultConfig.next_alarm;
            // return Object.assign({}, Helpers.defaultConfig.next_alarm);
        }
        return nextAlarm;
    }

    // set nextAlarm(nextAlarm: NextAlarmObject) {
    set nextAlarm(alarm: TimeObject) {
        console.log('*** set nextAlarm on contoller');
        // const controllersAlarmConfig = this.controllersAlarmConfig;
        const forToday = true;
        // controllersAlarmConfig.nextAlarm = {
        //     ...AlarmConfiguration.createNextAlarm(nextAlarm, forToday),
        //     overridden: true
        // };
        // this._config.nextAlarm = {
        //     ...AlarmController.createNextAlarmNew(nextAlarm, forToday),
        //     overridden: true
        // };
        // console.log('*** set nextAlarm on contoller; saving: ', this._config.nextAlarm);
        // this._saveConfiguration(controllersAlarmConfig);
        // Helpers.fireEvent('config-changed', { config: this._config }); //working? no. no koboldeditor reference b/c no editor is open. possibly only listens to config-changed while in edit mode
        // this._saveConfig(this._config);
        // const lovelaceConfig = Helpers.getLovelace().lovelace.config;

        // const lovelaceConfigCopy = structuredClone(lovelaceConfig);

        // // console.log('*** lovelaceConfigCopy views: ', lovelaceConfigCopy.views);

        // const cardConfig = Helpers.findNested(lovelaceConfigCopy, 'type', 'custom:kobold-alarm-clock-card');
        // console.log('*** cardConfig: ', cardConfig);
        // console.log('*** lovelaceConfig: ', lovelaceConfig);
        // console.log('*** lovelaceConfig type: ', typeof lovelaceConfig);
        // console.log('*** keys: ', Object.keys(lovelaceConfig));
        // const cardConfig = Helpers.findNested(lovelaceConfig, 'type', 'custom:kobold-alarm-clock-card');
        // const newConfig = Object.assign({}, source);
        // const newConfig = Object.assign(lovelaceConfig, this._config);

        // let newConfig = lovelaceConfig.map((item) =>
        //     Object.assign({}, item, this._config)
        // );

        // const newConfig = Object.assign({}, lovelaceConfig, this._config);

        // cardConfig.nextAlarm = {
        //     ...AlarmController.createNextAlarmNew(nextAlarm, forToday),
        //     overridden: true
        // };

        // createNextAlarm() accepts a TimeObject parameter, not a NextAlarmObject
        const keyValue = {
            ...AlarmController.createNextAlarmNew(alarm, forToday),
            overridden: true //is this necessary?
        };

        // console.log('*** cardConfig: ', cardConfig);
        // console.log('*** lovelaceConfigCopy: ', lovelaceConfigCopy);

        // const newConfig =
        // console.log('*** newConfig: ', newConfig);
        this._saveConfig('next_alarm', keyValue);
    }

    // set nextAlarmOverridden(state: boolean) {
    //     console.log('*** nextAlarmOverridden: ', state);
    //     const keyValue = Object.assign({}, this._config.next_alarm);
    //     keyValue.overridden = state;
    //     console.log('*** nextAlarmOverridden; keyValue: ', keyValue);
    //     this._saveConfig('next_alarm', keyValue);
    // }

    get isAlarmEnabled() {
        // console.log('*** isAlarmEnabled()');
        const nextAlarm = this.nextAlarm;

        //TODO: can nextalarm ever be disabled (except when first defined)? why just just keep it enabled always? or, better, since picker not used anywhere else, eliminate enabled from nextalarm?)
        if (nextAlarm.overridden && nextAlarm.enabled) {
            return true;
        }
        // return this.controllersAlarmConfig.alarmsEnabled && nextAlarm.enabled;
        return this._config.alarms_enabled && nextAlarm.enabled; //create accessor on this?
    }

    async _saveConfig(key, value) {
        this._saving = true;
        try {
            const lovelace = Helpers.getLovelace().lovelace;
            const newConfig = structuredClone(lovelace.config);
            const cardConfig = Helpers.findNested(newConfig, 'type', 'custom:kobold-alarm-clock-card');
            // const newData = cardConfig[key] = value;
            // console.log('*** newData: ', newData);
            if (cardConfig && cardConfig[key]) {
                cardConfig[key] = value;
                cardConfig.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');

                console.log('*** _saveConfig(); newConfig: ', newConfig);
                // Helpers.fireEvent('config-changed', { config: cardConfig });
                await lovelace.saveConfig(newConfig);
            } else throw { message: 'Unable to find kobold card in lovelace configuration' };

            // const newConfig = Helpers.deepMerge(lovelace.config, config);
            // console.log('*** new config: ', newConfig);
            // await lovelace.saveConfig(newConfig);

            // const lovelace = this._params!.lovelace;
            // await lovelace.saveConfig(
            //     this._emptyConfig
            //         ? EMPTY_CONFIG
            //         : await expandLovelaceConfigStrategies(lovelace.config, this.hass)
            // );
            // Helpers.getLovelace().lovelace.setEditMode(true);
            // this._saving = false;
            //   this.closeDialog();
        } catch (err: any) {
            alert(`Saving failed: ${err.message}.`);
            // this._saving = false;
        }
        this._saving = false;
    }

    isAlarmRinging() {
        return this._isAlarmRinging;
    }

    evaluateAlarms() {
        this._evaluate();
    }

    _evaluate() {
        // console.log('*** _evaluate(); getting nextAlarm');
        const nextAlarm = this.nextAlarm;
        const dateToday = dayjs().format('YYYY-MM-DD');

        // if day is ending and nextAlarm is not set for tomorrow, then reset nextAlarm
        if (dayjs().format('HH:mm') === '23:58' && nextAlarm.date <= dateToday) {
            this.nextAlarmReset();
            if (this._config.debug) {
                this._hass.callService('system_log', 'write', { 'message': '*** No nextAlarm for tomorrow; resetting nextAlarm', 'level': 'info' });
            }
        }

        // if (!this.controllersAlarmConfig.alarmsEnabled && !nextAlarm.nap) {
        if (!this._config.alarms_enabled && !nextAlarm.nap) {
            return;
        }

        if (!nextAlarm.enabled) {
            return;
        }
        // console.log('*** current time>nextalarm: ' + dayjs().format('HH:mm:ss') + '; ' + nextAlarm.time);
        if (!this.isAlarmRinging() && dayjs().format('HH:mm:ss') >= nextAlarm.time && nextAlarm.date === dateToday) {
            console.log('*** alarm ringing');
            this._alarmRinging(true);
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
            // if (this.alarmSoundLocalEntity) {
            //     if (this.alarmClockPingEntity.state === 'off' || action === 'turn_off' || !this._config.alarm_entities) {
            //         if ((action === 'turn_on' && this.alarmSoundLocalEntity.state !== 'on') || (action === 'turn_off' && this.alarmSoundLocalEntity.state !== 'off')) {
            //             this._hass.callService('homeassistant', action, { 'entity_id': this._config.alarm_entity_local });
            //         }
            //     }
            // } else {
            //     if (this._config.debug) {
            //         this._hass.callService('system_log', 'write', { 'message': '*** alarmSoundLocalEntity is undefined', 'level': 'info' });
            //     }
            //     console.warn('*** _callAlarmRingingService(); alarmSoundLocalEntity is undefined');
            // }
            // if (this._config.alarm_entities) {
            //     const entitiesArray = [];
            //     const ringerEntities = this.controllersAlarmConfig['ringerEntities'] ? JSON.parse(this.controllersAlarmConfig['ringerEntities']) : '';
            //     for (const entity of this._config.alarm_entities) {
            //         if (ringerEntities) {
            //             for (const ringerEntity of ringerEntities) {
            //                 if (ringerEntity.entity_id === entity && ringerEntity.enabled) {
            //                     entitiesArray.push(entity);
            //                 }
            //             }
            //         } else {
            //             entitiesArray.push(entity);
            //         }
            //     }
            //     for (const entitiesArrayElement of entitiesArray) {
            //         const entityState = this._hass.states[entitiesArrayElement].state;
            //         if (entitiesArrayElement.startsWith('media_player')) {
            //             if ((action === 'turn_on' && entityState !== 'on') || (action === 'turn_off' && entityState !== 'off')) {
            //                 this._hass.callService('media_player', this._mappingMediaPlayer[action], { 'entity_id': entitiesArrayElement });
            //             }
            //         } else {
            //             if ((action === 'turn_on' && entityState !== 'on') || (action === 'turn_off' && entityState !== 'off')) {
            //                 this._hass.callService('homeassistant', action, { 'entity_id': entitiesArrayElement });
            //             }
            //         }
            //     }
            // }
            if (this._config.alarm_entities) {
                this._config.alarm_entities.forEach(entity => {
                    // for (const entity of this._config.alarm_entities) {
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

    //     _saveConfiguration(configuration: AlarmConfiguration) {
    //         let actualConfiguration = configuration;
    //         if (!(configuration instanceof AlarmConfiguration)) {
    //             actualConfiguration = Object.assign(new AlarmConfiguration, configuration);
    //             console.warn('*** _saveConfiguration(); Submitted configuration is corrupt');
    //         }

    //         // reset next alarm after being disabled and now being re-enabled
    //         if (actualConfiguration.alarmsEnabled && this.controllersAlarmConfig.alarmsEnabled === false) {
    //             actualConfiguration.dismiss();  //TODO: this code moded to editor; test
    //         }

    //         const configurationWithLastUpdated = {
    //             ...actualConfiguration,
    //             last_updated: dayjs().format('YYYY-MM-DD HH:mm:ss')
    //         }

    //         const alarmClockVariableEntityName = 'sensor.' + this._config.name;

    //         const param = {
    //             entity_id: alarmClockVariableEntityName,
    //             attributes: configurationWithLastUpdated,
    //             replace_attributes: true
    //         };

    //         if (this.alarmClockPingEntity.state === 'on') {
    //             this._hass.callService('variable', 'update_sensor', param);
    //             this._controllersAlarmConfig = Object.assign(new AlarmConfiguration, configurationWithLastUpdated);
    //         } else {
    //             if (this._config.debug) {
    //                 this._hass.callService('system_log', 'write', { 'message': '*** Save attempted while clock disconnected from Home Assistant', 'level': 'info' });
    //             }
    //             alert('Save failed. No connection to Home Assistant.');
    //         }
    //     }
}

// export class AlarmConfiguration {

//     public alarmsEnabled: boolean = false;
//     public nextAlarm: NextAlarmObject = { enabled: false, time: '08:00', date: '', date_time: '' };
//     public mo: TimeObject = { enabled: false, time: '07:00' };
//     public tu: TimeObject = { enabled: false, time: '07:00' };
//     public we: TimeObject = { enabled: false, time: '07:00' };
//     public th: TimeObject = { enabled: false, time: '07:00' };
//     public fr: TimeObject = { enabled: false, time: '07:00' };
//     public sa: TimeObject = { enabled: false, time: '09:00' };
//     public su: TimeObject = { enabled: false, time: '09:00' };
//     public timeFormat: string = '12hr';
//     public clockFontFace: string = '0';
//     public clockDefaultFullscreen: boolean = false;
//     public snoozeDurationDefault: TimeObject = { enabled: true, time: '00:15' };
//     public alarmDurationDefault: TimeObject = { enabled: true, time: '00:30' };
//     public napDurationDefault: TimeObject = { enabled: true, time: '00:30' };
//     public last_updated: string;

//     snooze(snoozeTime: string) {
//         const nextAlarmTime = dayjs(this.nextAlarm.time, 'HH:mm').add(dayjs.duration(Helpers.convertToMinutes(snoozeTime)));
//         this.nextAlarm = {
//             ...this.nextAlarm,
//             enabled: true,
//             snooze: true,
//             time: nextAlarmTime.format('HH:mm'),
//             date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm')
//         }
//     }

//     dismiss() {
//         const momentTomorrow = dayjs().add(1, 'day');
//         const alarmTomorrow = this[momentTomorrow.format('dd').toLowerCase()];
//         // const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()];
//         this.nextAlarm = AlarmConfiguration.createNextAlarm(alarmTomorrow);
//     }

//     static createNextAlarm(alarm: TimeObject, forToday = false): NextAlarmObject {
//         let alarmDate = dayjs();
//         if (!((alarm.time >= alarmDate.format('HH:mm')) && forToday)) {
//             alarmDate = alarmDate.add(1, 'day');
//         }

//         return {
//             ...alarm,
//             date: alarmDate.format('YYYY-MM-DD'),
//             date_time: `${alarmDate.format('YYYY-MM-DD')} ${alarm.time}`,
//         }
//     }
// }

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
            // return {
            //     oldValue: original,
            //     newValue: current
            // };
            return current;
        }

        // // Handle arrays
        // if (Array.isArray(original) && Array.isArray(current)) {
        //   if (original.length !== current.length) {
        //     return {
        //       oldValue: original,
        //       newValue: current
        //     };
        //   }

        //   const arrayDiffs = {};
        //   let hasChanges = false;

        //   for (let i = 0; i < original.length; i++) {
        //     const diff = deepObjectDiff(original[i], current[i]);
        //     if (diff !== null) {
        //       arrayDiffs[i] = diff;
        //       hasChanges = true;
        //     }
        //   }

        //   return hasChanges ? arrayDiffs : null;
        // }

        const changes = {};
        let hasChanges = false;

        // Check for changes in current object
        for (const key of Object.keys(current)) {
            if (!(key in original)) {
                // changes[key] = {
                //     oldValue: undefined,
                //     newValue: current[key]
                // };
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
                // changes[key] = {
                //     oldValue: original[key],
                //     newValue: undefined
                // };
                changes[key] = undefined;
                hasChanges = true;
            }
        }

        return hasChanges ? changes : null;
    }

    // // identical or not? returns boolean
    // static deepCompareBool(a: any, b: any) {
    //     if (a === b) return true;
    //     if (typeof a !== typeof b) return false;
    //     if (!(a instanceof Object && b instanceof Object)) return false;
    //     for (const x in a) {
    //         if (!a.hasOwnProperty(x)) continue;
    //         if (!b.hasOwnProperty(x)) return false;
    //         if (a[x] === b[x]) continue;
    //         if (typeof a[x] !== "object") return false;
    //         if (!this.deepCompare(a[x], b[x])) return false;
    //     }
    //     for (const x in b) {
    //         if (!b.hasOwnProperty(x)) continue;
    //         if (!a.hasOwnProperty(x)) return false;
    //     }
    //     return true;
    // }

    // static findNested(obj, key, value) {
    //     if (obj[key] === value) {
    //         return obj;
    //     } else {
    //         for (var i = 0, len = Object.keys(obj).length; i < len; i++) {
    //             if (typeof obj[i] == 'object') {
    //                 var found = this.findNested(obj[i], key, value);
    //                 if (found) {
    //                     return found;
    //                 }
    //             }
    //         }
    //     }
    // }

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

    static getEditorButtons = () => {
        let root: any = this.getEditor();
        root = root && root.shadowRoot;
        root = root && root.querySelector('div[slot="primaryAction"]');
        // console.log('*** getEditorButtons(); root: ', root);
        return root;
    }


    // static getConfigContent = () => {
    //     let root: any = this.getEditor();
    //     root = root && root.shadowRoot;
    //     root = root && root.querySelector('hui-card-element-editor');
    //     root = root && root.shadowRoot;
    //     root = root && root.querySelector('hui-stack-card-editor');
    //     root = root && root.shadowRoot;
    //     root = root && root.querySelector('hui-card-element-editor');
    //     root = root && root.shadowRoot;
    //     root = root && root.querySelector('kobold-card-editor');
    //     root = root && root.shadowRoot;
    //     root = root && root.querySelector('#kobold-card-config');
    //     // console.log('*** getConfigContent(); root: ', root);
    //     return root;
    // };

    // static getConfigContent = () => {
    //     let root = this.getEditor();
    //     root = root && root.shadowRoot;
    //     root = root && root.querySelector("hui-card-element-editor");
    //     root = root && root.shadowRoot;
    //     root = root && root.querySelector("my-custom-card-editor");
    //     root = root && root.shadowRoot;
    //     root = root && root.querySelector("div#my-card-config");
    //     // console.log('*** getConfigContent(); root: ', root);
    //     return root;
    // };

    // static getConfigContent = () => {
    //     let root: any = this.getEditor();
    //     if (!root) return;
    //     root = root && root.shadowRoot;
    //     root = root && root.querySelector('hui-card-element-editor');
    //     root = root && root.shadowRoot;
    //     if (!root) return;
    //     let els = root.querySelectorAll('*');
    //     // console.log('*** els: ', els);
    //     els.forEach((el) => {
    //         if (el.tagName.slice(-11) === 'CARD-EDITOR') {
    //             root = root && el;
    //             // console.log('*** root: ', root);
    //         }
    //     });
    //     // console.log('*** final root: ', root);
    //     // console.log('*** shadowRoot: ', root instanceof ShadowRoot);
    //     if (!root || (root instanceof ShadowRoot)) {
    //         console.warn('*** getConfigContent(); Card editor not found');
    //         return;
    //     }
    //     root = root && root.shadowRoot;
    //     if (!root) return;
    //     if (root.querySelector('#kobold-card-config')) {
    //         root = root && root.querySelector('#kobold-card-config');
    //         return root;
    //     }
    //     root = root && root.querySelector('hui-card-element-editor');
    //     root = root && root.shadowRoot;
    //     root = root && root.querySelector('kobold-card-editor');
    //     root = root && root.shadowRoot;
    //     root = root && root.querySelector('#kobold-card-config');
    //     // console.log('*** getConfigContent(); root: ', root);
    //     return root;
    // };

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
        // alarm_entities: ["input_boolean.kobold_clock"],
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
