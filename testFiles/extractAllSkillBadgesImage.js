const badges = require('../requiredFiles/SkillBadgesWithLink.json')
const axios = require('axios')
const cheerio = require('cheerio');

// import badges from '../requiredFiles/SkillBadgesWithLink.json'
// import axios from 'axios'
// import cheerio from 'cheerio'

class SkillBadgesWithImages {
    async main() {

        let links = []
        Object.entries(badges).map(([badge, link]) => {
            links.push(link)
        })

        // console.log(links)


        let Images = {}
        for (let index = 0; index < links.length; index++) {
            const badgeLink = links[index];
            var response = await axios.get(badgeLink);
            const $ = cheerio.load(response.data);

            let imageUrl = $('.course-badge >img')
            imageUrl = imageUrl.attr('src');
            Images[badgeLink] = imageUrl;
            // main - {badge name : badge link}
            // second - {badge link : badge img}
            // result - {badge name : [badge link, badge image]}

        }
        // return Images;

        let result = {}
        Object.entries(badges).map(([badge, link]) => {
            result[badge] = [link, Images[link]]
        })

        return result
    }
}


module.exports = SkillBadgesWithImages;
