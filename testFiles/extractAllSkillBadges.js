const cheerio = require("cheerio");
const axios = require("axios");

//^ ------------------------------------------- CODE TO EXTRACT ALL SKILL BADGES INTO A FILE 
const extractSkillBadges = async () => {

    try {
        const urls = [];
        for (let page = 1; page < 10; page++) {
            const url = `https://www.cloudskillsboost.google/catalog?format%5B%5D=courses&keywords=&locale=&page=${page}&skill-badge%5B%5D=skill-badge`;
            urls.push(url);
        }

        const badges = [];
        for (const url of urls) {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            $('h3').each((i, h3) => {
                const a_tag = $(h3).find('a');
                if (a_tag.length) {
                    badges.push(a_tag.text().trim());
                }
            });
        }
        fs.writeFileSync('./createByAPI/AllSkillBadges.txt', badges.join('\n'));
    } catch (error) {
        setSuccess("False")
        setStatusCode(500) // Bad Gateway
        setMessage("Internal Server Error")
        console.log("Error while extracting Skill Badges: " + error);
    }

}