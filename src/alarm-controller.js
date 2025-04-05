import dayjs from 'dayjs';
// import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/dayjs.min.js/+esm';
import duration from 'dayjs/plugin/duration';
// import duration from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/plugin/duration.js/+esm';

dayjs.extend(duration);

export class AlarmController {

    constructor(config, controllerID) {
        this.controllerID = controllerID;
        this.config = config;
        this._isAlarmRinging = false;
        this._mappingMediaPlayer = {'turn_on': 'media_play', 'turn_off': 'media_pause'};
        this._alarmActionsScripts = [];
        function throttle(fn, delay) {
            let timerFlag = null;
            return (...args) => {
                if (timerFlag === null) {
                    fn(...args);
                    timerFlag = setTimeout(() => {
                        timerFlag = null;
                    }, delay);
                }
            };
        }
        this._alarmRinging = throttle( (state) => {
            if (state) {
                this._isAlarmRinging = true;
                this._callAlarmRingingService('turn_on');
            } else {
                this._isAlarmRinging = false;
                this._callAlarmRingingService('turn_off');
            }
        }, 1000 );
    }

    set hass(hass) {
        this._hass = hass;
        this._alarmClockConfiguration = null;
        this._evaluate();
    }

    get alarmRingingEntity() {
        return this._hass.states[`input_boolean.${this.config.name}`];
    }

    get alarmSoundLocalEntity() {
        return this._hass.states[this.config.alarm_entity_local];
    }

    get alarmClockVariableEntity() {
        return this._hass.states[`sensor.${this.config.name}`];
    }

    get alarmClockPingEntity() {
        if (this.config.ping_entity) {
            return this._hass.states[this.config.ping_entity];
        }
    }

    get alarmClockConfiguration() {
        if(!this._alarmClockConfiguration) {
            this._alarmClockConfiguration = Object.assign(new AlarmConfiguration, this._hass.states[`sensor.${this.config.name}`].attributes);
        }
        return this._alarmClockConfiguration;
    }

    saveAlarmClockConfiguration(configuration) {
        this._saveConfiguration(configuration);
    }

    isConfigCorrect() {
        return this.alarmClockVariableEntity
            && this.alarmRingingEntity;
    }

    isSafetyConfigSet() {
        return this.alarmClockPingEntity
            && this.alarmSoundLocalEntity;
    }

    snooze() {
        this.nextAlarmReset(true);
        if(this.config.alarm_actions) {
            this.config.alarm_actions
            .filter((action) => action.when === 'on_snooze')
            .forEach(action => this._runAction(action));
        }
        this._alarmRinging(false);
    }

    dismiss() {
        this.nextAlarmReset();
        if(this.config.alarm_actions) {
            this.config.alarm_actions
            .filter((action) => action.when === 'on_dismiss')
            .forEach(action => this._runAction(action));
            this._alarmActionsScripts = [];
        }
        this._alarmRinging(false);
    }

    //TODO: replace nextAlarmReset with set nextAlarm, adding parameters?
    nextAlarmReset(snooze = false) {
        const alarmClockConfiguration = this.alarmClockConfiguration;
        if (snooze) {
            alarmClockConfiguration.snooze(alarmClockConfiguration['snoozeDurationDefault'].time);
        } else {
            alarmClockConfiguration.dismiss();
        }
        this._saveConfiguration(alarmClockConfiguration);
    }

    get nextAlarm() {
        // called each time _evaluate is called
        const nextAlarm = this.alarmClockConfiguration.nextAlarm;

        if(!nextAlarm) {
            return {enabled: false};
        }
        return nextAlarm;
    }

    set nextAlarm(nextAlarm) {
        const alarmClockConfiguration = this.alarmClockConfiguration;
        const forToday = true;
        alarmClockConfiguration.nextAlarm = {
            ...AlarmConfiguration.createNextAlarm(nextAlarm, forToday),
            overridden: true
        };
        this._saveConfiguration(alarmClockConfiguration);
    }

    get isAlarmEnabled() {
        const nextAlarm = this.nextAlarm;

        if (nextAlarm.overridden && nextAlarm.enabled) {
            return true;
        }
        return this.alarmClockConfiguration.alarmsEnabled && nextAlarm.enabled;
    }

    isAlarmRinging() {
        return this._isAlarmRinging;
    }

    evaluateAlarms() {
        this._evaluate();
    }

    _evaluate() {
        const nextAlarm = this.nextAlarm;
        const dateToday = dayjs().format('YYYY-MM-DD');

        // if day is ending and nextAlarm is not set for tomorrow, then reset nextAlarm
        if (dayjs().format('HH:mm') === '23:58' && nextAlarm.date <= dateToday) {
            this.nextAlarmReset();
            if (this.config.debug) {
                this._hass.callService('system_log', 'write', { 'message': '*** No nextAlarm for tomorrow; resetting nextAlarm', 'level': 'info' } );
            }
        }

        if (!this.alarmClockConfiguration.alarmsEnabled && !nextAlarm.nap) {
            return;
        }

        if (!nextAlarm.enabled) {
            return;
        }

        if (!this.isAlarmRinging() && dayjs().format('HH:mm') >= nextAlarm.time && nextAlarm.date === dateToday) {
            this._alarmRinging(true);
        } else if(this.isAlarmRinging()) {
            // dismiss alarm automatically after alarmdurationdefault time elapses
            if(dayjs(nextAlarm.time, 'HH:mm').add(dayjs.duration(Helpers.convertToMinutes(this.alarmClockConfiguration['alarmDurationDefault'].time))).format('HH:mm') <= dayjs().format('HH:mm')) {
                this.dismiss();
            }
        // NOTE: alarm_actions don't execute during nap or snooze
        } else if(!nextAlarm.snooze && !nextAlarm.nap && this.config.alarm_actions) {
            this.config.alarm_actions
                .filter(action => action.when !== 'on_snooze' && action.when !== 'on_dismiss' && !this._alarmActionsScripts[`${action.entity}-${action.when}`])
                .filter(action => dayjs(nextAlarm.time, 'HH:mm').add(dayjs.duration(Helpers.convertToMinutes(action.when))).format('HH:mm') === dayjs().format('HH:mm'))
                .forEach(action => this._runAction(action));
        }
    }

    _runAction(action) {
        const tempAction = {
            service: 'homeassistant.turn_on',
            ...action
        }
        const actionServiceCommand = tempAction.service.split('.');
        this._hass.callService(actionServiceCommand[0], actionServiceCommand[1], {"entity_id": tempAction.entity});
        this._alarmActionsScripts[`${tempAction.entity}-${tempAction.when}`] = true;
    }

    async _callAlarmRingingService(action) {
        if (this.config.debug) {
            this._hass.callService('system_log', 'write', { 'message': '*** _callAlarmRingingService; action: ' + action + '; controllerID: ' + this.controllerID, 'level': 'info'} );
        }
        try {
            if (this.alarmSoundLocalEntity) {
                if (this.alarmClockPingEntity.state === 'off' || action === 'turn_off' || !this.config.alarm_entities) {
                    if ( (action === 'turn_on' && this.alarmSoundLocalEntity.state !== 'on') || (action === 'turn_off' && this.alarmSoundLocalEntity.state !== 'off') ) {
                        await this._hass.callService('homeassistant', action, {'entity_id': this.config.alarm_entity_local});
                    }
                }
            } else {
                if (this.config.debug) {
                    this._hass.callService('system_log', 'write', { 'message': '*** alarmSoundLocalEntity is undefined', 'level': 'info' } );
                }
                console.warn('*** alarmSoundLocalEntity is undefined');
            }
            if (this.config.alarm_entities) {
                const entitiesArray = [];
                const ringerEntities = this.alarmClockConfiguration['ringerEntities'] ? JSON.parse(this.alarmClockConfiguration['ringerEntities']) : '';
                for (const entity of this.config.alarm_entities) {
                    if (ringerEntities) {
                        for (const ringerEntity of ringerEntities) {
                            if (ringerEntity.entity_id === entity && ringerEntity.enabled) {
                                entitiesArray.push(entity);
                            }
                        }
                    } else {
                        entitiesArray.push(entity);
                    }
                }
                for (const entitiesArrayElement of entitiesArray) {
                    const entityState = this._hass.states[entitiesArrayElement].state;
                    if(entitiesArrayElement.startsWith('media_player')) {
                        if ( (action === 'turn_on' && entityState !== 'on') || (action === 'turn_off' && entityState !== 'off') ) {
                            await this._hass.callService('media_player', this._mappingMediaPlayer[action], {'entity_id': entitiesArrayElement});
                        }
                    } else {
                        if ( (action === 'turn_on' && entityState !== 'on') || (action === 'turn_off' && entityState !== 'off') ) {
                            await this._hass.callService('homeassistant', action, {'entity_id': entitiesArrayElement});
                        }
                    }
                }
            }
        }

        catch(err) {
            if (this.config.debug) {
                this._hass.callService('system_log', 'write', { 'message': '*** ERROR while calling ringing service: ' + err, 'level': 'info' } );
            }
            console.warn('*** ERROR while calling ringing service: ' + err);
            return;
        }
    }

    _saveConfiguration(configuration) {
        let actualConfiguration = configuration;
        if( !(configuration instanceof AlarmConfiguration) ) {
            actualConfiguration = Object.assign(new AlarmConfiguration, configuration);
            console.warn('*** _saveConfiguration(); Configuration not an instance of AlarmConfiguration class');
        }

        // reset next alarm after being disabled and now being re-enabled
        if(actualConfiguration.alarmsEnabled && this.alarmClockConfiguration.alarmsEnabled === false) {
            actualConfiguration.dismiss();
        }

        const configurationWithLastUpdated = {
            ...actualConfiguration,
            lastUpdated: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }

        const alarmClockVariableEntityName = 'sensor.' + this.config.name;

        const param = {
            entity_id: alarmClockVariableEntityName,
            attributes: configurationWithLastUpdated,
            replace_attributes: true
        };

        if (this.alarmClockPingEntity.state === 'on') {
            this._hass.callService('variable', 'update_sensor', param);
            this._alarmClockConfiguration = Object.assign(new AlarmConfiguration, configurationWithLastUpdated);
        } else {
            if (this.config.debug) {
                this._hass.callService('system_log', 'write', { 'message': '*** Save attempted while clock disconnected from Home Assistant', 'level': 'info' } );
            }
            alert('Save failed. No connection to Home Assistant.');
        }
    }
}

export class AlarmConfiguration {

    constructor() {
        this.alarmsEnabled = false;
        this.nextAlarm = {enabled: false, time: '08:00'}
        this.mo = {enabled: false, time: '07:00'}
        this.tu = {enabled: false, time: '07:00'}
        this.we = {enabled: false, time: '07:00'}
        this.th = {enabled: false, time: '07:00'}
        this.fr = {enabled: false, time: '07:00'}
        this.sa = {enabled: false, time: '09:00'}
        this.su = {enabled: false, time: '09:00'}
        this.timeFormat = '12hr'
        this.clockFontFace = '0';
        this.clockDefaultFullscreen = false
        this.snoozeDurationDefault = {enabled: true, time: '00:15'}
        this.alarmDurationDefault = {enabled: true, time: '00:30'}
        this.napDurationDefault = {enabled: true, time: '00:30'}
    }

    snooze(snoozeTime) {
        const nextAlarmTime = dayjs(this.nextAlarm.time, 'HH:mm').add(dayjs.duration(Helpers.convertToMinutes(snoozeTime)));
        this.nextAlarm = {
            ...this.nextAlarm,
            enabled: true,
            snooze: true,
            time: nextAlarmTime.format('HH:mm'),
            dateTime: nextAlarmTime.format('YYYY-MM-DD HH:mm')
        }
    }

    dismiss() {
        const momentTomorrow = dayjs().add(1, 'day');
        const alarmTomorrow = this[momentTomorrow.format('dd').toLowerCase()];
        this.nextAlarm = AlarmConfiguration.createNextAlarm(alarmTomorrow);
    }

    static createNextAlarm(alarm, forToday = false) {
        let dayjsNow = dayjs();
        if(!((alarm.time >= dayjsNow.format('HH:mm')) && forToday)) {
            dayjsNow = dayjsNow.add(1, 'day');
        }

        return {
            ...alarm,
            date: dayjsNow.format('YYYY-MM-DD'),
            dateTime: `${dayjsNow.format('YYYY-MM-DD')} ${alarm.time}`,
        }
    }
}

export class Helpers {
    static convertToMinutes(HHMM) {
        const [H, M] = HHMM.split(":").map( val => parseInt(val) );
        // https://dev.to/emnudge/identifying-negative-zero-2j1o
        let minutes = Math.abs(H) * 60 + M; minutes *= Math.sign(1 / H || H);
        return { 'minute' : minutes };
    };
}
