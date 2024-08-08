const fs = require('fs');
const path = require('path');

const deployTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
const envFilePath = path.resolve(__dirname, '.env');

fs.writeFileSync(envFilePath, `REACT_APP_DEPLOY_TIME=${deployTime}\n`, { flag: 'a' });
console.log(`Deployment time set to: ${deployTime}`);
