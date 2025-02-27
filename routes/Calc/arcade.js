const express = require('express');
const router = express.Router();
const Arcade = require("../../core/main");
const { incrementDashboardSearches } = require('../../DataBase/WebsiteEngagement/user')

// VALIDATION
const { body, validationResult } = require('express-validator');
const WebsiteAuthentication = require("../../middleware/verifyWebsite")

// Main calculation
router.post('/', [
    WebsiteAuthentication,
    body('publicUrl')
        .notEmpty()
        .withMessage('Please provide a valid public URL')
        .custom((value) => value.includes('https://www.cloudskillsboost.google/public_profiles/')),
], async (req, res) => {
    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const publicUrl = req.body.publicUrl; // Assuming you send data as JSON

    // ^ INCREMENTING USER IN SERVER
    incrementDashboardSearches();
    try {
        var result = await new Arcade().analyzeProfile(publicUrl);
        res.status(result["additionalData"]['statusCode']).json(result);

    } catch (error) {
        res.status(500).json(
            // {
            //     message: "Some error occurred!",
            //     error: error,
            //     statusCode: 500,
            //     success: false
            // }
            result
        );
    }
})




module.exports = router