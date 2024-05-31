const http = require('http');
const options = {
    hostname: 'localhost',
    port: 3333,
    timeout: 2000,
};

let notReadyMessagePrinted = false;
let loadingIntervalId = null;

const checkService = () => {
    const request = http.request(options, (res) => {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log('✅ ALL SERVICES ARE READY!');
        clearInterval(intervalId);
        clearInterval(loadingIntervalId); 
    });

    request.on('error', function (err) {
        if (!notReadyMessagePrinted) {
            console.log('🔴 NOT READY YET');
            notReadyMessagePrinted = true;

            if (loadingIntervalId === null) {
                let loading = 0;
                loadingIntervalId = setInterval(() => {
                    if (loading === 3) {
                        process.stdout.clearLine();
                        process.stdout.cursorTo(0);
                        loading = 0;
                    } else {
                        process.stdout.write('.');
                        loading++;
                    }
                }, 1000);
            }
        }
    });

    request.end();
};

const intervalId = setInterval(checkService, 1000);