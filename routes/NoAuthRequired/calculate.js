const express = require('express');
const router = express.Router();
const { SERVER } = require('../../buildTime')
const Arcade = require("../BasicEndPoints/calculationMain");

const IncrementUser = require('../../models/UsersCount');


// Main calculation
router.post('/', async (req, res) => {
    const publicUrl = req.body.publicUrl; // Assuming you send data as JSON

    // ^ INCREMENTING USER IN SERVER
    try {
        // Endpoint to increment totalVisitedUsers
        var entries = await IncrementUser.findOne();
        if (!entries) {
            IncrementUser.create({ totalVisitedUsers: 1 })
        }
        else {
            await IncrementUser.findOneAndUpdate({}, { $inc: { totalVisitedUsers: 1 } }, { new: true });
        }

        console.log("User successfully incremented!");
    } catch (error) {
        console.log("Failed to increment user.")

    }


    try {
        var result = await new Arcade().scrapPage(publicUrl);
        console.log(result);
        res.status(result["statusCode"]).json({ result });
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred!");
    }
})




module.exports = router