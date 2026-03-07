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

    if (data.disconnected === false || data.visibility === 'visible') return;

    if (data.disconnected || data.visibility) {
        // kobold has lost focus
        console.log('*** worker: disconnected');
        updateLoop();

        function updateLoop() {
            updateLoopId = setTimeout(() => {
                console.log(`*** worker: ${updateLoopId} seconds have elapsed`);
                console.log('*** worker: nextAlarm time: ', self.config.next_alarm.time);
                updateLoop();
            }, 1000);
        }
    } else {
        // data should be config
        console.log('*** worker: received data');
        if (!data || (data && !data?.next_alarm?.time)) {
            console.log('*** worker: expected config data not received: ', data);
        }
        self.config = data; // does this need to be cached?
        // config = data; // if above doesn't work
        console.log('*** worker: self.config: ', self.config);
    }

});