const express = require("express");
const router = express.Router();

const { incrementUniqueUsers, incrementDashboardSearches, countUniqueUsers, countDashboardUsers } = require("../../DataBase/WebsiteEngagement/user");

const WebsiteAuthentication = require("../../middleware/verifyWebsite")


// ! To increment the user count... (overall main searches)
router.post('/incrementUniqueUser', WebsiteAuthentication, async (req, res) => {
    // means one more to be added in the main json
    try {
        // Endpoint to increment totalVisitedUsers
        const result = await incrementUniqueUsers();
        res.send(result.message);
    } catch (error) {
        res.status(500).send("Unknown error occurred!")
    }
})

// ! To increment the user count... (dashboard searches...)
router.post('/incrementDashboardSearches', WebsiteAuthentication, async (req, res) => {
    // means one more to be added in the main json
    try {
        const result = await incrementDashboardSearches();
        res.send(result.message);
    } catch (error) {
        console.error(error);
        res.status(500).send("Unknown error occurred!");
    }
})


// ! For adding new users...
router.post('/addUser', WebsiteAuthentication, async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { id: req.body.id },
            req.body,
            { upsert: true, new: true }
        );
        res.status(200).send("User has been successfully updated!");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});



//  ! Counting users...

// ~ Count the unique users...
router.get('/countUniqueUsers', WebsiteAuthentication, async (req, res) => {
    try {
        const result = await countUniqueUsers();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
})


// ~ Count the dashboard users...
router.get('/countDashboardUsers', WebsiteAuthentication, async (req, res) => {
    try {
        const result = await countDashboardUsers();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
})



module.exports = router;
