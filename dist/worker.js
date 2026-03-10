(function () {

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire94c2"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("ff36j", function(module, exports) {
// import { AlarmController } from './alarm-controller';

var $2hiuM = parcelRequire("2hiuM");

var $4KHb5 = parcelRequire("4KHb5");

var $g2tgA = parcelRequire("g2tgA");
(0, (/*@__PURE__*/$parcel$interopDefault($4KHb5))).extend((0, (/*@__PURE__*/$parcel$interopDefault($g2tgA))));
let $b18aa980654e4edf$var$updateLoopId = 0;
// const addResourcesToCache = async (resources) => {
//   const cache = await caches.open(version);
//   await cache.addAll(resources);
// };
self.addEventListener('install', (event)=>{
    self.skipWaiting();
    console.log('*** worker: installing...');
});
self.addEventListener('activate', (event)=>{
    console.log('*** worker: activated');
});
self.addEventListener('message', (event)=>{
    const data = JSON.parse(event.data);
    // console.log('*** worker: received message: ', data);
    if ($b18aa980654e4edf$var$updateLoopId) {
        console.log('*** worker: clearing timeout: ', $b18aa980654e4edf$var$updateLoopId);
        clearTimeout($b18aa980654e4edf$var$updateLoopId);
        $b18aa980654e4edf$var$updateLoopId = 0;
    }
    // if (data.disconnected === false || data.visibility === 'visible') return;
    if (data.disconnected || data.visibility) {
        // kobold has lost focus
        console.log('*** worker: disconnected');
        updateLoop();
        function updateLoop() {
            $b18aa980654e4edf$var$updateLoopId = setTimeout(()=>{
                // console.log(`*** worker: ${updateLoopId} seconds have elapsed`);
                console.log(`*** worker: ${$b18aa980654e4edf$var$updateLoopId} seconds; self.config.next_alarm.time: ${self.config.next_alarm.time}`);
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
            self.hass.callService('system_log', 'write', {
                'message': '*** Worker: TEST',
                'level': 'info'
            });
            const nextAlarm = self.config.next_alarm;
            const dateToday = (0, (/*@__PURE__*/$parcel$interopDefault($4KHb5)))().format('YYYY-MM-DD');
            nextAlarmResetThrottled = (0, $2hiuM.Helpers).throttle(()=>{
                if (self.config.debug) {
                    console.warn('*** worker.valuate(); Resetting nextAlarm because nextAlarm date is in the past');
                    self.hass.callService('system_log', 'write', {
                        'message': '*** Worker: Resetting nextAlarm because nextAlarm date is in the past',
                        'level': 'info'
                    });
                }
                nextAlarmReset();
            }, 1000);
            function nextAlarmReset(snooze = false) {
                let keyValue;
                if (snooze) {
                    const nextAlarmTime = (0, (/*@__PURE__*/$parcel$interopDefault($4KHb5)))().add((0, (/*@__PURE__*/$parcel$interopDefault($4KHb5))).duration(self.config.snooze_duration_default));
                    keyValue = {
                        overridden: true,
                        snooze: true,
                        enabled: true,
                        time: nextAlarmTime.format('HH:mm:ss'),
                        date: nextAlarmTime.format('YYYY-MM-DD'),
                        date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss')
                    };
                } else {
                    const dayTomorrow = (0, (/*@__PURE__*/$parcel$interopDefault($4KHb5)))().add(1, 'day').format('dd').toLowerCase();
                    const dayToday = (0, (/*@__PURE__*/$parcel$interopDefault($4KHb5)))().format('dd').toLowerCase();
                    const forToday = (0, (/*@__PURE__*/$parcel$interopDefault($4KHb5)))().format('HH:mm:ss') < self.config[dayToday].time;
                    const newAlarm = forToday ? self.config[dayToday] : self.config[dayTomorrow];
                    keyValue = AlarmController.createNextAlarm(newAlarm, forToday);
                }
                if (!!(0, $2hiuM.Helpers).deepCompareObj(this.nextAlarm, keyValue)) this.nextAlarm = keyValue;
            }
            // is nextAlarm in the past?
            if (nextAlarm.date < dateToday || (0, (/*@__PURE__*/$parcel$interopDefault($4KHb5)))().subtract(1, 'minute') > (0, (/*@__PURE__*/$parcel$interopDefault($4KHb5)))(nextAlarm.date_time) && nextAlarm.date === dateToday) {
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
    } else // data should be config
    // console.log('*** worker: received data');
    if (!data || data && (!data?.config || !data?.hass || !data?.callService)) console.log('*** worker: expected data not received: ', data);
    else {
        self.config = data.config; // does this need to be cached?
        self.hass = data.hass;
        const callService = new Function(data.callService);
        self.hass.callService = callService;
        console.log('*** data.callService: ', data.callService);
        try {
            self.hass.callService('browser_mod', 'popup', {
                browser_id: 'framework-vivaldi',
                content: 'Yo, chump!'
            });
        } catch (error) {
            console.error(`*** callService failed with ${error}`);
        }
        // config = data; // if above doesn't work
        // console.log('*** worker: self.config: ', self.config);
        console.log('*** worker: received config; self.config.next_alarm.time: ', self.config.next_alarm.time);
    }
});

});
parcelRegister("2hiuM", function(module, exports) {

$parcel$export(module.exports, "Helpers", function () { return $3551f32bb6ed5411$export$4dc2b60021baefca; });
// HA types
parcelRequire("hCkwn");
var $dxdYy = parcelRequire("dxdYy");
class $3551f32bb6ed5411$export$4dc2b60021baefca {
    static #_ = this.getHa = ()=>{
        let root = document.querySelector('home-assistant');
        return root;
    };
    static #_2 = this.getEditor = ()=>{
        let root = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-dialog-edit-card');
        // console.log('*** getEditor(); root: ', root);
        return root;
    };
    static #_3 = this.getPreview = ()=>{
        let root = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-dialog-edit-card');
        root = root && root.shadowRoot;
        root = root && root.querySelector('div.element-preview');
        // console.log('*** getPreview(); root: ', root);
        return root;
    };
    static #_4 = this.getEditorButtons = ()=>{
        let root = this.getEditor();
        root = root && root.shadowRoot;
        root = root && root.querySelector('div[slot="primaryAction"]');
        // console.log('*** getEditorButtons(); root: ', root);
        return root;
    };
    static #_5 = this.getLovelace = ()=>{
        let root = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('home-assistant-main');
        root = root && root.shadowRoot;
        root = root && root.querySelector('ha-panel-lovelace');
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-root');
        // console.log('*** getLovelace(); root: ', root);
        return root;
    };
    static #_6 = this.getBackground = ()=>{
        let root = this.getLovelace();
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-view-background');
        // console.log('*** getBackground(); root: ', root);
        return root;
    };
    static #_7 = this.getDrawer = ()=>{
        let root = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('home-assistant-main');
        root = root && root.shadowRoot;
        root = root && root.querySelector('ha-drawer');
        root = root && root.shadowRoot;
        root = root && root.querySelector('aside');
        // console.log('*** getDrawer(); root: ', root);
        return root;
    };
    static #_8 = this.getNotification = ()=>{
        let root = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('notification-manager');
        root = root && root.shadowRoot;
        root = root && root.querySelector('ha-toast');
        // console.log('*** getNotification(); root: ', root);
        return root;
    };
    static #_9 = this.fireEvent = (event, detail, element = this.getLovelace())=>{
        element.dispatchEvent(new CustomEvent(event, {
            detail: detail,
            bubbles: true,
            cancelable: false,
            composed: true
        }));
    };
    static deepMerge(obj1, obj2) {
        const result = {
            ...obj1
        };
        for(let key in obj2)if (obj2.hasOwnProperty(key)) {
            if (obj2[key] instanceof Object && obj1[key] instanceof Object) result[key] = this.deepMerge(obj1[key], obj2[key]);
            else result[key] = obj2[key];
        }
        return result;
    }
    // returns object containing all and only changed properties
    static deepCompareObj(original, current) {
        if (original === current) return null;
        // Handle non-object types (including null)
        if (typeof original !== 'object' || typeof current !== 'object' || original === null || current === null) return current;
        const changes = {};
        let hasChanges = false;
        // Check for changes in current object
        for (const key of Object.keys(current)){
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
        for (const key of Object.keys(original))if (!(key in current)) {
            changes[key] = undefined;
            hasChanges = true;
        }
        return hasChanges ? changes : null;
    }
    static findNested(obj, key, val) {
        let found;
        JSON.stringify(obj, (_, nestedVal)=>{
            if (nestedVal && nestedVal[key] === val) found = nestedVal;
            return nestedVal;
        });
        return found;
    }
    static throttle(fn, delay) {
        let timerFlag = null;
        return (...args)=>{
            if (timerFlag === null) {
                fn(...args);
                timerFlag = setTimeout(()=>{
                    timerFlag = null;
                }, delay);
            }
        };
    }
    static #_10 = // source: https://github.com/home-assistant/frontend/blob/dev/src/common/config/version.ts
    // @param version (this._hass.config.version)
    // @param major (major version number)
    // @param minor (minor version number)
    // @returns boolean
    this.atLeastVersion = (version, major, minor, patch)=>{
        const [haMajor, haMinor, haPatch] = version.split(".", 3);
        return Number(haMajor) > major || Number(haMajor) === major && (patch === undefined ? Number(haMinor) >= minor : Number(haMinor) > minor) || patch !== undefined && Number(haMajor) === major && Number(haMinor) === minor && Number(haPatch) >= patch;
    };
    static #_11 = this.testUntilTimeout = async (f, timeoutMs)=>{
        return new Promise((resolve, reject)=>{
            const timeWas = new Date();
            const wait = setInterval(function() {
                if (f()) {
                    clearInterval(wait);
                    resolve('resolved');
                } else if (new Date().valueOf() - timeWas.valueOf() > timeoutMs) {
                    clearInterval(wait);
                    reject('timed out');
                }
            }, 20);
        });
    };
    static updateHeight(element) {
        if (this._updateHeightOnNormalCard(element)) return true;
        if (this._updateHeightOnNestedCards(element)) return true;
        return false;
    }
    static _updateHeightOnNormalCard(element) {
        if (element.shadowRoot) {
            let cardTag = element.shadowRoot.querySelector('ha-card');
            if (cardTag) {
                cardTag.style.height = "100%";
                cardTag.style.boxSizing = "border-box";
                return true;
            }
        }
        return false;
    }
    static _updateHeightOnNestedCards(element) {
        if (element.firstChild && element.children[0].shadowRoot) {
            let cardTag = element.children[0].shadowRoot.querySelector('ha-card');
            if (cardTag) {
                cardTag.style.height = "100%";
                cardTag.style.boxSizing = "border-box";
                return true;
            }
        }
        return false;
    }
    // https://github.com/KipK/load-ha-components/tree/main
    static async preloadHaElements(elements) {
        await (0, $dxdYy.loadHaComponents)(elements);
    }
}

});
parcelRegister("hCkwn", function(module, exports) {

$parcel$export(module.exports, "loadHaComponents", function () { return (parcelRequire("dxdYy")).loadHaComponents; });

var $dxdYy = parcelRequire("dxdYy");
const $cd35e75e1a9c5385$export$7e942a124a34547f = [
    'ha-form',
    'ha-icon',
    'ha-icon-button',
    'ha-selector',
    'ha-textfield',
    'ha-icon-picker',
    'ha-entity-picker',
    'ha-select',
    'ha-dialog',
    'ha-sortable',
    'ha-svg-icon',
    'ha-alert',
    'mwc-button'
];

});
parcelRegister("dxdYy", function(module, exports) {

$parcel$export(module.exports, "loadHaComponents", function () { return $9da932b9c09254e6$export$5b9848928059ec76; });
/**
 * Utility function to asynchronously load Home Assistant form components
 * if they are not already registered in the custom elements registry.
 *
 * @param components - Optional array of component names to load. If not provided, defaults to a predefined list.
 * @returns Promise that resolves when all required components are loaded
 */ // Define the default list of required components
const $9da932b9c09254e6$var$DEFAULT_HA_COMPONENTS = [
    'ha-form',
    'ha-icon',
    'ha-icon-button',
    'ha-selector',
    'ha-textfield',
    'ha-icon-picker',
    'ha-icon-button',
    'ha-entity-picker',
    'ha-select',
    'ha-dialog',
    'ha-sortable',
    'ha-svg-icon',
    'ha-alert',
    'ha-button',
    'ha-color-picker',
    'ha-badge',
    'ha-sankey-chart',
    'mwc-button'
];
const $9da932b9c09254e6$export$5b9848928059ec76 = async (components)=>{
    // Use provided components or default to the predefined list
    const componentsToLoad = components || $9da932b9c09254e6$var$DEFAULT_HA_COMPONENTS;
    try {
        // Check if all required custom elements are already defined
        if (componentsToLoad.every((component)=>customElements.get(component))) return;
        // Wait for the partial-panel-resolver to be defined with timeout
        await Promise.race([
            customElements.whenDefined('partial-panel-resolver'),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error('Timeout waiting for partial-panel-resolver')), 10000))
        ]);
        // Create and configure the panel resolver with proper typing
        const ppr = document.createElement('partial-panel-resolver');
        // Check if the element was created successfully
        if (!ppr) throw new Error('Failed to create partial-panel-resolver element');
        ppr.hass = {
            panels: [
                {
                    url_path: 'tmp',
                    component_name: 'config'
                }
            ]
        };
        // Check if _updateRoutes method exists
        if (typeof ppr._updateRoutes !== 'function') throw new Error('partial-panel-resolver does not have _updateRoutes method');
        ppr._updateRoutes();
        // Check if routes were created
        if (!ppr.routerOptions?.routes?.tmp?.load) throw new Error('Failed to create tmp route in partial-panel-resolver');
        // Load the temporary route with timeout
        await Promise.race([
            ppr.routerOptions.routes.tmp.load(),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error('Timeout loading tmp route')), 10000))
        ]);
        // Wait for the config panel to be defined with timeout
        await Promise.race([
            customElements.whenDefined('ha-panel-config'),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error('Timeout waiting for ha-panel-config')), 10000))
        ]);
        // Create the config panel and load automation components with proper typing
        const cpr = document.createElement('ha-panel-config');
        // Check if the element was created successfully
        if (!cpr) throw new Error('Failed to create ha-panel-config element');
        // Check if automation route exists
        if (!cpr.routerOptions?.routes?.automation?.load) throw new Error('ha-panel-config does not have automation route');
        // Load automation components with timeout
        await Promise.race([
            cpr.routerOptions.routes.automation.load(),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error('Timeout loading automation components')), 10000))
        ]);
        // Final verification that components were loaded
        const missingComponents = componentsToLoad.filter((component)=>!customElements.get(component));
        if (missingComponents.length > 0) throw new Error(`Failed to load components: ${missingComponents.join(', ')}`);
    } catch (error) {
        // Log the error but don't throw to prevent breaking the card
        console.error('Error loading Home Assistant form components:', error);
        // Attempt to use a fallback approach if available
        try {
            // Try to load components directly from Home Assistant frontend if available
            if (window.customElements && window.customElements.get('home-assistant')) {
                console.log('Attempting fallback loading method for HA components');
                // This is a fallback approach that might work in some environments
                const event = new CustomEvent('ha-request-load-components', {
                    detail: {
                        components: componentsToLoad
                    },
                    bubbles: true,
                    composed: true
                });
                document.dispatchEvent(event);
            }
        } catch (fallbackError) {
            console.error('Fallback loading method failed:', fallbackError);
        }
    }
};

});



parcelRegister("4KHb5", function(module, exports) {
!function(t, e) {
    module.exports = e();
}(module.exports, function() {
    "use strict";
    var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = {
        name: "en",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        ordinal: function(t) {
            var e = [
                "th",
                "st",
                "nd",
                "rd"
            ], n = t % 100;
            return "[" + t + (e[(n - 20) % 10] || e[n] || e[0]) + "]";
        }
    }, m = function(t, e, n) {
        var r = String(t);
        return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
    }, v = {
        s: m,
        z: function(t) {
            var e = -t.utcOffset(), n = Math.abs(e), r = Math.floor(n / 60), i = n % 60;
            return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
        },
        m: function t(e, n) {
            if (e.date() < n.date()) return -t(n, e);
            var r = 12 * (n.year() - e.year()) + (n.month() - e.month()), i = e.clone().add(r, c), s = n - i < 0, u = e.clone().add(r + (s ? -1 : 1), c);
            return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
        },
        a: function(t) {
            return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
        },
        p: function(t) {
            return ({
                M: c,
                y: h,
                w: o,
                d: a,
                D: d,
                h: u,
                m: s,
                s: i,
                ms: r,
                Q: f
            })[t] || String(t || "").toLowerCase().replace(/s$/, "");
        },
        u: function(t) {
            return void 0 === t;
        }
    }, g = "en", D = {};
    D[g] = M;
    var p = "$isDayjsObject", S = function(t) {
        return t instanceof _ || !(!t || !t[p]);
    }, w = function t(e, n, r) {
        var i;
        if (!e) return g;
        if ("string" == typeof e) {
            var s = e.toLowerCase();
            D[s] && (i = s), n && (D[s] = n, i = s);
            var u = e.split("-");
            if (!i && u.length > 1) return t(u[0]);
        } else {
            var a = e.name;
            D[a] = e, i = a;
        }
        return !r && i && (g = i), i || !r && g;
    }, O = function(t, e) {
        if (S(t)) return t.clone();
        var n = "object" == typeof e ? e : {};
        return n.date = t, n.args = arguments, new _(n);
    }, b = v;
    b.l = w, b.i = S, b.w = function(t, e) {
        return O(t, {
            locale: e.$L,
            utc: e.$u,
            x: e.$x,
            $offset: e.$offset
        });
    };
    var _ = function() {
        function M(t) {
            this.$L = w(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[p] = !0;
        }
        var m = M.prototype;
        return m.parse = function(t) {
            this.$d = function(t) {
                var e = t.date, n = t.utc;
                if (null === e) return new Date(NaN);
                if (b.u(e)) return new Date;
                if (e instanceof Date) return new Date(e);
                if ("string" == typeof e && !/Z$/i.test(e)) {
                    var r = e.match($);
                    if (r) {
                        var i = r[2] - 1 || 0, s = (r[7] || "0").substring(0, 3);
                        return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
                    }
                }
                return new Date(e);
            }(t), this.init();
        }, m.init = function() {
            var t = this.$d;
            this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
        }, m.$utils = function() {
            return b;
        }, m.isValid = function() {
            return !(this.$d.toString() === l);
        }, m.isSame = function(t, e) {
            var n = O(t);
            return this.startOf(e) <= n && n <= this.endOf(e);
        }, m.isAfter = function(t, e) {
            return O(t) < this.startOf(e);
        }, m.isBefore = function(t, e) {
            return this.endOf(e) < O(t);
        }, m.$g = function(t, e, n) {
            return b.u(t) ? this[e] : this.set(n, t);
        }, m.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
        }, m.valueOf = function() {
            return this.$d.getTime();
        }, m.startOf = function(t, e) {
            var n = this, r = !!b.u(e) || e, f = b.p(t), l = function(t, e) {
                var i = b.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
                return r ? i : i.endOf(a);
            }, $ = function(t, e) {
                return b.w(n.toDate()[t].apply(n.toDate("s"), (r ? [
                    0,
                    0,
                    0,
                    0
                ] : [
                    23,
                    59,
                    59,
                    999
                ]).slice(e)), n);
            }, y = this.$W, M = this.$M, m = this.$D, v = "set" + (this.$u ? "UTC" : "");
            switch(f){
                case h:
                    return r ? l(1, 0) : l(31, 11);
                case c:
                    return r ? l(1, M) : l(0, M + 1);
                case o:
                    var g = this.$locale().weekStart || 0, D = (y < g ? y + 7 : y) - g;
                    return l(r ? m - D : m + (6 - D), M);
                case a:
                case d:
                    return $(v + "Hours", 0);
                case u:
                    return $(v + "Minutes", 1);
                case s:
                    return $(v + "Seconds", 2);
                case i:
                    return $(v + "Milliseconds", 3);
                default:
                    return this.clone();
            }
        }, m.endOf = function(t) {
            return this.startOf(t, !1);
        }, m.$set = function(t, e) {
            var n, o = b.p(t), f = "set" + (this.$u ? "UTC" : ""), l = (n = {}, n[a] = f + "Date", n[d] = f + "Date", n[c] = f + "Month", n[h] = f + "FullYear", n[u] = f + "Hours", n[s] = f + "Minutes", n[i] = f + "Seconds", n[r] = f + "Milliseconds", n)[o], $ = o === a ? this.$D + (e - this.$W) : e;
            if (o === c || o === h) {
                var y = this.clone().set(d, 1);
                y.$d[l]($), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;
            } else l && this.$d[l]($);
            return this.init(), this;
        }, m.set = function(t, e) {
            return this.clone().$set(t, e);
        }, m.get = function(t) {
            return this[b.p(t)]();
        }, m.add = function(r, f) {
            var d, l = this;
            r = Number(r);
            var $ = b.p(f), y = function(t) {
                var e = O(l);
                return b.w(e.date(e.date() + Math.round(t * r)), l);
            };
            if ($ === c) return this.set(c, this.$M + r);
            if ($ === h) return this.set(h, this.$y + r);
            if ($ === a) return y(1);
            if ($ === o) return y(7);
            var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[$] || 1, m = this.$d.getTime() + r * M;
            return b.w(m, this);
        }, m.subtract = function(t, e) {
            return this.add(-1 * t, e);
        }, m.format = function(t) {
            var e = this, n = this.$locale();
            if (!this.isValid()) return n.invalidDate || l;
            var r = t || "YYYY-MM-DDTHH:mm:ssZ", i = b.z(this), s = this.$H, u = this.$m, a = this.$M, o = n.weekdays, c = n.months, f = n.meridiem, h = function(t, n, i, s) {
                return t && (t[n] || t(e, r)) || i[n].slice(0, s);
            }, d = function(t) {
                return b.s(s % 12 || 12, t, "0");
            }, $ = f || function(t, e, n) {
                var r = t < 12 ? "AM" : "PM";
                return n ? r.toLowerCase() : r;
            };
            return r.replace(y, function(t, r) {
                return r || function(t) {
                    switch(t){
                        case "YY":
                            return String(e.$y).slice(-2);
                        case "YYYY":
                            return b.s(e.$y, 4, "0");
                        case "M":
                            return a + 1;
                        case "MM":
                            return b.s(a + 1, 2, "0");
                        case "MMM":
                            return h(n.monthsShort, a, c, 3);
                        case "MMMM":
                            return h(c, a);
                        case "D":
                            return e.$D;
                        case "DD":
                            return b.s(e.$D, 2, "0");
                        case "d":
                            return String(e.$W);
                        case "dd":
                            return h(n.weekdaysMin, e.$W, o, 2);
                        case "ddd":
                            return h(n.weekdaysShort, e.$W, o, 3);
                        case "dddd":
                            return o[e.$W];
                        case "H":
                            return String(s);
                        case "HH":
                            return b.s(s, 2, "0");
                        case "h":
                            return d(1);
                        case "hh":
                            return d(2);
                        case "a":
                            return $(s, u, !0);
                        case "A":
                            return $(s, u, !1);
                        case "m":
                            return String(u);
                        case "mm":
                            return b.s(u, 2, "0");
                        case "s":
                            return String(e.$s);
                        case "ss":
                            return b.s(e.$s, 2, "0");
                        case "SSS":
                            return b.s(e.$ms, 3, "0");
                        case "Z":
                            return i;
                    }
                    return null;
                }(t) || i.replace(":", "");
            });
        }, m.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m.diff = function(r, d, l) {
            var $, y = this, M = b.p(d), m = O(r), v = (m.utcOffset() - this.utcOffset()) * e, g = this - m, D = function() {
                return b.m(y, m);
            };
            switch(M){
                case h:
                    $ = D() / 12;
                    break;
                case c:
                    $ = D();
                    break;
                case f:
                    $ = D() / 3;
                    break;
                case o:
                    $ = (g - v) / 6048e5;
                    break;
                case a:
                    $ = (g - v) / 864e5;
                    break;
                case u:
                    $ = g / n;
                    break;
                case s:
                    $ = g / e;
                    break;
                case i:
                    $ = g / t;
                    break;
                default:
                    $ = g;
            }
            return l ? $ : b.a($);
        }, m.daysInMonth = function() {
            return this.endOf(c).$D;
        }, m.$locale = function() {
            return D[this.$L];
        }, m.locale = function(t, e) {
            if (!t) return this.$L;
            var n = this.clone(), r = w(t, e, !0);
            return r && (n.$L = r), n;
        }, m.clone = function() {
            return b.w(this.$d, this);
        }, m.toDate = function() {
            return new Date(this.valueOf());
        }, m.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
        }, m.toISOString = function() {
            return this.$d.toISOString();
        }, m.toString = function() {
            return this.$d.toUTCString();
        }, M;
    }(), k = _.prototype;
    return O.prototype = k, [
        [
            "$ms",
            r
        ],
        [
            "$s",
            i
        ],
        [
            "$m",
            s
        ],
        [
            "$H",
            u
        ],
        [
            "$W",
            a
        ],
        [
            "$M",
            c
        ],
        [
            "$y",
            h
        ],
        [
            "$D",
            d
        ]
    ].forEach(function(t) {
        k[t[1]] = function(e) {
            return this.$g(e, t[0], t[1]);
        };
    }), O.extend = function(t, e) {
        return t.$i || (t(e, _, O), t.$i = !0), O;
    }, O.locale = w, O.isDayjs = S, O.unix = function(t) {
        return O(1e3 * t);
    }, O.en = D[g], O.Ls = D, O.p = {}, O;
});

});

parcelRegister("g2tgA", function(module, exports) {
!function(t, s) {
    module.exports = s();
}(module.exports, function() {
    "use strict";
    var t, s, n = 1e3, i = 6e4, e = 36e5, r = 864e5, o = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, u = 31536e6, d = 2628e6, a = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, h = {
        years: u,
        months: d,
        days: r,
        hours: e,
        minutes: i,
        seconds: n,
        milliseconds: 1,
        weeks: 6048e5
    }, c = function(t) {
        return t instanceof g;
    }, f = function(t, s, n) {
        return new g(t, n, s.$l);
    }, m = function(t) {
        return s.p(t) + "s";
    }, l = function(t) {
        return t < 0;
    }, $ = function(t) {
        return l(t) ? Math.ceil(t) : Math.floor(t);
    }, y = function(t) {
        return Math.abs(t);
    }, v = function(t, s) {
        return t ? l(t) ? {
            negative: !0,
            format: "" + y(t) + s
        } : {
            negative: !1,
            format: "" + t + s
        } : {
            negative: !1,
            format: ""
        };
    }, g = function() {
        function l(t, s, n) {
            var i = this;
            if (this.$d = {}, this.$l = n, void 0 === t && (this.$ms = 0, this.parseFromMilliseconds()), s) return f(t * h[m(s)], this);
            if ("number" == typeof t) return this.$ms = t, this.parseFromMilliseconds(), this;
            if ("object" == typeof t) return Object.keys(t).forEach(function(s) {
                i.$d[m(s)] = t[s];
            }), this.calMilliseconds(), this;
            if ("string" == typeof t) {
                var e = t.match(a);
                if (e) {
                    var r = e.slice(2).map(function(t) {
                        return null != t ? Number(t) : 0;
                    });
                    return this.$d.years = r[0], this.$d.months = r[1], this.$d.weeks = r[2], this.$d.days = r[3], this.$d.hours = r[4], this.$d.minutes = r[5], this.$d.seconds = r[6], this.calMilliseconds(), this;
                }
            }
            return this;
        }
        var y = l.prototype;
        return y.calMilliseconds = function() {
            var t = this;
            this.$ms = Object.keys(this.$d).reduce(function(s, n) {
                return s + (t.$d[n] || 0) * h[n];
            }, 0);
        }, y.parseFromMilliseconds = function() {
            var t = this.$ms;
            this.$d.years = $(t / u), t %= u, this.$d.months = $(t / d), t %= d, this.$d.days = $(t / r), t %= r, this.$d.hours = $(t / e), t %= e, this.$d.minutes = $(t / i), t %= i, this.$d.seconds = $(t / n), t %= n, this.$d.milliseconds = t;
        }, y.toISOString = function() {
            var t = v(this.$d.years, "Y"), s = v(this.$d.months, "M"), n = +this.$d.days || 0;
            this.$d.weeks && (n += 7 * this.$d.weeks);
            var i = v(n, "D"), e = v(this.$d.hours, "H"), r = v(this.$d.minutes, "M"), o = this.$d.seconds || 0;
            this.$d.milliseconds && (o += this.$d.milliseconds / 1e3, o = Math.round(1e3 * o) / 1e3);
            var u = v(o, "S"), d = t.negative || s.negative || i.negative || e.negative || r.negative || u.negative, a = e.format || r.format || u.format ? "T" : "", h = (d ? "-" : "") + "P" + t.format + s.format + i.format + a + e.format + r.format + u.format;
            return "P" === h || "-P" === h ? "P0D" : h;
        }, y.toJSON = function() {
            return this.toISOString();
        }, y.format = function(t) {
            var n = t || "YYYY-MM-DDTHH:mm:ss", i = {
                Y: this.$d.years,
                YY: s.s(this.$d.years, 2, "0"),
                YYYY: s.s(this.$d.years, 4, "0"),
                M: this.$d.months,
                MM: s.s(this.$d.months, 2, "0"),
                D: this.$d.days,
                DD: s.s(this.$d.days, 2, "0"),
                H: this.$d.hours,
                HH: s.s(this.$d.hours, 2, "0"),
                m: this.$d.minutes,
                mm: s.s(this.$d.minutes, 2, "0"),
                s: this.$d.seconds,
                ss: s.s(this.$d.seconds, 2, "0"),
                SSS: s.s(this.$d.milliseconds, 3, "0")
            };
            return n.replace(o, function(t, s) {
                return s || String(i[t]);
            });
        }, y.as = function(t) {
            return this.$ms / h[m(t)];
        }, y.get = function(t) {
            var s = this.$ms, n = m(t);
            return "milliseconds" === n ? s %= 1e3 : s = "weeks" === n ? $(s / h[n]) : this.$d[n], s || 0;
        }, y.add = function(t, s, n) {
            var i;
            return i = s ? t * h[m(s)] : c(t) ? t.$ms : f(t, this).$ms, f(this.$ms + i * (n ? -1 : 1), this);
        }, y.subtract = function(t, s) {
            return this.add(t, s, !0);
        }, y.locale = function(t) {
            var s = this.clone();
            return s.$l = t, s;
        }, y.clone = function() {
            return f(this.$ms, this);
        }, y.humanize = function(s) {
            return t().add(this.$ms, "ms").locale(this.$l).fromNow(!s);
        }, y.valueOf = function() {
            return this.asMilliseconds();
        }, y.milliseconds = function() {
            return this.get("milliseconds");
        }, y.asMilliseconds = function() {
            return this.as("milliseconds");
        }, y.seconds = function() {
            return this.get("seconds");
        }, y.asSeconds = function() {
            return this.as("seconds");
        }, y.minutes = function() {
            return this.get("minutes");
        }, y.asMinutes = function() {
            return this.as("minutes");
        }, y.hours = function() {
            return this.get("hours");
        }, y.asHours = function() {
            return this.as("hours");
        }, y.days = function() {
            return this.get("days");
        }, y.asDays = function() {
            return this.as("days");
        }, y.weeks = function() {
            return this.get("weeks");
        }, y.asWeeks = function() {
            return this.as("weeks");
        }, y.months = function() {
            return this.get("months");
        }, y.asMonths = function() {
            return this.as("months");
        }, y.years = function() {
            return this.get("years");
        }, y.asYears = function() {
            return this.as("years");
        }, l;
    }(), p = function(t, s, n) {
        return t.add(s.years() * n, "y").add(s.months() * n, "M").add(s.days() * n, "d").add(s.hours() * n, "h").add(s.minutes() * n, "m").add(s.seconds() * n, "s").add(s.milliseconds() * n, "ms");
    };
    return function(n, i, e) {
        t = e, s = e().$utils(), e.duration = function(t, s) {
            var n = e.locale();
            return f(t, {
                $l: n
            }, s);
        }, e.isDuration = c;
        var r = i.prototype.add, o = i.prototype.subtract;
        i.prototype.add = function(t, s) {
            return c(t) ? p(this, t, 1) : r.bind(this)(t, s);
        }, i.prototype.subtract = function(t, s) {
            return c(t) ? p(this, t, -1) : o.bind(this)(t, s);
        };
    };
});

});



parcelRequire("ff36j");
})();
//# sourceMappingURL=worker.js.map
