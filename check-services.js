const http = require("http");

const services = [
  {
    name: "PhpMyAdmin",
    options: { hostname: "localhost", port: 8888, timeout: 2000 },
  },
  {
    name: "API",
    options: { hostname: "localhost", port: 3333, timeout: 2000 },
  },
  {
    name: "Front (build)",
    options: { hostname: "localhost", port: 80, timeout: 2000 },
  },
  {
    name: "Front (dev)",
    options: { hostname: "localhost", port: 8000, timeout: 2000 },
  },
];

let loadingIntervalId = null;

const checkService = (service) => {
  const request = http.request(service.options, (res) => {
    if (!service.readyLogged) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      console.log(`✅ ${service.name} IS READY!`);
      service.readyLogged = true;
    }
    service.ready = true;
    if (services.every((service) => service.ready)) {
      clearInterval(intervalId);
      clearInterval(loadingIntervalId);
    }
  });

  request.on("error", function (err) {
    if (!service.notReady) {
      console.log(`🔴 ${service.name} IS NOT READY YET`);
      service.notReady = true;
      if (loadingIntervalId === null) {
        let loading = 0;
        loadingIntervalId = setInterval(() => {
          if (loading === 3) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            loading = 0;
          } else {
            process.stdout.write(".");
            loading++;
          }
        }, 1000);
      }
    }
  });

  request.end();
};

const intervalId = setInterval(() => {
  services.forEach(checkService);
}, 1000);
