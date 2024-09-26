const express = require("express");
const router = express.Router();
const fs = require('fs');


// Models
const User = require('../../models/Users')
const IncrementUser = require('../../models/UsersCount');




// ! To increment the user count...
router.post('/incrementUser', async (req, res) => {
    // means one more to be added in the main json
    try {
        // Endpoint to increment totalVisitedUsers
        var entries = await IncrementUser.findOne();
        if (!entries) {
            IncrementUser.create({ totalVisitedUsers: 1 })
        }
        else {
            await IncrementUser.findOneAndUpdate({}, { $inc: { totalVisitedUsers: 1 } }, { new: true });
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




router.get('/countUsers', async (req, res) => {
    try {
        const amountOfUsers = (await IncrementUser.findOne().select(['totalVisitedUsers', '-_id']))
        return res.status(200).json({ success: true, amountOfUsers: amountOfUsers['totalVisitedUsers'] });
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }
})




module.exports = router;
