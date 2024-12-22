
// Code by -> Deepanshu Prajapati
// Github : @deepanshu-prajapati01
// Instagram: @deepanshu_prajapati01
// LinkedIn : @deepanshu-prajapati01

const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');


// fetch badges from database
const { getSkillBadges, getSpecialBadges } = require('../BasicEndPoints/Functions/Badges/extractBadgesFromServer')

// add unknown badges in the database!
const addUnknownBadges = require('../BasicEndPoints/Functions/Badges/addUnknownBadgesToServer')
const calculateFacilitatorMilestone = require('../BasicEndPoints/Functions/calculateFacilitatorMilestone')

// MongoDB: Database Models.
const User = require('../../models/Users')


class Arcade {

    constructor() {
        this.UnknownBadges = []
        this.badgeType = 'Unknown';

        //^ The course which gives 5 points.
        this.courseBadge = [
            "Digital Transformation with Google Cloud",
            "Exploring Data Transformation with Google Cloud",
            "Innovating with Google Cloud Artificial Intelligence",
            "Modernize Infrastructure and Applications with Google Cloud",
            "Trust and Security with Google Cloud",
            "Scaling with Google Cloud Operations"
        ];
        this.isCoursePointsAdded = false;

        this.classRoomCompletedCount = 0;
        this.classRoomBadges = [
            "Webhook fundamentals",
            "Advanced Webhook Concepts",
            "Basic Performance Measurement",
            "Advanced Performance Measurement",
            "Advanced Conversation Design",
            "Conversation Design Fundamentals",
            "CCAI Architecture",
            "CCAI Frontend Integrations"
        ]
    }



    //^ ------------------------------------------- CODE TO CONVERT MONTH STRING TO MONTH INTEGER
    monthInt(monthStr) {
        const months = {
            "Jan": 1,
            "Feb": 2,
            "Mar": 3,
            "Apr": 4,
            "May": 5,
            "Jun": 6,
            "Jul": 7,
            "Aug": 8,
            "Sep": 9,
            "Oct": 10,
            "Nov": 11,
            "Dec": 12
        };
        return months[monthStr] || null; // Handle invalid month strings
    }


    // ^--------------------------------  -------------------------------------------




    // ^-------------------------------- CODE TO SCRAP USER DETAILS IF IT GOT THE WEBPAGE DATA
    scrapUserDetails = ($, userDetails) => {
        // ^ for fetching name
        let name = $('.ql-display-small');
        name = name.text().replaceAll('\n', '').trim()
        userDetails["name"] = name

        // ^ for fetching the user img
        let userImg = $('#jump-content >div:first-child .profile-avatar');
        userImg = userImg.attr('src');
        userDetails["profileImage"] = userImg

        // ^ for fetching the user's points
        let memberSince = $('#jump-content >div:first-child .ql-body-large')
        memberSince = memberSince.text().replaceAll('\n', '').trim()
        userDetails["memberSince"] = memberSince

        // ^ for fetching the user's points
        let userPoints = $('#jump-content >div:first-child .profile-league >strong')
        userPoints = userPoints.text().replaceAll('\n', '').trim().split(' ')[0]
        userDetails["leaderboardPoints"] = userPoints

        // ^ for fetching the user's league url
        let leagueImg = $('#jump-content >div:first-child .profile-league >img')
        leagueImg = leagueImg.attr('src')
        userDetails["leagueImg"] = leagueImg;

        // ^ for fetching the user's league name
        let leagueName = $('#jump-content >div:first-child .profile-league >h2')
        leagueName = leagueName.text().replaceAll('\n', '').trim().split(' ')[0]
        userDetails["leagueName"] = leagueName;

        // it returns the userDetails object after modifying in every aspect, putting all the data.
        return userDetails;
    }




    //^------------------------------------------- CODE TO SCRAP THE PAGE
    async scrapPage(publicUrl) {

        // & -------------------------------- defining all the subDicts to be used in the data field. --------------------------------

        // will store details about the user such as name, leaderboardData, etc.
        let userDetails = {
            "name": "",
            "profileImage": "",
            "memberSince": "",
            "leaderboardPoints": "",
            "leagueImg": "",
            "leagueName": "",
        };


        // this will contain all the badges completed during the facilitator event and will have the bonus points inside of it.
        let badgesDuringFacilitatorEvent = {
            "triviaBadges": 0,
            "gameBadges": 0,
            "skillBadges": 0,
        };

        // this will contain all the badges completed during the arcade.
        let badgesThroughoutTheArcade = {
            "triviaBadges": 0,
            "gameBadges": 0,
            "skillBadges": 0,
            "otherBadges": 0,
        };

        // this will contain all the information related to the swags. - swagsList, swagsForFacilitator, swagsForNonFacilitator.
        let swags = {
            swagsInfo: {
                "Standard": {},
                "Advanced": {},
                "Premium": {},
                "PremiumPlus": {}
            },

            "facilitatorApplicant": "",
            "withoutFacilitatorApplicant": "",
        };

        // this will contain all the data related to the points - facilitator, nonFacilitator, milestoneBonusPoints, milestoneEarned
        let pointsData = {
            facilitator: 0,
            nonFacilitator: 0,
            milestoneBonusPoints: 0,
            milestoneEarned: "",
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
            userDetails, badgesDuringFacilitatorEvent, badgesThroughoutTheArcade, swags, pointsData, additionalData
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


            //^ ----------------------CODE to extract the DOM, if unable return error----------------------
            try {
                var response = await axios.get(publicUrl);
            } catch (error) {
                additionalData['message'] = 'No user found with the requested url.'
                additionalData['error'] = 'Invalid URL'
                additionalData['statusCode'] = 400;
                return { data };
            }
            //^ -----------------------------------------------------------------------------------------------


            // & extracting th main DOM
            const $ = cheerio.load(response.data);


            // ~ Feeds all the details of the user to this main object
            // ~ Part for userDetails has been finished here!
            userDetails = this.scrapUserDetails($, userDetails)


            // & create subSoup for sub DOM (poor code logic)    
            const badgesArea = $('main').first().html();
            const subSoup = cheerio.load(badgesArea);


            //^ ---------------------------------This part is saving the skillBadges as well as special badges in the run time-------------

            // * SKILL BADGES FROM THE SERVER
            let skillBadges = [];
            try {

                // ` This will fetch all the skillBadges from our Mongos Database!    
                var badges = await getSkillBadges()

                if (badges['success'] === false) {
                    throw new Error("Failed to contact to the Database, please try later!")
                }

                // All the names of the skillBadges are now stored in this list. `skillBadges`.
                skillBadges = Object.keys(badges['data']).map(badge => badge.trim());

            } catch (error) {
                additionalData['message'] = 'Failed to fetch details, please reach out for support!';
                additionalData['error'] = error;
                additionalData['success'] = false;
                return { data };
                // Don't want to go further due to extracting issues.
            }


            // * SPECIAL BADGES FROM THE SERVER
            let specialBadges = {};
            try {
                var badges = await getSpecialBadges();
                if (badges['success'] === false) {
                    throw new Error("Failed to contact to the Database, please try later!")
                }
                specialBadges = badges['data']
            } catch (error) {
                additionalData['message'] = 'Failed to fetch details, please reach out for support!';
                additionalData['error'] = error;
                additionalData['success'] = false;
                additionalData['statusCode'] = 500;
                return { data };
                // Don't want to go further due to extracting issues.
            }


            //^ --------------------------------------------------------------------------------------------------------






            //^ -----------------------Running a loop for all the `profile-badge`-----------------------
            subSoup('.profile-badge').each((i, badge) => {


                const $ = cheerio.load(badge);

                //  parsing badge details -> Name, Claimed On
                let badgeName = $('img').first().attr('alt').trim();
                badgeName = badgeName.split(" ").slice(2).join(" ");
                let badgeEarnedOn = $('span').last().text().trim().split(" ");
                const month = badgeEarnedOn[1];
                const monthInInteger = this.monthInt(month);
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


                // ~ Classroom Badges
                if (this.classRoomBadges.includes(badgeName)) {
                    if (year === 2024 && (((monthInInteger == 11) && (date >= 19)) || ((monthInInteger == 12) && (date <= 3)))) {
                        badgesThroughoutTheArcade['otherBadges'] += 1;
                        this.classRoomCompletedCount += 1;
                        // pointsData['nonFacilitator'] += 0.5;
                        // INSTEAD OF UPDATING POINTS HERE, COUNT THE BADGES AND THEN IN THE END, DIVIDE THEM BY 2 SO THESE 0.5 POINTS DON'T MIX UP WITH 0.5 POINTS FROM SKILL BADGES.
                    }
                }

                // ~ Skill Badge
                else if (skillBadges && skillBadges.includes(badgeName)) {

                    // ^ Classroom event - during this period, no points will be granted!
                    if (year === 2024 && (((monthInInteger == 11) && (date >= 19)) || ((monthInInteger == 12) && (date <= 3)))) {
                        badgesThroughoutTheArcade['skillBadges'] += 1;
                        // ^ not adding the points here because no points will be given during this period. 
                    }


                    // ^ Monsoon Event 
                    else if (year === 2024 && monthInInteger === 7 && (date >= 22 && date <= 31)) {
                        // monsoon event have 1 skill badge = 1 arcade point
                        pointsData['nonFacilitator'] += 1

                        // * Increment the count of skillBadges for both applicants.
                        badgesDuringFacilitatorEvent['skillBadges'] += 1;
                        badgesThroughoutTheArcade['skillBadges'] += 1;

                    }

                    // ^ Normal Event Throughout the Arcade.
                    else if (year === 2024 && monthInInteger > 7 && (monthInInteger !== 12 || (monthInInteger === 12 && date <= 25))) {
                        // normally 1 skill badge = 0.5 arcade point
                        pointsData['nonFacilitator'] += 0.5

                        // * Increment the count of skillBadges for both applicants. 
                        if (monthInInteger < 9 || (date <= 27 && monthInInteger === 9)) {
                            badgesDuringFacilitatorEvent['skillBadges'] += 1;
                            badgesThroughoutTheArcade['skillBadges'] += 1;
                        }

                        // * This will only count for normal event because facilitator program has been ended.
                        else if (monthInInteger >= 9 && monthInInteger <= 12) {
                            badgesThroughoutTheArcade['skillBadges'] += 1;
                        }
                    }
                }

                // ~ Arcade Cloud Digital Leader Challenge or CDL Challenge
                else if (this.courseBadge.includes(badgeName)) {
                    if (year === 2024 && monthInInteger === 8 && (date >= 1 && date <= 5)) {
                        if (!this.isCoursePointsAdded) {
                            this.isCoursePointsAdded = true;
                            // * As user has completed this course during this specific time period, he will be awarded for 5 BONUS POINTS.
                            pointsData['nonFacilitator'] += 5;
                        }
                    }
                }

                // ~ Special Badges - (Trivia games and Arcade Badges)
                else {
                    if (specialBadges && Object.keys(specialBadges).includes(badgeName)) {
                        let badgeType = specialBadges[badgeName]['badgeType'] // Badge Type -- `Arcade Badge` or `Trivia Badge`

                        let point = specialBadges[badgeName]['badgePoints'] // point from the mongoDatabase.
                        pointsData['nonFacilitator'] += point;


                        // & CODE BELOW IS ONLY RESPONSIBLE TO UPDATE THE COUNT...
                        // * Arcade/Game Badges
                        if (badgeType === "Arcade Badge") {

                            // if (monthInInteger <= 9 && (date <= 27)) {
                            if (monthInInteger < 9 || (date <= 27 && monthInInteger === 9)) {
                                // updated count in facilitator 
                                badgesDuringFacilitatorEvent['gameBadges'] += 1;
                            }

                            if (monthInInteger < 12 || (monthInInteger === 12 && date <= 25)) {
                                // updated count in main base arcade.
                                badgesThroughoutTheArcade['gameBadges'] += 1;
                            }

                        }
                        // * Trivia Badges
                        else if (badgeType === "Trivia Badge") {
                            if (monthInInteger < 9 || (date <= 27 && monthInInteger === 9)) {
                                // updated count in facilitator 
                                badgesDuringFacilitatorEvent['triviaBadges'] += 1;
                            }
                            if (monthInInteger < 12 || (monthInInteger === 12 && date <= 25)) {
                                // updated count in main base arcade.
                                badgesThroughoutTheArcade['triviaBadges'] += 1;
                            }
                        }

                        // * Other Badges
                        else if (badgeType === "Other Badge") {
                            // no conditions required
                            badgesThroughoutTheArcade['otherBadges'] += 1;
                        }
                    }

                    else {
                        // console.log(`NOT FOUND: '${badgeName}'`);
                        this.UnknownBadges.push(badgeName);
                    }
                }

                // ADDING ALL DATA
                // Adding the badgeName to the badgesDict
                badgesDict[badgeName] = {
                    "earnedOn": `${date} ${month} ${year}`
                }
            });


            // ^ incrementing points for the arcade classroom 
            let points = parseInt(this.classRoomCompletedCount / 2);
            pointsData['nonFacilitator'] += points;


            // ~------------------------------------PART TO SCRAP THE PAGE IS COMPLETED--------------------------------------------- 



            // ~--------------------------THIS PART DOING CALCULATIONS FOR FACILITATOR------------------------------------ 

            // ! CODE TO MAKE POINT SYSTEM FOR ARCADE FACILITATOR
            // ! Updated Code here

            // & here using another file to update bonus points and facilitator applicants points.
            try {
                let tempPointsUpdate = await calculateFacilitatorMilestone(badgesDuringFacilitatorEvent)
                pointsData['milestoneBonusPoints'] = tempPointsUpdate['milestoneBonusPoints'];
                pointsData['milestoneEarned'] = tempPointsUpdate['milestoneEarned'];
                pointsData['facilitator'] = pointsData['nonFacilitator'] + pointsData['milestoneBonusPoints']

            } catch (error) {
                additionalData['error'] = error;
                additionalData['message'] = 'Failed to calculate points, please try again!'
                additionalData['statusCode'] = 500;
                additionalData['success'] = false;

                return { data }
            }


            // ~ Code to put swags details according to the points.
            // & Non-Facilitator Applicants.

            if (pointsData['nonFacilitator'] >= 75) {
                swags['withoutFacilitatorApplicant'] = 'Champion'
            }
            else if (pointsData['nonFacilitator'] >= 65 && pointsData['nonFacilitator'] < 75) {
                swags['withoutFacilitatorApplicant'] = 'PremiumPlus'
            }
            else if (pointsData['nonFacilitator'] >= 45 && pointsData['nonFacilitator'] < 65) {
                swags['withoutFacilitatorApplicant'] = 'Premium'
            }
            else if (pointsData['nonFacilitator'] >= 30 && pointsData['nonFacilitator'] < 45) {
                swags['withoutFacilitatorApplicant'] = 'Advanced'
            }
            else if (pointsData['nonFacilitator'] >= 15 && pointsData['nonFacilitator'] < 30) {
                swags['withoutFacilitatorApplicant'] = 'Standard'
            }
            else {
                swags['withoutFacilitatorApplicant'] = 'None'
            }


            // & Facilitator Applicants.


            if (pointsData['facilitator'] >= 75) {
                swags['facilitatorApplicant'] = 'Champion'
            }
            else if (pointsData['facilitator'] >= 65 && pointsData['facilitator'] < 75) {
                swags['facilitatorApplicant'] = 'PremiumPlus'
            }
            else if (pointsData['facilitator'] >= 45 && pointsData['facilitator'] < 65) {
                swags['facilitatorApplicant'] = 'Premium'
            }
            else if (pointsData['facilitator'] >= 30 && pointsData['facilitator'] < 45) {
                swags['facilitatorApplicant'] = 'Advanced'
            }
            else if (pointsData['facilitator'] >= 15 && pointsData['facilitator'] < 30) {
                swags['facilitatorApplicant'] = 'Standard'
            }
            else {
                swags['facilitatorApplicant'] = 'None'
            }



            // & Adding Swags Images and required points.
            // Standard Milestone 
            swags['swagsInfo']['Standard'] = {
                "image": "https://i.ibb.co/phTGP3p/Untitled-6-1.png",
                requiredPoints: 15,
            }

            // Advanced Milestone
            swags['swagsInfo']['Advanced'] = {
                "image": "https://i.ibb.co/VMbbPP2/Untitled-7-6.png",
                requiredPoints: 30,
            }

            // Premium Milestone
            swags['swagsInfo']['Premium'] = {
                "image": "https://i.ibb.co/93zM2X8/Untitled-2-33.png",
                requiredPoints: 45,
            }

            // PremiumPlus Milestone
            swags['swagsInfo']['PremiumPlus'] = {
                "image": "https://i.ibb.co/1XMTw10/Untitled-3-6.png",
                requiredPoints: 65,
            }

            // champion milestone
            swags['swagsInfo']['Champion'] = {
                "image": "https://i.pinimg.com/736x/f3/ae/06/f3ae06a0dc866c0e71ecb0e59ee3b4f7.jpg",
                requiredPoints: 75,
            }



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


            // * Adding data in my database
            try {
                // Remove the existing entry if it exists
                await User.findOneAndDelete({ id: dataForDataBase['id'] });

                // Add the new entry
                var user = await User.findOneAndUpdate(
                    { id: dataForDataBase['id'] },
                    dataForDataBase,
                    { upsert: true, new: true }
                );
                console.log("User has been successfully updated!");
                console.log(user);
            } catch (error) {
                console.error(error);
                console.log("An error occurred while adding data to my database.");
            }


            // * Adding the badges to database which haven't been found!
            try {
                addUnknownBadges(this.UnknownBadges)
            } catch (err) {
                console.error(err);
            }


            additionalData['message'] = 'Data has been successfully fetched!';
            additionalData['success'] = true;
            additionalData['statusCode'] = 200;
            return { data }; // returns data

        } catch (err) {
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