const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config()


// Below this will take care of the site's last modification
const date = new Date();
const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
const indiaTime = new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');


// Below this will take care of the updates file



function getLastModified(file) {
    const modifiedTime = fs.statSync(file).mtime
    const formattedTime = modifiedTime.toISOString().replace(/[-:.AZT]/g, '');
    return formattedTime;
}


function checkForModification(directory) {
    const files = fs.readdirSync(directory)
    const allFilesLastUpdates = []

    for (let i = 0; i < files.length; i++) {
        let file = path.join(directory, files[i])
        // console.log(file)
        allFilesLastUpdates.push(getLastModified(file));
    }

    const latestUpdate = Math.max(...allFilesLastUpdates)
    const storedLastUpdateTime = (process.env.REACT_APP_LAST_UPDATED ? process.env.REACT_APP_LAST_UPDATED : 0)

    if (latestUpdate > storedLastUpdateTime) {
        console.log('Modified: ' + latestUpdate)
        return latestUpdate
    }
    else {
        console.log('Not Modified')
        return storedLastUpdateTime
    }
}

// folder to be tracked
const updateFolder = path.resolve(__dirname, './src/assets/updates/')

// last updated time
const lastUpdatedTime = checkForModification(updateFolder)
const envFilePath = path.resolve(__dirname, '.env');

const envFileData = `REACT_APP_DEPLOY_TIME=${indiaTime}\n
REACT_APP_LAST_UPDATED=${lastUpdatedTime}\n`

fs.writeFileSync(envFilePath, envFileData, { flag: 'w' });

console.log(`Deployment time set to: ${indiaTime}`);

