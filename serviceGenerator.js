// Made some comments to make it easy to understand
const fs = require('fs').promises;
const path = require('path');

async function generateService(serviceName, serviceDescription) {
    const template = `
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to ${serviceName}', description: '${serviceDescription}' });
});

app.listen(port, () => {
    console.log(\`${serviceName} microservice running on port \${port}\`);
});
`;

    const fileName = `${serviceName.toLowerCase()}.js`;
    await fs.writeFile(path.join(__dirname, 'services', fileName), template);
    return template;
}

module.exports = { generateService };
