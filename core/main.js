const cheerio = require('cheerio');


// ~ --------------------------------------- HELPER FILES HERE ---------------------------------------
// fetch badges from database
const getArcadeBadges = require("../DataBase/Badges/GameBadges").fetchBadges;
const getSkillBadges = require("../DataBase/Badges/SkillBadges").fetchSkillBadges;
const getIgnoreBadges = require("../DataBase/Badges/IgnoreBadges").fetchBadges;

// convert monthStr to monthInt
const monthInt = require("./arcade/monthStrToInt");

// add unknown badges in the database!
const addUnknownBadges = require("../DataBase/Badges/UnknownBadges").addOrUpdateUnknownBadge;

// scrap the page
const scrapPage = require('./arcade/scrapPage') // giving out scrapped page + userDetails

// gather user data
const storeUserData = require('./arcade/storeUserData');



// ~ --------------------------------------- MAIN CODE HERE ---------------------------------------

class Arcade {
    // Main function
    async analyzeProfile(publicUrl) {

        // !-------------------------CONSTANTS HERE --------------------------------


        let badgesCount = {
            skillBadges: 0,
            gameBadges: 0,
            triviaBadges: 0,
            certificationBadges: 0,
            specialBadges: 0,
            baseCampBadges: 0,
            unknownBadges: 0,
        }

        let pointsCount = {
            skillBadges: 0,
            gameBadges: 0,
            triviaBadges: 0,
            certificationBadges: 0,
            specialBadges: 0,
            baseCampBadges: 0,
            unknownBadges: "NaN",
        }

        let totalPoints = 0;



        // * additional data to handle the request status.
        const additionalData = {
            success: false,
            statusCode: 500,
            message: "Internal Server Error"
        }

        // output that gonna hold all the data.
        const output = {
            additionalData, badgesCount, pointsCount, totalPoints
        }

        // !-------------------------CONSTANTS ENDS --------------------------------


        // ! Analysis the validity of url--------------------------------
        if (!publicUrl.includes("https://www.cloudskillsboost.google/public_profiles/")) {
            return { output };
        }


        try {


            // ~------------------ SCRAPING THE PAGE ------------------ 
            const resultScrapPage = await scrapPage(publicUrl)


            if (resultScrapPage['success'] == false) {
                output.additionalData.message = "Failed to scrap page."
                output['scrapped'] = resultScrapPage;
                return { output };
            }

            // * PREPARING MORE DATA --------------------------------
            const userDetails = resultScrapPage['userDetails'];
            const subSoup = cheerio.load(resultScrapPage['subSoup']);


            // ~----------- SAVING SKILL AND GAME BADGES FROM THE DATABASE --------------------------------
            // Skill Badge
            const fetchedSkillBadges = await getSkillBadges();
            if (fetchedSkillBadges['success'] === false) {
                output.additionalData.success = false;
                output.additionalData.message = fetchedSkillBadges['message'];
                return { output };
            }

            const skillBadgesData = fetchedSkillBadges['data'];

            // Game Badges
            const fetchedArcadeBadges = await getArcadeBadges();
            if (fetchedArcadeBadges['success'] === false) {
                output.additionalData.success = false;
                output.additionalData.message = fetchedArcadeBadges['message'];
                return { output };
            }
            const arcadeBadgesData = fetchedArcadeBadges['data'];

            // Ignore Badges
            const fetchedIgnoreBadges = await getIgnoreBadges();
            if (fetchedIgnoreBadges['success'] === false) {
                output.additionalData.success = false;
                output.additionalData.message = fetchedIgnoreBadges['message'];
                return { output };
            }

            const ignoreBadgesData = fetchedIgnoreBadges['data'];


            // ~------------------ CALCULATE THE POINTS ------------------ 
            //^ -----------------------Running a loop for all the `profile-badge`-----------------------

            subSoup('.profile-badge').each((i, badge) => {

                // ------------ START Basic Badge Details --------------------------------
                const $ = cheerio.load(badge);
                // parsing Badge url (just in case, it is not present in the database) 
                let badgeLink = $('a').first().attr('href');
                let badgeImg = $('img').first().attr('src');
                //  parsing badge details -> Name, Claimed On
                let badgeName = $('img').first().attr('alt').trim();
                badgeName = badgeName.split(" ").slice(2).join(" ");
                let badgeEarnedOn = $('span').last().text().trim().split(" ");
                const month = badgeEarnedOn[1];
                const monthInInteger = monthInt(month);
                let date, year;

                // parsing date and year
                if (badgeEarnedOn[2] === "") {
                    date = parseInt(badgeEarnedOn[3].split(",")[0]);
                    year = parseInt(badgeEarnedOn[4]);
                } else {
                    date = parseInt(badgeEarnedOn[2].split(",")[0]);
                    year = parseInt(badgeEarnedOn[3]);
                }
                // ------------ END Basic Badge Details --------------------------------


                // &----------------------------- LOGIC FOR COUNTING THE POINTS -----------------------------------

                // ~ Skill Badge
                if (skillBadgesData && (skillBadgesData.findIndex(badge => badge.badgeName === badgeName) !== -1)) {
                    // Remove the badge that has been found already!
                    const index = skillBadgesData.findIndex(badge => badge.badgeName === badgeName);
                    if (index !== -1) {
                        skillBadgesData.splice(index, 1);
                    }


                    // ~ Check for 2025 and specific date range
                    if (
                        year === 2025 &&
                        monthInInteger >= 1 &&
                        monthInInteger <= 6 &&
                        (monthInInteger !== 1 || date >= 9)
                    ) {
                        // Increase count and points
                        badgesCount['skillBadges'] += 1;
                        pointsCount['skillBadges'] += 0.5;
                        totalPoints += 0.5;
                    }
                    else {
                        // Increase count only
                        badgesCount['skillBadges'] += 1;
                    }

                    // ~ For experiment and specific date range
                    // console.log(year)
                    // if (
                    //     year === 2024
                    // ) {
                    //     // Increase count and points
                    //     badgesCount['skillBadges'] += 1;
                    //     pointsCount['skillBadges'] += 0.5;
                    //     totalPoints += 0.5;
                    // }
                    // else {
                    //     // Increase count only
                    //     badgesCount['skillBadges'] += 1;
                    // }
                }


                // ~ Other game badges...
                else if (arcadeBadgesData && (arcadeBadgesData.findIndex(badge => badge.badgeName === badgeName) !== -1)) {

                    let badgeIndex = arcadeBadgesData.findIndex(badge => badge.badgeName === badgeName);
                    let badgeType = arcadeBadgesData[badgeIndex]['badgeType'] // ['Game', 'Trivia', 'Certification', 'Special', 'BaseCamp']
                    const point = arcadeBadgesData[badgeIndex]['points'] // points for the badge.
                    console.log(point)

                    if (
                        year === 2025 &&
                        monthInInteger >= 1 &&
                        monthInInteger <= 6 &&
                        (monthInInteger !== 1 || date >= 9)
                    ) {
                        // increase count and points
                        badgesCount[badgeType] += 1;
                        pointsCount[badgeType] += point;
                        totalPoints += point;

                    }
                    else {
                        // increase count only
                        badgesCount[badgeType] += 1;
                    }
                }


                else if (ignoreBadgesData && (ignoreBadgesData.findIndex(badge => badge.badgeName === badgeName) !== -1)) {
                    // no need to do anything its gonna be ignored.
                }

                // ~ Unknown badges...
                else {
                    badgesCount['unknownBadges'] += 1;

                    // ~ add unknown badges in the database
                    try {
                        console.log(`Image url -> ${badgeImg}`)
                        addUnknownBadges({ badgeName, badgeLink, badgeImg })
                    } catch (error) {
                        console.log('Error while saving data in database' + error);
                    }
                }

                // &----------------------------- END COUNTING THE POINTS -----------------------------------




            })

            // ~------------------ DONE WITH CALCULATION, TIME TO STEAL SOME DATA ------------------ 
            let splitPublicUrl = publicUrl.split('https://www.cloudskillsboost.google/public_profiles/')[1]
            let dataForDataBase = {
                "id": splitPublicUrl,
                "name": userDetails.name,
                "publicUrl": publicUrl,
                "points": totalPoints,
                "swagsEligibility": "None",
                "facilitatorPoints": 0,
                "swagsEligibilityFacilitator": "NaN",
                "profileImage": userDetails.profileImage
            }
            if (dataForDataBase.name != "") {
                storeUserData(dataForDataBase);
            }


            // return data 
            output.userDetails = userDetails;
            output.badgesCount = badgesCount;
            output.pointsCount = pointsCount;
            output.totalPoints = totalPoints;

            // Taking the incomplete skill badges in more detailed and simple format.
            let incompleteSkillBadges = {};
            skillBadgesData.forEach(badge => {
                const { badgeName, ...otherKeys } = badge.toObject ? badge.toObject() : badge; // Use toObject() if it exists
                incompleteSkillBadges[badgeName] = otherKeys;
            });

            output.skillBadges = incompleteSkillBadges;

            // Additional data
            output.additionalData.success = true;
            output.additionalData.statusCode = 200;
            output.additionalData.message = "Profile analyzed successfully!";

            return output;

        } catch (error) {
            output['ErrorMessage'] = error.message;
            return output;
        }



    }
}


module.exports = Arcade;
