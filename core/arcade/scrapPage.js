const axios = require('axios');
const cheerio = require('cheerio');

// helper files
const scrapUserDetails = require("./scrapUserDetails");


const scrapPage = async (publicUrl) => {
    // This function will scrape the page and extract the required data

    //^ ----------------------CODE to extract the DOM, if unable return error----------------------
    try {
        var response = await axios.get(publicUrl);
    } catch (error) {
        let message = error.message;
        let success = false;
        return { success, message };
    }
    //^ -----------------------------------------------------------------------------------------------

    try {
        // & extracting th main DOM
        const $ = cheerio.load(response.data);

        // ~ Feeds all the details of the user to this main object
        // ~ Part for userDetails has been finished here!
        userDetails = scrapUserDetails($);

        // & create subSoup for sub DOM (poor code logic)    
        const badgesArea = $('main').first().html();
        const subSoup = cheerio.load(badgesArea).html();

        let success = true;
        return {
            userDetails,
            subSoup,
            success
        }
    } catch (error) {
        let success = false;
        let message = error.message;
        return { success, message }
    }




}

module.exports = scrapPage;