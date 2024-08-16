// I made some comments to make it easy to understand
const express = require('express');
const serviceGenerator = require('./serviceGenerator');
const deploymentManager = require('./deploymentManager');
const monitoringService = require('./monitoringService');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to create a new microservice
app.post('/create-service', async (req, res) => {
    try {
        const { serviceName, serviceDescription } = req.body;
        const serviceCode = await serviceGenerator.generateService(serviceName, serviceDescription);
        const deploymentResult = await deploymentManager.deployService(serviceName, serviceCode);
        res.json({ message: 'Service created and deployed', deploymentResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get monitoring data
app.get('/monitoring', (req, res) => {
    const monitoringData = monitoringService.getMonitoringData();
    res.json(monitoringData);
});

app.listen(port, () => {
    console.log(`Dynamic Microservices Orchestrator running on port ${port}`);
});

// Periodically update monitoring data
setInterval(() => {
    monitoringService.updateMonitoringData();
}, 60000);
