
// Code by -> Deepanshu Prajapati
// Github : @deepanshu-prajapati01
// Instagram: @deepanshu_prajapati01
// LinkedIn : @deepanshu-prajapati01

const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');
const specialBadges = require('../../requiredFiles/SpecialBadges.json')
const skillBadgesWithLinks = require('../../requiredFiles/SkillBadgesWithLink.json') // file having skill badges as well as links.
const calculateFacilitatorMilestone = require('../BasicEndPoints/Functions/calculateFacilitatorMilestone')

const User = require('../../models/Users')



class Arcade {

    constructor() {
        // this.skillBadgesFile = "../requiredFiles/SkillBadgesExtracted.txt"; // this file will contain all the skill badges 
        this.UnknownBadgesFile = "./prototypeFiles/UnknownBadgesFile.txt";  // this will contain all the badges that aren't available 
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
        this.coursePoints = 5;
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

    //^------------------------------------------- CODE TO SCRAP THE PAGE
    async scrapPage(publicUrl) {

        // For path...
        const { default: path } = await import('path')
        const __dirname = path.resolve()

        const badgesDict = {}; // this will be as a element in `badgesList`, and it will have information about the badge.
        const badgesList = []; // This will have a collection of badges   
        const data = {}; // all data about the user will be stored in this
        let point = 0;
        data["totalPoints"] = point; // totalPoints about the user

        let userDetails = {};
        data["userDetails"] = userDetails // Details of the user.

        data["badges"] = badgesList; // this key of have 


        // Below this will take care of the site's last modification
        const date = new Date();
        const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const indiaTime = new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');
        data["lastChecked"] = indiaTime // This key will have 



        // ! For counting the number of trivia, games and skill badges
        // ! below one contains all data - This one is for Arcade Facilitator Program!
        let ArcadeBadgesStatus = {
            "Trivia Badges": 0,
            "Game Badges": 0,
            "Skill Badges": 0,
            "Other Badges": 0,
            "Facilitator BONUS": 0,
            "Milestone Earned": "None"
        }

        // ! Below is the one to count all the main Arcade Program.
        let NormalArcadeBadgesStatus = {
            "Trivia Badges": 0,
            "Game Badges": 0,
            "Skill Badges": 0,
            "Other Badges": 0,
            "Facilitator BONUS": 0,
        }


        data["FacilitatorStatus"] = ArcadeBadgesStatus; // & adding data to the main JSON output...
        data["ArcadeStatus"] = NormalArcadeBadgesStatus; // & adding data to the main JSON output... This one is not different from Arcade.

        // Giving out with the return value if any error occur 

        var success = "None"; // About successful
        var statusCode = 204; // No content
        var message = " "; // No text

        try {

            //^ This block to check whether user send the real site
            if (!publicUrl.includes("https://www.cloudskillsboost.google/public_profiles/")) {
                message = "Please provide a valid url"
                success = "False"
                statusCode = 400
                return { data, success, message, statusCode };
            }


            //^ ----------------------CODE to extract the DOM, if unable return error----------------------
            try {
                // console.log("Extracting the DOM...");
                var response = await axios.get(publicUrl);
                // console.log("DOM extracted successfully!");
            } catch (error) {
                message = "404 : No user found with the requested url."
                success = "False"
                statusCode = 503 // Service Unavailable.
                return { data, success, message, statusCode };
            }
            //^ -----------------------------------------------------------------------------------------------


            // extract the sub part of the main DOM
            const $ = cheerio.load(response.data);

            // ! ---------------------------------------------  Fetching user details --------------------------------

            // ^ for fetching name
            let name = $('.ql-display-small');
            name = name.text().replaceAll('\n', '').trim()
            userDetails["name"] = name

            // ^ for fetching the user img
            let userImg = $('#jump-content >div:first-child .profile-avatar');
            userImg = userImg.attr('src');
            userDetails["userImg"] = userImg

            // ^ for fetching the user's points
            let memberSince = $('#jump-content >div:first-child .ql-body-large')
            memberSince = memberSince.text().replaceAll('\n', '').trim()
            userDetails["memberSince"] = memberSince

            // ^ for fetching the user's points
            let userPoints = $('#jump-content >div:first-child .profile-league >strong')
            userPoints = userPoints.text().replaceAll('\n', '').trim()
            userDetails["points"] = userPoints

            // ^ for fetching the user's league url
            let leagueImg = $('#jump-content >div:first-child .profile-league >img')
            leagueImg = leagueImg.attr('src')
            userDetails["leagueImg"] = leagueImg;

            // ^ for fetching the user's league name
            let leagueName = $('#jump-content >div:first-child .profile-league >h2')
            leagueName = leagueName.text().replaceAll('\n', '').trim()
            userDetails["leagueName"] = leagueName;


            // ! ------------------------------------------------------------------------------------------------------------

            const badgesArea = $('main').first().html();
            const soup2 = cheerio.load(badgesArea); // create soup2 for sub DOM (poor code logic)    


            //^ ---------------------------------Checking for the skillBadges file if not extract it...-------------
            let skillBadges;
            try {

                var temp = []
                Object.keys(skillBadgesWithLinks).forEach((badge) => {
                    temp.push(badge.trim())
                })
                skillBadges = temp;
            } catch {

                message = 'Error in the server, please try again later.'
                success = 'False';
                statusCode = 500 // internal server error
                return { data, success, message, statusCode };
                // Don't want to go further due to extracting issues.

            }
            //^ --------------------------------------------------------------------------------------------------------






            //^ -----------------------Running a loop for all the `profile-badge`-----------------------
            soup2('.profile-badge').each((i, badge) => {
                const badgesDict = {};
                this.badgeType = 'Unknown' // making the badgeType unknown
                const soup3 = cheerio.load(badge);

                //  parsing badge details -> Name, Claimed On
                const badgeLink = soup3('a').first().attr('href').trim();
                let badgeName = soup3('img').first().attr('alt').trim();
                badgeName = badgeName.split(" ").slice(2).join(" ");
                let badgeEarnedOn = soup3('span').last().text().trim().split(" ");
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

                // ! Skill Badge

                if (skillBadges && skillBadges.includes(badgeName)) {

                    console.log(`\n\n\nBadge: ${badgeName}, Date: ${date}, ${monthInInteger}, ${year}\n\n\n`)


                    if (year === 2024 && monthInInteger === 7 && (date >= 22 && date <= 31)) {
                        point = 1;  // monsoon event have 1 skill badge = 1 arcade point
                        data["totalPoints"] += point;
                        // console.log("Skill Badge (Monsoon Event) : " + point + " => " + data["totalPoints"]);
                        this.badgeType = 'Skill Badge (Monsoon Event)' // skill badge claimed during monsoon event!

                        // * This will only count for arcade facilitator program... 
                        ArcadeBadgesStatus["Skill Badges"] += 1; // & increase the count of skill badges...
                        NormalArcadeBadgesStatus["Skill Badges"] += 1 // & Adding this count in main Arcade program too.

                    } else if (year === 2024 && monthInInteger > 7) {
                        point = 0.5; // normally 1 skill badge = 0.5 arcade point
                        data["totalPoints"] += point;
                        // console.log("Skill Badge : " + point + " => " + data["totalPoints"]);
                        this.badgeType = 'Skill Badge'

                        // * This will only count for arcade facilitator program...
                        if (monthInInteger < 9 || (date <= 27 && monthInInteger === 9)) {
                            ArcadeBadgesStatus["Skill Badges"] += 1; // & increase the count of skill badges...
                            NormalArcadeBadgesStatus["Skill Badges"] += 1; // & Adding this count in main Arcade program too.
                        }
                        else if (monthInInteger >= 9 && monthInInteger <= 12) {
                            NormalArcadeBadgesStatus["Skill Badges"] += 1; // & Adding this count in main Arcade program too.
                        }
                    }
                }

                // ! Arcade Cloud Digital Leader Challenge
                // & No skill badge or game/trivia badge will be incremented...

                else if (this.courseBadge.includes(badgeName)) {
                    if (year === 2024 && monthInInteger === 8 && (date >= 1 && date <= 5)) {
                        this.coursePoints -= 1;
                        if (this.coursePoints === 0) {
                            point = 5; // due to the fact of providing free 5 arcade points after successful completion of the course.
                            data["totalPoints"] += point;
                            badgeName = "Arcade Cloud Digital Leader Challenge"; // Renaming it for better knowledge
                            this.badgeType = 'Arcade Cloud Digital Leader Challenge worth 5 Arcade points' // if completed within time period...

                        } else {
                            point = 0;
                            data["totalPoints"] += point;
                            this.badgeType = 'Introductory Badge'
                        }
                    }
                }

                // ! Special Badges - (Trivia games and Arcade Badges)

                else {
                    if (specialBadges && Object.keys(specialBadges).includes(badgeName)) {
                        this.badgeType = specialBadges[badgeName][0] // Badge Type -- `Arcade Badge` or `Trivia Badge`
                        point = specialBadges[badgeName][1] // Point is at 1 index number
                        data["totalPoints"] += point;
                        // console.log(this.badgeType + " : " + point + " => " + data["totalPoints"]);

                        // & Updating badges count for games and trivia badges...
                        // * Also make sure not to add badges after the Arcade Facilitator Program...
                        if (this.badgeType === "Arcade Badge") {

                            // if (monthInInteger <= 9 && (date <= 27)) {
                            if (monthInInteger < 9 || (date <= 27 && monthInInteger === 9)) {
                                ArcadeBadgesStatus['Game Badges'] += 1;   // & incremented
                            }

                            if (monthInInteger < 12) // add ending date here
                            {
                                NormalArcadeBadgesStatus['Game Badges'] += 1; // & incremented... for the main Arcade program
                            }

                        }
                        // * Also make sure not to add badges after the Arcade Facilitator Program...
                        else if (this.badgeType === "Trivia Badge") {
                            // if (monthInInteger <= 9 && (date <= 27)) {
                                if (monthInInteger < 9 || (date <= 27 && monthInInteger === 9)) {
                                ArcadeBadgesStatus['Trivia Badges'] += 1;   // & incremented
                            }

                            if (monthInInteger < 12) // add ending date here
                            {
                                NormalArcadeBadgesStatus['Trivia Badges'] += 1; // & incremented... for the main Arcade program
                            }
                        }

                        else if (this.badgeType === "Other Badge" && monthInInteger <= 9 && (date <= 27)) {
                            if (monthInInteger <= 9 && (date <= 27)) {
                                ArcadeBadgesStatus['Other Badges'] += 1;   // & incremented
                            }

                            if (monthInInteger < 12) // add ending date here
                            {
                                NormalArcadeBadgesStatus['Other Badges'] += 1; // & incremented... for the main Arcade program
                            }

                        }
                    }

                    else {
                        console.log(`NOT FOUND: '${badgeName}'`);
                        try {
                            // fs.readFileSync(path.join(__dirname, this.UnknownBadgesFile), function (err, data) {
                            //     if (err) {
                            //         fs.createWriteStream(path.join(__dirname, this.UnknownBadgesFile))
                            //     }
                            // })
                            fs.appendFileSync(path.join(__dirname, this.UnknownBadgesFile), `${badgeName}\n`);
                        } catch (err) {
                            console.error(err);

                            statusCode = 500;
                            success = "False"
                            message = "Error occurred while writing NOTFOUND.txt file."
                        }
                        point = 0;
                        data["totalPoints"] += point; // point not added
                        this.badgeType = 'Unknown';
                    }
                }

                // ADDING ALL DATA
                badgesDict["Badge Name"] = badgeName;
                badgesDict["Badge link"] = badgeLink;
                badgesDict["Earned On"] = `${date} ${month} ${year}`;
                badgesDict["Arcade Point"] = point;
                badgesDict["Badge Type"] = this.badgeType;
                badgesList.push(badgesDict);
            });

            success = "True"
            message = "Result Fetched Successfully!"
            statusCode = 200


            // ! CODE TO MAKE POINT SYSTEM FOR ARCADE FACILITATOR
            // ! Updated Code here

            // here using another file to update the arcade facilitator points for particular milestone
            // console.log(calculateFacilitatorMilestone)
            try {
                ArcadeBadgesStatus = await calculateFacilitatorMilestone(ArcadeBadgesStatus)

            } catch (error) {
                console.log(error);
            }


            // ! Code to tell the user about the swags he will achieve without any facilitator
            data['swagsWithoutFacilitator'] = 'None'

            if (data['totalPoints'] >= 65) {
                data['swagsWithoutFacilitator'] = 'PremiumPlus'
            }
            else if (data['totalPoints'] >= 45 && data['totalPoints'] < 65) {
                data['swagsWithoutFacilitator'] = 'Premium'
            }
            else if (data['totalPoints'] >= 30 && data['totalPoints'] < 45) {
                data['swagsWithoutFacilitator'] = 'Advanced'
            }
            else if (data['totalPoints'] >= 15 && data['totalPoints'] < 30) {
                data['swagsWithoutFacilitator'] = 'Standard'
            }
            else {
                data['swagsWithoutFacilitator'] = 'None'
            }


            // & this segment returns the total points (if user registered under any facilitator also...)
            // console.log(ArcadeBadgesStatus)
            data["totalPointsFacilitator"] = ArcadeBadgesStatus["Facilitator BONUS"] + data["totalPoints"];

            // ! Code to tell the user about the swags he will get with facilitator.
            data['swagsWithFacilitator'] = 'None'
            data['swagsInfo'] = {}

            if (data['totalPointsFacilitator'] >= 65) {
                data['swagsWithFacilitator'] = 'PremiumPlus'
                data['swagsInfo']['icons'] = { 'Standard': '!', Advanced: '!', Premium: '!', PremiumPlus: true }


            }
            else if (data['totalPointsFacilitator'] >= 45 && data['totalPointsFacilitator'] < 65) {
                data['swagsWithFacilitator'] = 'Premium'
                data['swagsInfo']['icons'] = { 'Standard': '!', Advanced: '!', Premium: true, PremiumPlus: false }
            }
            else if (data['totalPointsFacilitator'] >= 30 && data['totalPointsFacilitator'] < 45) {
                data['swagsWithFacilitator'] = 'Advanced'
                data['swagsInfo']['icons'] = { 'Standard': '!', Advanced: true, Premium: false, PremiumPlus: false }
            }
            else if (data['totalPointsFacilitator'] >= 15 && data['totalPoints'] < 30) {
                data['swagsWithFacilitator'] = 'Standard'
                data['swagsInfo']['icons'] = { 'Standard': true, Advanced: false, Premium: false, PremiumPlus: false }
            }
            else {
                data['swagsWithFacilitator'] = 'None'
                data['swagsInfo']['icons'] = { 'Standard': false, Advanced: false, Premium: false, PremiumPlus: false }
            }


            // adding information according to the swags (with facilitator only \-)

            // Standard Milestone 
            data['swagsInfo']['Standard'] = {
                "image": "https://i.ibb.co/txBRWb9/fegvdf.png",
                requiredPoints: 15,
            }

            // Advanced Milestone
            data['swagsInfo']['Advanced'] = {
                "image": "https://i.ibb.co/sVvZsmb/30points.png",
                requiredPoints: 30,
            }

            // Premium Milestone
            data['swagsInfo']['Premium'] = {
                "image": "https://i.ibb.co/MCmx8cJ/45-points.png",
                requiredPoints: 45,
            }

            // PremiumPlus Milestone
            data['swagsInfo']['PremiumPlus'] = {
                "image": "https://i.ibb.co/qF1BFSz/Untitled-2.png",
                requiredPoints: 65,
            }



            // ! Collecting user data in my database!
            var splitPublicUrl = publicUrl.split('https://www.cloudskillsboost.google/public_profiles/')[1]
            var dataForDataBase = {
                "id": splitPublicUrl,
                "name": userDetails.name,
                "publicUrl": publicUrl,
                "normalPoints": data.totalPoints,
                "swagsWithoutFacilitator": data.swagsWithoutFacilitator,
                "facilitatorPoints": data.totalPointsFacilitator,
                "swagsWithFacilitator": data.swagsWithFacilitator
            }


            // ^ Adding data in my database
            try {
                // Remove the existing entry if it exists
                await User.findOneAndDelete({ id: dataForDataBase['id'] });

                // Add the new entry
                var user = await User.findOneAndUpdate(
                    { id: dataForDataBase['id'] },
                    dataForDataBase,
                    { upsert: true, new: true }
                );
                console.log("\n\n\n\nUser has been successfully updated!\n\n\n\n");
                console.log(user);
            } catch (error) {
                console.error(error);
                console.log("\n\n\n\nAn error occurred while adding data to my database.\n\n\n\n");
            }




            //    Deleting the badges because no use of it in the frontend (for now!)
            delete data.badges;


            return { data, success, message, statusCode }; // return data

        } catch (err) {
            console.error(`Unknown error occurred: ${err}`);
            success = "False"
            message = "Please contact the administrator to solve the issue."
            statusCode = 410 // code is outdated and needs to be upgraded!
            return { data, success, message, statusCode }; // return data
        }
    }
}












module.exports = Arcade;