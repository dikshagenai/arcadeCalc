
// Code by -> Deepanshu Prajapati
// Github : @deepanshu-prajapati01
// Instagram: @deepanshu_prajapati01
// LinkedIn : @deepanshu-prajapati01

const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

class Arcade {

    constructor() {
        this.skillBadgesFile = "SkillBadgesExtracted.txt"; // this file will contain all the skill badges 
        this.UnknownBadgesFile = "UnknownBadgesFile.txt";  // this will contain all the badges that aren't available 
        this.SpecialBadges = "SpecialBadges.json";
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

    //^ ------------------------------------------- CODE TO EXTRACT ALL SKILL BADGES INTO A FILE 
    async extractSkillBadges() {
        console.log("Extracting all the names of skill badges");
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
            fs.writeFileSync(this.skillBadgesFile, badges.join('\n'));
        } catch (error) {
            setSuccess("False")
            setStatusCode(500) // Bad Gateway
            setMessage("Internal Server Error")
            console.log("Error while extracting Skill Badges: " + error);
        }

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
        const badgesDict = {}; // this will be as a element in `badgesList`, and it will have information about the badge.
        const badgesList = []; // This will have a collection of badges   
        const data = {}; // all data about the user will be stored in this
        let point = 0;
        data["totalPoints"] = point; // totalPoints about the user
        data["name"] = '' // Name of the user.
        data["badges"] = badgesList; // this key of have 
        data["last checked"] = new Date().toISOString().slice(0, 19).replace('T', ' '); // This key will have 

        // ! For counting the number of trivia, games and skill badges
        // ! below one contains all data
        const ArcadeBadgesStatus = {
            "Trivia Badges": 0,
            "Game Badges": 0,
            "Skill Badges": 0,
            "Facilitator BONUS": 0,
            "Milestone Earned": "None"
        }
        data["FacilitatorStatus"] = ArcadeBadgesStatus; // & adding data to the main JSON output...

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
                console.log("Extracting the DOM...");
                var response = await axios.get(publicUrl);
                console.log("DOM extracted successfully!");
            } catch (error) {
                message = "404 : No user found with the requested url."
                success = "False"
                statusCode = 503 // Service Unavailable.
                return { data, success, message, statusCode };
            }
            //^ -----------------------------------------------------------------------------------------------


            // extract the sub part of the main DOM
            const $ = cheerio.load(response.data);

            // ! ---------------------------------------------  Adding name to the main ------------------------------------- 
            let name = $('.ql-display-small');
            name = name.text().replaceAll('\n', '')
            data["name"] = name

            // ! ------------------------------------------------------------------------------------------------------------

            const badgesArea = $('main').first().html();
            const soup2 = cheerio.load(badgesArea); // create soup2 for sub DOM (poor code logic)    


            //^ ---------------------------------Checking for the skillBadges file if not extract it...-------------
            let skillBadges;
            while (true) {
                try {
                    skillBadges = fs.readFileSync(this.skillBadgesFile, 'utf-8').split("\n").map(badge => badge.trim());
                    break;
                } catch {
                    await this.extractSkillBadges();
                    if (statusCode === 500) {
                        return { data, success, message, statusCode };
                        // Don't want to go further due to extracting issues.
                    }
                }
            }
            //^ --------------------------------------------------------------------------------------------------------


            //^ --------------------------------Code to checkOut for the Special Badges...
            let specialBadges = null;
            try {
                if (fs.existsSync(this.SpecialBadges)) {
                    specialBadges = JSON.parse(fs.readFileSync(this.SpecialBadges, 'utf-8'));
                } else {
                    console.log(`No file found with the name of ${this.SpecialBadges}.`); // in case admin makes naming issues.
                }
            } catch (err) {
                console.error(err);
                success = "False"
                statusCode = 500 // internal server error
                message = "Its not you, it's us. Please contact the administrator to solve the issue."
                return { data, success, message, statusCode };
            }
            //^ -------------------------------------------------------------------------------





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

                if (skillBadges.includes(badgeName)) {
                    if (year === 2024 && monthInInteger === 7 && (date >= 22 || date <= 31)) {
                        point = 1;  // monsoon event have 1 skill badge = 1 arcade point
                        data["totalPoints"] += point;
                        console.log("Skill Badge (Monsoon Event) : " + point + " => " + data["totalPoints"]);
                        this.badgeType = 'Skill Badge (Monsoon Event)' // skill badge claimed during monsoon event!

                        // * This will only count for arcade facilitator program... 
                        ArcadeBadgesStatus["Skill Badges"] += 1; // & increase the count of skill badges...

                    } else if (year === 2024 && monthInInteger > 7) {
                        point = 0.5; // normally 1 skill badge = 0.5 arcade point
                        data["totalPoints"] += point;
                        console.log("Skill Badge : " + point + " => " + data["totalPoints"]);
                        this.badgeType = 'Skill Badge'

                        // * This will only count for arcade facilitator program...
                        if (monthInInteger <= 9) {
                            ArcadeBadgesStatus["Skill Badges"] += 1; // & increase the count of skill badges...
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
                    if (specialBadges && badgeName in specialBadges) {
                        this.badgeType = specialBadges[badgeName][0] // Badge Type -- `Arcade Badge` or `Trivia Badge`
                        point = specialBadges[badgeName][1] // Point is at 1 index number
                        data["totalPoints"] += point;
                        console.log(this.badgeType + " : " + point + " => " + data["totalPoints"]);

                        // & Updating badges count for games and trivia badges...
                        // * Also make sure not to add badges after the Arcade Facilitator Program...
                        if (this.badgeType === "Arcade Badge" && monthInInteger <= 9) {
                            ArcadeBadgesStatus['Game Badges'] += 1;   // & incremented
                        }
                        // * Also make sure not to add badges after the Arcade Facilitator Program...
                        else if (this.badgeType === "Trivia Badge" && monthInInteger <= 9) {
                            ArcadeBadgesStatus["Trivia Badges"] += 1; // & incremented...
                        }
                    }

                    else {
                        console.log(`NOT FOUND: '${badgeName}'`);
                        try {
                            fs.appendFileSync("NOTFOUND.txt", `${badgeName}\n`);
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
            // * Ultimate Milestone
            if (ArcadeBadgesStatus["Game Badges"] >= 6 && ArcadeBadgesStatus["Trivia Badges"] >= 8 && ArcadeBadgesStatus["Skill Badges"] >= 42) {
                ArcadeBadgesStatus["Facilitator BONUS"] += 25
                ArcadeBadgesStatus["Milestone Earned"] = "Ultimate Milestone"
            }

            // * Milestone 3
            else if (ArcadeBadgesStatus["Game Badges"] >= 5 && ArcadeBadgesStatus["Trivia Badges"] >= 6 && ArcadeBadgesStatus["Skill Badges"] >= 28) {
                ArcadeBadgesStatus["Facilitator BONUS"] += 15
                ArcadeBadgesStatus["Milestone Earned"] = "Milestone 3"
            }

            // * Milestone 2
            else if (ArcadeBadgesStatus["Game Badges"] >= 3 && ArcadeBadgesStatus["Trivia Badges"] >= 4 && ArcadeBadgesStatus["Skill Badges"] >= 18) {
                ArcadeBadgesStatus["Facilitator BONUS"] += 9
                ArcadeBadgesStatus["Milestone Earned"] = "Milestone 2"
            }

            // * Milestone 1
            else if (ArcadeBadgesStatus["Game Badges"] >= 2 && ArcadeBadgesStatus["Trivia Badges"] >= 2 && ArcadeBadgesStatus["Skill Badges"] >= 8) {
                ArcadeBadgesStatus["Facilitator BONUS"] += 2
                ArcadeBadgesStatus["Milestone Earned"] = "Milestone 1"
            }

            // * Nothing
            else {
                ArcadeBadgesStatus["Facilitator BONUS"] += 0;
                ArcadeBadgesStatus["Milestone Earned"] = "NaN"
            }

            // & this segment returns the total points (if user registered under any facilitator also...)
            data["totalPointsFacilitator"] = ArcadeBadgesStatus["Facilitator BONUS"] + data["totalPoints"];

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