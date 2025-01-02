const express = require("express");
const router = express.Router();
const fs = require('fs');


// Models
const User = require('../../models/Users')
const IncrementUser = require('../../models/UsersCount');




// ! To increment the user count... (overall main searches)

router.post('/incrementUniqueUser', async (req, res) => {
    // means one more to be added in the main json
    try {
        // Endpoint to increment totalVisitedUsers
        var entries = await IncrementUser.findOne();
        if (!entries) {
            IncrementUser.create({ uniqueUsers: 1 })
        }
        else {
            await IncrementUser.findOneAndUpdate({}, { $inc: { uniqueUsers: 1 } }, { new: true });
        }
        res.send("User successfully incremented!");
    } catch (error) {
        res.status(500).send("Unknown error occurred!")
    }
})

// ! To increment the user count... (dashboard searches...)
router.post('/incrementDashboardSearches', async (req, res) => {
    // means one more to be added in the main json
    try {
        // Endpoint to increment totalVisitedUsers
        var entries = await IncrementUser.findOne();
        if (!entries) {
            IncrementUser.create({ dashboardSearches: 1 })
        }
        else {
            await IncrementUser.findOneAndUpdate({}, { $inc: { dashboardSearches: 1 } }, { new: true });
        }
        res.send("User successfully incremented!");
    } catch (error) {
        res.status(500).send("Unknown error occurred!")
    }
})


// ! For adding new users...
router.post('/addUser', async (req, res) => {
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
router.get('/countUniqueUsers', async (req, res) => {
    try {
        const amountOfUsers = (await IncrementUser.findOne().select(['uniqueUsers', '-_id']))
        return res.status(200).json({ success: true, amountOfUsers: amountOfUsers['uniqueUsers'] });
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }
})


// ~ Count the dashboard users...
router.get('/countDashboardUsers', async (req, res) => {
    try {
        const amountOfUsers = (await IncrementUser.findOne().select(['dashboardSearches', '-_id']))
        return res.status(200).json({ success: true, amountOfUsers: amountOfUsers['dashboardSearches'] });
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }
})



module.exports = router;
