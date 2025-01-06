
// Code by -> Deepanshu Prajapati
// Github : @deepanshu-prajapati01
// Instagram: @deepanshu_prajapati01
// LinkedIn : @deepanshu-prajapati01

const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');


// fetch badges from database
const { getArcadeBadges } = require("../DataBase/Badges/GameBadges").fetchBadges;
const { getSkillBadges } = require("../DataBase/Badges/SkillBadges").fetchSkillBadges;


// working files
const { monthInt } = require("./arcade/monthStrToInt");

// const { getSkillBadges, getSpecialBadges } = require('../routes/BasicEndPoints/Functions/Badges/extractBadgesFromServer')

// add unknown badges in the database!
const addUnknownBadges = require('../routes/BasicEndPoints/Functions/Badges/addUnknownBadgesToServer')



class Arcade {

    // Arcade july-december swags links
    // https://i.ibb.co/N2Pwyjg/Untitled-4-7.png


    //^------------------------------------------- CODE TO SCRAP THE PAGE
    async scrapPage(publicUrl) {

        // & -------------------------------- defining all the subDicts to be used in the data field. --------------------------------

        // NEW CODE
        let amountOfBadges = {
            "skillBadges": 0,
            "gameBadges": 0,
            "baseCampBadges": 0,
            "specialBadges": 0,
            "certificationZoneBadges": 0,
        }



        // this will contain all the data related to the points - facilitator, nonFacilitator, milestoneBonusPoints, milestoneEarned
        let pointsData = {

            // facilitator: 0,
            // nonFacilitator: 0,
            // milestoneBonusPoints: 0,
            // milestoneEarned: "",
        };

        // data related to things if something went wrong! - WILL HAVE DEFAULT VALUES 
        let additionalData = {
            "error": "No Error",
            "message": "No Error",
            "success": "False",
            "statusCode": 200,
        }


        // ~ THE MAIN PART WHERE ALL DATA IS GOING TO BE STORED.
        const data = {
            userDetails, amountOfBadges, pointsData, additionalData
        };




        // & fields that can be the part of the main data but are removed idk why! 
        let badgesDict = {
            // badgeName: { earnedOn: data, badgeType: typeOfTheBadge }
        };
        // this will contain all the badges in this format. -> {badgeName:{earnedOn:data, badgeType: typeOfTheBadge}} 
        // ~ type of the badge can be 'Arcade', 'Trivia', 'Skill', 'Other'.


        // & ----------------------------------------------------   END OF LINE ----------------------------------------------------


        try {

            //^ This block to check whether user send the real site
            if (!publicUrl.includes("https://www.cloudskillsboost.google/public_profiles/")) {
                additionalData['message'] = 'Failed to scrap the page as user have provided incorrect url.'
                additionalData['error'] = 'Invalid URL'
                additionalData['statusCode'] = 400
                return { data };
            }


            // //^ ----------------------CODE to extract the DOM, if unable return error----------------------
            // try {
            //     var response = await axios.get(publicUrl);
            // } catch (error) {
            //     additionalData['message'] = 'No user found with the requested url.'
            //     additionalData['error'] = 'Invalid URL'
            //     additionalData['statusCode'] = 400;
            //     return { data };
            // }
            // //^ -----------------------------------------------------------------------------------------------


            // // & extracting th main DOM
            // const $ = cheerio.load(response.data);


            // // ~ Feeds all the details of the user to this main object
            // // ~ Part for userDetails has been finished here!
            // userDetails = this.scrapUserDetails($, userDetails)


            // // & create subSoup for sub DOM (poor code logic)    
            // const badgesArea = $('main').first().html();
            // const subSoup = cheerio.load(badgesArea);


            // ~ NEW CODE WILL UPDATE STUFF 
            const { scrapPage } = require('./arcade/scrapPage')
            const resultScrapPage = scrapPage(publicUrl)

            if (scrapPage(publicUrl)['success'] == false) {
                // return error
                // error return karna yaha par
            }

            // now making everything back to normal
            const userDetails = resultScrapPage['userDetails'];
            const subSoup = resultScrapPage['subSoup'];




            // //^ ---------------------------------This part is saving the skillBadges as well as special badges in the run time-------------

            // // * SKILL BADGES FROM THE SERVER
            // let skillBadges = [];
            // try {

            //     // ` This will fetch all the skillBadges from our Mongos Database!    
            //     var badges = await getSkillBadges()

            //     if (badges['success'] === false) {
            //         throw new Error("Failed to contact to the Database, please try later!")
            //     }

            //     // All the names of the skillBadges are now stored in this list. `skillBadges`.
            //     skillBadges = Object.keys(badges['data']).map(badge => badge.trim());

            // } catch (error) {
            //     additionalData['message'] = 'Failed to fetch details, please reach out for support!';
            //     additionalData['error'] = error;
            //     additionalData['success'] = false;
            //     return { data };
            //     // Don't want to go further due to extracting issues.
            // }


            // // * SPECIAL BADGES FROM THE SERVER
            // let specialBadges = {};
            // try {
            //     var badges = await getArcadeBadges();
            //     if (badges['success'] === false) {
            //         throw new Error("Failed to contact to the Database, please try later!")
            //     }
            //     specialBadges = badges['data']
            // } catch (error) {
            //     additionalData['message'] = 'Failed to fetch details, please reach out for support!';
            //     additionalData['error'] = error;
            //     additionalData['success'] = false;
            //     additionalData['statusCode'] = 500;
            //     return { data };
            //     // Don't want to go further due to extracting issues.
            // }


            // //^ --------------------------------------------------------------------------------------------------------


            // ~ NEW PART -------- NOW SAVING THE SKILL BADGES AND THE GAME BADGES FROM THE DATABASE --------------------------------
            const skillBadges = await getSkillBadges();
            const arcadeBadges = await getArcadeBadges();

            // ~ done!





            //^ -----------------------Running a loop for all the `profile-badge`-----------------------
            subSoup('.profile-badge').each((i, badge) => {


                const $ = cheerio.load(badge);

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

                //^ ----------------------------- LOGIC FOR COUNTING THE POINTS -----------------------------------




                // ~ Skill Badge
                if (skillBadges && skillBadges.includes(badgeName)) {

                    // ~ NEW
                    if (
                        year === 2025 &&
                        monthInInteger >= 1 &&
                        monthInInteger <= 6 &&
                        (monthInInteger !== 1 || date > 15)
                    ) {
                        // increase count here
                        // increase point here
                    }
                    else {
                        // increase count here
                        // don't increase point
                    }



                    // // ^ Classroom event - during this period, no points will be granted!
                    // if (year === 2024 && (((monthInInteger == 11) && (date >= 19)) || ((monthInInteger == 12) && (date <= 3)))) {
                    //     badgesThroughoutTheArcade['skillBadges'] += 1;
                    //     // ^ not adding the points here because no points will be given during this period. 
                    // }


                    // // ^ Monsoon Event 
                    // else if (year === 2024 && monthInInteger === 7 && (date >= 22 && date <= 31)) {
                    //     // monsoon event have 1 skill badge = 1 arcade point
                    //     pointsData['nonFacilitator'] += 1

                    //     // * Increment the count of skillBadges for both applicants.
                    //     badgesDuringFacilitatorEvent['skillBadges'] += 1;
                    //     badgesThroughoutTheArcade['skillBadges'] += 1;

                    // }

                    // // ^ Normal Event Throughout the Arcade.
                    // else if (year === 2024 && monthInInteger > 7 && (monthInInteger !== 12 || (monthInInteger === 12 && date <= 25))) {
                    //     // normally 1 skill badge = 0.5 arcade point
                    //     pointsData['nonFacilitator'] += 0.5

                    //     // * Increment the count of skillBadges for both applicants. 
                    //     if (monthInInteger < 9 || (date <= 27 && monthInInteger === 9)) {
                    //         badgesDuringFacilitatorEvent['skillBadges'] += 1;
                    //         badgesThroughoutTheArcade['skillBadges'] += 1;
                    //     }

                    //     // * This will only count for normal event because facilitator program has been ended.
                    //     else if (monthInInteger >= 9 && monthInInteger <= 12) {
                    //         badgesThroughoutTheArcade['skillBadges'] += 1;
                    //     }
                    // }
                }


                // ~ Special Badges - (Trivia games and Arcade Badges)
                else if (arcadeBadges && arcadeBadges.includes(badgeName)) {
                    let badgeType = arcadeBadges['badgeType'] // ['Game', 'Trivia', 'Certification', 'Special', 'BaseCamp']
                    let point = arcadeBadges['points'] // points for the badge.

                    if (
                        year === 2025 &&
                        monthInInteger >= 1 &&
                        monthInInteger <= 6 &&
                        (monthInInteger !== 1 || date > 15)
                    ) {
                        // increase count here
                        // increase point here
                    }
                    else {
                        // increase count here
                        // don't increase point
                    }







                    // else {
                    //     if (specialBadges && Object.keys(specialBadges).includes(badgeName)) {
                    //         let badgeType = specialBadges[badgeName]['badgeType'] // Badge Type -- `Arcade Badge` or `Trivia Badge`

                    //         let point = specialBadges[badgeName]['badgePoints'] // point from the mongoDatabase.
                    //         pointsData['nonFacilitator'] += point;


                    //         // & CODE BELOW IS ONLY RESPONSIBLE TO UPDATE THE COUNT...
                    //         // * Arcade/Game Badges
                    //         if (badgeType === "Arcade Badge") {

                    //             // if (monthInInteger <= 9 && (date <= 27)) {
                    //             if (monthInInteger < 9 || (date <= 27 && monthInInteger === 9)) {
                    //                 // updated count in facilitator 
                    //                 badgesDuringFacilitatorEvent['gameBadges'] += 1;
                    //             }

                    //             if (monthInInteger < 12 || (monthInInteger === 12 && date <= 25)) {
                    //                 // updated count in main base arcade.
                    //                 badgesThroughoutTheArcade['gameBadges'] += 1;
                    //             }

                    //         }
                    //         // * Trivia Badges
                    //         else if (badgeType === "Trivia Badge") {
                    //             if (monthInInteger < 9 || (date <= 27 && monthInInteger === 9)) {
                    //                 // updated count in facilitator 
                    //                 badgesDuringFacilitatorEvent['triviaBadges'] += 1;
                    //             }
                    //             if (monthInInteger < 12 || (monthInInteger === 12 && date <= 25)) {
                    //                 // updated count in main base arcade.
                    //                 badgesThroughoutTheArcade['triviaBadges'] += 1;
                    //             }
                    //         }

                    //         // * Other Badges
                    //         else if (badgeType === "Other Badge") {
                    //             // no conditions required
                    //             badgesThroughoutTheArcade['otherBadges'] += 1;
                    //         }
                    //     }

                    //     else {
                    //         // console.log(`NOT FOUND: '${badgeName}'`);
                    //         this.UnknownBadges.push(badgeName);
                    //     }
                    // }

                    // ADDING ALL DATA
                    // Adding the badgeName to the badgesDict
                    badgesDict[badgeName] = {
                        "earnedOn": `${date} ${month} ${year}`
                    }
                };


                // ^ incrementing points for the arcade classroom 
                let points = parseInt(this.classRoomCompletedCount / 2);
                pointsData['nonFacilitator'] += points;


                // ~------------------------------------PART TO SCRAP THE PAGE IS COMPLETED--------------------------------------------- 






                // ~ Collecting user data in my database!
                var splitPublicUrl = publicUrl.split('https://www.cloudskillsboost.google/public_profiles/')[1]
                var dataForDataBase = {
                    "id": splitPublicUrl,
                    "name": userDetails.name,
                    "publicUrl": publicUrl,
                    "normalPoints": pointsData['nonFacilitator'],
                    "swagsWithoutFacilitator": swags['withoutFacilitatorApplicant'],
                    "facilitatorPoints": pointsData['facilitator'],
                    "swagsWithFacilitator": swags['facilitatorApplicant']
                }


                // CODE TO ADD DATA IN MY DATABASE WILL COME HERE


                // * Adding the badges to database which haven't been found!
                try {
                    addUnknownBadges(this.UnknownBadges)
                } catch (err) {
                    console.error(err);
                }


                // additionalData['message'] = 'Data has been successfully fetched!';
                // additionalData['success'] = true;
                // additionalData['statusCode'] = 200;
                return { data }; // returns data

            }}
        catch (err) {
            console.error(`Unknown error occurred: ${err}`);
            additionalData['error'] = err
            additionalData['message'] = 'Unknown error occurred please reach out the administrator';
            additionalData['success'] = false;
            additionalData['statusCode'] = 500;
            return { data }; // returns data
        }
    }
}












module.exports = Arcade;