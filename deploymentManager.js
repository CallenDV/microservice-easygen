const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function deployService(serviceName, serviceCode) {
    const deploymentCommand = `node services/${serviceName.toLowerCase()}.js`;
    
    try {
        const { stdout, stderr } = await execPromise(deploymentCommand);
        return { stdout, stderr };
    } catch (error) {
        throw new Error(`Deployment failed: ${error.message}`);
    }
}

module.exports = { deployService };
