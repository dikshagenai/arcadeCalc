const badges = require('./data.json')
const axios = require('axios')
const cheerio = require('cheerio');

const mainUrl = "https://www.cloudskillsboost.google"

let finalData = {};

// for (let index = 0; index < badges.length; index++) {
for (let index = 0; index < 10; index++) {
const badge = badges[index];

    finalData[badge['title']] = { "link": "", "image": "" }

    var response = await axios.get(badgeLink);
    const $ = cheerio.load(response.data);
    let imageUrl = $('.course-badge >img')
    imageUrl = imageUrl.attr('src');
    
    // finally adding the data...
    finalData[badge['title']] = { "link": `${mainUrl}${badge['path']}`, "image": imageUrl}

}
