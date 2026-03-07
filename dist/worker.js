(function () {

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
    if (data.disconnected === false || data.visibility === 'visible') return;
    if (data.disconnected || data.visibility) {
        // kobold has lost focus
        console.log('*** worker: disconnected');
        updateLoop();
        function updateLoop() {
            $b18aa980654e4edf$var$updateLoopId = setTimeout(()=>{
                console.log(`*** worker: ${$b18aa980654e4edf$var$updateLoopId} seconds have elapsed`);
                console.log('*** worker: nextAlarm time: ', self.config.next_alarm.time);
                updateLoop();
            }, 1000);
        }
    } else {
        // data should be config
        console.log('*** worker: received data');
        if (!data || data && !data?.next_alarm?.time) console.log('*** worker: expected config data not received: ', data);
        self.config = data; // does this need to be cached?
        // config = data; // if above doesn't work
        console.log('*** worker: self.config: ', self.config);
    }
});

});


parcelRequire("ff36j");
})();
//# sourceMappingURL=worker.js.map
