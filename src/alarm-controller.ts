import { HomeAssistant } from 'custom-card-helpers';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import type { CardConfig, NextAlarmObject, TimeObject } from './types';

export class AlarmController {

    private _controllersAlarmConfig: AlarmConfiguration;
    private _hass: any;
    private _config: CardConfig;
    private _isAlarmRinging: boolean = false;
    private readonly _mappingMediaPlayer = { 'turn_on': 'media_play', 'turn_off': 'media_pause' };
    private _alarmRinging: (state: boolean) => void;
    private _controllerId?: string;
    private _alarmActionsScripts?: Array<Record<string, boolean>> = [];

    constructor(config: CardConfig, controllerId: string) {

        this._controllerId = controllerId;
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
        this._controllersAlarmConfig = null;
        this._evaluate();
    }

    get alarmRingingEntity() {
        return this._hass.states[`input_boolean.${this._config.name}`];
    }

    get alarmSoundLocalEntity() {
        return this._hass.states[this._config.alarm_entity_local];
    }

    get alarmClockVariableEntity() {
        return this._hass.states[`sensor.${this._config.name}`];
    }

    get alarmClockPingEntity() {
        if (this._config.ping_entity) {
            return this._hass.states[this._config.ping_entity];
        }
    }

    get controllersAlarmConfig() {
        if (!this._controllersAlarmConfig) {
            if (this._hass.states[`sensor.${this._config.name}`]) {
                this._controllersAlarmConfig = Object.assign(new AlarmConfiguration, this._hass.states[`sensor.${this._config.name}`].attributes);
            } else {
                alert(`Card requires Variables+History integration whose entity ID is sensor.${this._config.name}`);
                if (this._config.debug) {
                    this._hass.callService('system_log', 'write', { 'message': `*** Card requires Variables+History integration whose entity ID is sensor.${this._config.name}`, 'level': 'info' });
                }
            }
        }
        return this._controllersAlarmConfig;
    }

    saveControllersAlarmConfig(configuration: AlarmConfiguration) {
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
        if (this._config.alarm_actions) {
            this._config.alarm_actions
                .filter((action) => action.when === 'on_snooze')
                .forEach(action => this._runAction(action));
        }
        this._alarmRinging(false);
    }

    dismiss() {
        this.nextAlarmReset();
        if (this._config.alarm_actions) {
            this._config.alarm_actions
                .filter((action) => action.when === 'on_dismiss')
                .forEach(action => this._runAction(action));
            this._alarmActionsScripts = [];
        }
        this._alarmRinging(false);
    }

    nextAlarmReset(snooze = false) {
        const controllersAlarmConfig = this.controllersAlarmConfig;
        if (snooze) {
            controllersAlarmConfig.snooze(controllersAlarmConfig['snoozeDurationDefault'].time);
        } else {
            controllersAlarmConfig.dismiss();
        }
        this._saveConfiguration(controllersAlarmConfig);
    }

    get nextAlarm(): NextAlarmObject {

        const nextAlarm = this.controllersAlarmConfig.nextAlarm;

        if (!nextAlarm) {
            return { enabled: false, time: '08:00', date: '', dateTime: '' };
        }
        return nextAlarm;
    }

    set nextAlarm(nextAlarm) {
        const controllersAlarmConfig = this.controllersAlarmConfig;
        const forToday = true;
        controllersAlarmConfig.nextAlarm = {
            ...AlarmConfiguration.createNextAlarm(nextAlarm, forToday),
            overridden: true
        };
        this._saveConfiguration(controllersAlarmConfig);
    }

    get isAlarmEnabled() {
        const nextAlarm = this.nextAlarm;

        if (nextAlarm.overridden && nextAlarm.enabled) {
            return true;
        }
        return this.controllersAlarmConfig.alarmsEnabled && nextAlarm.enabled;
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
            if (this._config.debug) {
                this._hass.callService('system_log', 'write', { 'message': '*** No nextAlarm for tomorrow; resetting nextAlarm', 'level': 'info' });
            }
        }

        if (!this.controllersAlarmConfig.alarmsEnabled && !nextAlarm.nap) {
            return;
        }

        if (!nextAlarm.enabled) {
            return;
        }

        if (!this.isAlarmRinging() && dayjs().format('HH:mm') >= nextAlarm.time && nextAlarm.date === dateToday) {
            this._alarmRinging(true);
        } else if (this.isAlarmRinging()) {
            // dismiss alarm automatically after alarmdurationdefault time elapses
            if (dayjs(nextAlarm.time, 'HH:mm').add(dayjs.duration(Helpers.convertToMinutes(this.controllersAlarmConfig['alarmDurationDefault'].time))).format('HH:mm') <= dayjs().format('HH:mm')) {
                this.dismiss();
            }
            // NOTE: alarm_actions don't execute during nap or snooze
        } else if (!nextAlarm.snooze && !nextAlarm.nap && this._config.alarm_actions) {
            this._config.alarm_actions
                .filter(action => action.when !== 'on_snooze' && action.when !== 'on_dismiss' && !this._alarmActionsScripts[`${action.entity}-${action.when}`])
                .filter(action => dayjs(nextAlarm.time, 'HH:mm').add(dayjs.duration(Helpers.convertToMinutes(action.when))).format('HH:mm') === dayjs().format('HH:mm'))
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
            this._hass.callService('system_log', 'write', { 'message': '*** _callAlarmRingingService; action: ' + action + '; controllerID: ' + this._controllerId, 'level': 'info' });
        }
        try {
            if (this.alarmSoundLocalEntity) {
                if (this.alarmClockPingEntity.state === 'off' || action === 'turn_off' || !this._config.alarm_entities) {
                    if ((action === 'turn_on' && this.alarmSoundLocalEntity.state !== 'on') || (action === 'turn_off' && this.alarmSoundLocalEntity.state !== 'off')) {
                        this._hass.callService('homeassistant', action, { 'entity_id': this._config.alarm_entity_local });
                    }
                }
            } else {
                if (this._config.debug) {
                    this._hass.callService('system_log', 'write', { 'message': '*** alarmSoundLocalEntity is undefined', 'level': 'info' });
                }
                console.warn('*** _callAlarmRingingService(); alarmSoundLocalEntity is undefined');
            }
            if (this._config.alarm_entities) {
                const entitiesArray = [];
                const ringerEntities = this.controllersAlarmConfig['ringerEntities'] ? JSON.parse(this.controllersAlarmConfig['ringerEntities']) : '';
                for (const entity of this._config.alarm_entities) {
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
                    if (entitiesArrayElement.startsWith('media_player')) {
                        if ((action === 'turn_on' && entityState !== 'on') || (action === 'turn_off' && entityState !== 'off')) {
                            this._hass.callService('media_player', this._mappingMediaPlayer[action], { 'entity_id': entitiesArrayElement });
                        }
                    } else {
                        if ((action === 'turn_on' && entityState !== 'on') || (action === 'turn_off' && entityState !== 'off')) {
                            this._hass.callService('homeassistant', action, { 'entity_id': entitiesArrayElement });
                        }
                    }
                }
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

    _saveConfiguration(configuration: AlarmConfiguration) {
        let actualConfiguration = configuration;
        if (!(configuration instanceof AlarmConfiguration)) {
            actualConfiguration = Object.assign(new AlarmConfiguration, configuration);
            console.warn('*** _saveConfiguration(); Submitted configuration is corrupt');
        }

        // reset next alarm after being disabled and now being re-enabled
        if (actualConfiguration.alarmsEnabled && this.controllersAlarmConfig.alarmsEnabled === false) {
            actualConfiguration.dismiss();
        }

        const configurationWithLastUpdated = {
            ...actualConfiguration,
            lastUpdated: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }

        const alarmClockVariableEntityName = 'sensor.' + this._config.name;

        const param = {
            entity_id: alarmClockVariableEntityName,
            attributes: configurationWithLastUpdated,
            replace_attributes: true
        };

        if (this.alarmClockPingEntity.state === 'on') {
            this._hass.callService('variable', 'update_sensor', param);
            this._controllersAlarmConfig = Object.assign(new AlarmConfiguration, configurationWithLastUpdated);
        } else {
            if (this._config.debug) {
                this._hass.callService('system_log', 'write', { 'message': '*** Save attempted while clock disconnected from Home Assistant', 'level': 'info' });
            }
            alert('Save failed. No connection to Home Assistant.');
        }
    }
}

export class AlarmConfiguration {

    public alarmsEnabled: boolean = false;
    public nextAlarm: NextAlarmObject = { enabled: false, time: '08:00', date: '', dateTime: '' };
    public mo: TimeObject = { enabled: false, time: '07:00' };
    public tu: TimeObject = { enabled: false, time: '07:00' };
    public we: TimeObject = { enabled: false, time: '07:00' };
    public th: TimeObject = { enabled: false, time: '07:00' };
    public fr: TimeObject = { enabled: false, time: '07:00' };
    public sa: TimeObject = { enabled: false, time: '09:00' };
    public su: TimeObject = { enabled: false, time: '09:00' };
    public timeFormat: string = '12hr';
    public clockFontFace: string = '0';
    public clockDefaultFullscreen: boolean = false;
    public snoozeDurationDefault: TimeObject = { enabled: true, time: '00:15' };
    public alarmDurationDefault: TimeObject = { enabled: true, time: '00:30' };
    public napDurationDefault: TimeObject = { enabled: true, time: '00:30' };
    public lastUpdated: string;

    snooze(snoozeTime: string) {
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

    static createNextAlarm(alarm: TimeObject, forToday = false): NextAlarmObject {
        let alarmDate = dayjs();
        if (!((alarm.time >= alarmDate.format('HH:mm')) && forToday)) {
            alarmDate = alarmDate.add(1, 'day');
        }

        return {
            ...alarm,
            date: alarmDate.format('YYYY-MM-DD'),
            dateTime: `${alarmDate.format('YYYY-MM-DD')} ${alarm.time}`,
        }
    }
}

export class Helpers {
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
}
