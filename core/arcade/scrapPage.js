const axios = require('axios');
const cheerio = require('cheerio');

// helper files
const scrapUserDetails = require("./scrapUserDetails");


const scrapPage = async (publicUrl) => {
    // This function will scrape the page and extract the required data

    // Initialize output object
    let output = {};

    //^ ----------------------CODE to extract the DOM, if unable return error----------------------
    try {
        var response = await axios.get(publicUrl);
    } catch (error) {
        output['message'] = 'No user found with the requested url.'
        output['error'] = 'Invalid URL'
        output['statusCode'] = 400;
        return { output };
    }
    //^ -----------------------------------------------------------------------------------------------

    try {
        // & extracting th main DOM
        const $ = cheerio.load(response.data);

        // ~ Feeds all the details of the user to this main object
        // ~ Part for userDetails has been finished here!
        userDetails = await scrapUserDetails($);

        // & create subSoup for sub DOM (poor code logic)    
        const badgesArea = $('main').first().html();
        const subSoup = cheerio.load(badgesArea).html();

        let success = true;
        console.log(userDetails)
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