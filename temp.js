// Review: This just helps me to create a separate file for the badges that are not found!

const mine = require('./src/assets/SkillBadgesWithLink')
const easy = require('./src/assets/skillBadges/easyBadges')
const easyButLengthy = require('./src/assets/skillBadges/easyButLengthy')


const mineList = []
const their = []
const notFound = []

Object.entries(mine).map(([key, value]) => {
    mineList.push(key)
    return "done"
})

Object.entries(easy).map(([key, value]) => {
    their.push(key)
    return "done"
})

Object.entries(easyButLengthy).map(([key, value]) => {
    their.push(key)
    return "done"
})

for (let index = 0; index < mineList.length; index++) {
    // write a function to check while while the array `their` containing the element of mine which can be obtained by mine[index].
    if (their.indexOf(mineList[index]) === -1) {
        console.log(`Your badge ${mineList[index]} is not found in the provided list`)
        notFound.push(mineList[index])
    }

}

console.log(`Total not found: ${notFound.length}`)
// console.log(notFound)

// write this data into a new json file named notFound.json
const jsonFile = {}
for (let index = 0; index < notFound.length; index++) {
    jsonFile[notFound[index]] = mine[notFound[index]];
}

console.log(jsonFile)
// now create its file

const fs = require('fs');
fs.writeFile('notFound.json', JSON.stringify(jsonFile, null, 4), (err) => {
    if (err) console.error(err);
    console.log('File has been saved!');
});
