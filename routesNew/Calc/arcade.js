const express = require('express');
const router = express.Router();
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
            await IncrementUser.create({ dashboardSearches: 1, updates: [{ timestamp: new Date(), count: 1 }] });
        } else {
            await IncrementUser.findOneAndUpdate(
                {},
                {
                    $inc: { dashboardSearches: 1 },
                    $push: { updates: { timestamp: new Date(), count: 1 } }
                },
                { new: true }
            );
        }

        console.log("User successfully incremented!");
    } catch (error) {
        console.log("Failed to increment user.");
    }



    try {
        var result = await new Arcade().scrapPage(publicUrl);
        res.status(result['data']["additionalData"]['statusCode']).json( result );
    } catch (error) {
        res.status(500).json(
            {
                message: "Some error occurred!",
                error: error,
                statusCode: 500,
                success: false
            }
        );
    }
})




module.exports = router