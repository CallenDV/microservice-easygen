const os = require('os');

let monitoringData = {
    cpu: 0,
    memory: 0,
    uptime: 0,
};

function updateMonitoringData() {
    monitoringData.cpu = os.loadavg()[0];
    monitoringData.memory = 1 - os.freemem() / os.totalmem();
    monitoringData.uptime = os.uptime();
}

function getMonitoringData() {
    return monitoringData;
}

module.exports = { updateMonitoringData, getMonitoringData };
