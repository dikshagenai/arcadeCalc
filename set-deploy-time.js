const fs = require('fs');
const path = require('path');

const date = new Date();
const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
const indiaTime = new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');

const envFilePath = path.resolve(__dirname, '.env');
fs.writeFileSync(envFilePath, `REACT_APP_DEPLOY_TIME=${indiaTime}\n`, { flag: 'a' });
console.log(`Deployment time set to: ${indiaTime}`);
