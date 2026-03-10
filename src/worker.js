// import { AlarmController } from './alarm-controller';
import { Helpers } from './helpers';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

let updateLoopId = 0;

// const addResourcesToCache = async (resources) => {
//   const cache = await caches.open(version);
//   await cache.addAll(resources);
// };

self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('*** worker: installing...');
});
self.addEventListener('activate', (event) => {
    console.log('*** worker: activated');
});
self.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    // console.log('*** worker: received message: ', data);

    if (updateLoopId) {
        console.log('*** worker: clearing timeout: ', updateLoopId);
        clearTimeout(updateLoopId);
        updateLoopId = 0;
    }

    // if (data.disconnected === false || data.visibility === 'visible') return;

    if (data.disconnected || data.visibility) {
        // kobold has lost focus
        console.log('*** worker: disconnected');
        updateLoop();

        function updateLoop() {
            updateLoopId = setTimeout(() => {
                // console.log(`*** worker: ${updateLoopId} seconds have elapsed`);
                console.log(`*** worker: ${updateLoopId} seconds; self.config.next_alarm.time: ${self.config.next_alarm.time}`);
                evaluate();
                updateLoop();
            }, 1000);
        }
        function evaluate() {
            // if (Helpers.getPreview() || !this._koboldConnected || !this._hass.connected) return;
            // console.log('*** evaluating now');
            // console.log('*** lovelace: ', Helpers.getLovelace().shadowRoot);
            // console.log('*** koboldConnected: ', this._koboldConnected);

            // console.log('*** self.hass: ', self.hass);
            self.hass.callService('system_log', 'write', { 'message': '*** Worker: TEST', 'level': 'info' });

            const nextAlarm = self.config.next_alarm;
            const dateToday = dayjs().format('YYYY-MM-DD');

            nextAlarmResetThrottled = Helpers.throttle(() => {
                if (self.config.debug) {
                    console.warn('*** worker.valuate(); Resetting nextAlarm because nextAlarm date is in the past');
                    self.hass.callService('system_log', 'write', { 'message': '*** Worker: Resetting nextAlarm because nextAlarm date is in the past', 'level': 'info' });
                }
                nextAlarmReset();
            }, 1000);
            function nextAlarmReset(snooze = false) {
                let keyValue;
                if (snooze) {
                    const nextAlarmTime = dayjs().add(dayjs.duration(self.config.snooze_duration_default));
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
                    const forToday = dayjs().format('HH:mm:ss') < self.config[dayToday].time;
                    const newAlarm = forToday ? self.config[dayToday] : self.config[dayTomorrow];
                    keyValue = AlarmController.createNextAlarm(newAlarm, forToday);
                }
                if (!!Helpers.deepCompareObj(this.nextAlarm, keyValue)) this.nextAlarm = keyValue;
            }

            // is nextAlarm in the past?
            if ((nextAlarm.date < dateToday || (dayjs().subtract(1, 'minute') > dayjs(nextAlarm.date_time) && nextAlarm.date === dateToday))) {
                nextAlarmResetThrottled();
                return;
            }

            // // should nextAlarm be disabled because it is a holiday?
            // if (self.config.workday_sensor && self.hass.states[self.config.workday_sensor] && self.config.workday_enabled) {

            //     async function checkWorkdayDate(date) {
            //         //callService(domain: string, service: string, serviceData?: object, target?: HassServiceTarget, notifyOnError?: boolean, returnResponse?: boolean): ServiceCallResponse;
            //         return await self.hass.callService('workday', 'check_date', { check_date: date }, { entity_id: self.config.workday_sensor }, false, true);
            //     }
            //     deleteHolilday = (nextAlarm) => {
            //         // console.log('deleting holiday');
            //         delete nextAlarm.holiday;
            //         this.nextAlarm = nextAlarm;
            //         nextAlarmResetThrottled();
            //     }
            //     checkWorkdayDate(nextAlarm.date).then((response) => {
            //         // console.log('*** Workday Sensor response: ' + JSON.stringify(response));
            //         const nextAlarmIsWorkday = response.response[self.config.workday_sensor].workday;
            //         if ((!nextAlarmIsWorkday && !nextAlarm.holiday && !nextAlarm.overridden) || (!nextAlarmIsWorkday && nextAlarm.holiday && nextAlarm.enabled && !nextAlarm.overridden)) {
            //             this.nextAlarm = {
            //                 ...nextAlarm,
            //                 enabled: false,
            //                 holiday: true
            //             };
            //         } else if (nextAlarmIsWorkday && nextAlarm.holiday) {
            //             deleteHolilday(nextAlarm);
            //         };
            //     }, (error) => {
            //         if (self.config.debug) {
            //             console.error('*** Failed to connect to Workday Sensor: ', error.message);
            //             self.hass.callService('system_log', 'write', { 'message': '*** Failed to connect to Workday Sensor: ' + error.message, 'level': 'info' });
            //         }
            //     });
            // } else {
            //     if (nextAlarm.holiday) {
            //         deleteHolilday(nextAlarm);
            //     }
            // }

            // if (!this.isAlarmEnabled) return;

            // // trigger or dismiss alarm?
            // if (!this.isAlarmRinging() && dayjs().format('HH:mm:ss') >= nextAlarm.time && nextAlarm.date === dateToday) {
            //     this._throttleAlarmRinging(true);
            //     // return;
            // } else if (this.isAlarmRinging()) {
            //     // dismiss alarm after alarm_duration_default time elapses
            //     if (dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(this._config.alarm_duration_default)).format('HH:mm:ss') <= dayjs().format('HH:mm:ss')) {
            //         this.dismiss();
            //     }
            //     // return;
            //     // NOTE: alarm_actions don't execute during nap or snooze
            // } else if (!nextAlarm.snooze && !nextAlarm.overridden && this._config.alarm_actions) {
            //     this._config.alarm_actions
            //         .filter(action => action.when !== 'on_snooze' && action.when !== 'on_dismiss' && !this._alarmActionsScript[`${action.entity}-${action.when}`])
            //         .forEach(action => {
            //             let myDuration = structuredClone(action.offset);
            //             if (action.negative && action.offset) {
            //                 myDuration = { hours: myDuration.hours *= -1, minutes: myDuration.minutes *= -1, seconds: myDuration.seconds *= -1 };
            //             }
            //             if (dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(myDuration)).format('HH:mm:ss') <= dayjs().format('HH:mm:ss')) {
            //                 this._runAction(action);
            //                 // return;
            //             }
            //         });
            // }
        }

    } else {
        // data should be config
        // console.log('*** worker: received data');
        if (!data || (data && (!data?.config || !data?.hass || !data?.callService))) {
            console.log('*** worker: expected data not received: ', data);
        } else {
            self.config = data.config; // does this need to be cached?
            self.hass = data.hass;
            const callService = new Function(data.callService);
            self.hass.callService = callService;

            console.log('*** data.callService: ', data.callService);
            try {
                self.hass.callService('browser_mod', 'popup', { browser_id: 'framework-vivaldi', content: 'Yo, chump!' });
            } catch (error) {
                console.error(`*** callService failed with ${error}`);
            }

            // config = data; // if above doesn't work
            // console.log('*** worker: self.config: ', self.config);
            console.log('*** worker: received config; self.config.next_alarm.time: ', self.config.next_alarm.time);
        }
    }

});