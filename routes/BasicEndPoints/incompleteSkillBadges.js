// import fs from 'fs';
// import axios from 'axios';
// import cheerio from "cheerio";


const axios = require('axios');
const cheerio = require('cheerio');

// json file have structure like 
// {BadgeName : ['Badge Link', "Badge Image"]}
// const skillBadgesFromDatabase = require('../../requiredFiles/SkillBadgesLinkImages.json')

const { getSkillBadges } = require('../BasicEndPoints/Functions/Badges/extractBadgesFromServer')

// For notifications.
class IncompleteSkillBadges {



    //^------------------------------------------- CODE TO SCRAP THE PAGE
    async scrapPage(publicUrl) {
        // Fetching badges from the database

        let skillBadgesFromDatabase = {}
        try {
            const badges = await getSkillBadges();
            console.log(badges)
            if (badges['success'] === false) {
                throw new Error("Failed to get data from the database");
            }
            skillBadgesFromDatabase = badges['data'];
        } catch (error) {
            // console.log(error)
        }


        let data = {} // all data about the user will be stored in this  

        try {
            //^ This block to check whether user send the real site
            if (!publicUrl.includes("https://www.cloudskillsboost.google/public_profiles/")) {
                return data;
            }


            //^ ----------------------CODE to extract the DOM, if unable return error----------------------
            try {
                console.log("Extracting the DOM...");
                var response = await axios.get(publicUrl);
                console.log("DOM extracted successfully!");
            } catch (error) {
                return data;
            }
            //^ -----------------------------------------------------------------------------------------------


            // extract the sub part of the main DOM
            const $ = cheerio.load(response.data);
            const badgesArea = $('main').first().html();
            const soup2 = cheerio.load(badgesArea); // create soup2 for sub DOM (poor code logic)    

            //^ ---------------------------------Checking for the skillBadges file if not extract it...-------------
            let skillBadges;
            // skillBadges = fs.readFileSync(this.skillBadgesFile, 'utf-8').split("\n").map(badge => badge.trim());
            // skillBadges = 

            let temp = []
            Object.keys(skillBadgesFromDatabase).forEach((badge) => {
                temp.push(badge.trim())
            })
            skillBadges = temp;

            console.log(skillBadges);

            //^ --------------------------------------------------------------------------------------------------------


            //^ -----------------------Running a loop for all the `profile-badge`-----------------------
            soup2('.profile-badge').each((i, badge) => {
                const badgesDict = {};
                const soup3 = cheerio.load(badge);

                // badge Name extracted...
                let badgeName = soup3('img').first().attr('alt').trim();
                badgeName = badgeName.split(" ").slice(2).join(" ");


                //^ ----------------------------- LOGIC FOR COUNTING THE POINTS -----------------------------------

                // ! Skill Badge
                // console.log(badgeName);

                if (skillBadges && skillBadges.includes(badgeName)) {
                    let targetValue = badgeName;
                    var newArray = skillBadges.filter(item => item !== targetValue);

                    skillBadges = newArray

                    delete skillBadges[badgeName];
                }

                // // ADDING ALL DATA
                // badgesDict["Badge Name"] = badgeName;
                // badgesDict["Badge link"] = badgeLink;
                // badgesDict["Earned On"] = `${date} ${month} ${year}`;
                // badgesList.push(badgesDict);

            });

            for (let index = 0; index < skillBadges.length; index++) {
                data[skillBadges[index]] = skillBadgesFromDatabase[skillBadges[index]]
            }

            return data; // return data

        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = IncompleteSkillBadges;
