const express = require('express');
const router = express.Router();
const { fetchUnknownBadges, deleteUnknownBadge } = require('../../DataBase/Badges/UnknownBadges');
const AdminAuthentication = require('../../middleware/verifyAdmin');
const WebsiteAuthentication = require('../../middleware/verifyWebsite');

// VALIDATION
const { body, validationResult } = require('express-validator');


// Fetch unknown badges.
router.post('/fetchUnknownBadges', [
    AdminAuthentication,
    WebsiteAuthentication
], async (req, res) => {

    try {
        var result = await fetchUnknownBadges();

        if (result.success === false) {
            res.status(404).json(result)
        }

        res.status(200).json(result)


    } catch (error) {
        res.status(500).json(result);
    }
})


// Fetch unknown badges.
router.delete('/deleteUnknownBadge', [
    body('badgeName')
        .notEmpty()
        .withMessage('Please provide a badge name to delete.'),
    AdminAuthentication,
    WebsiteAuthentication
], async (req, res) => {

    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const badgeName = req.body.badgeName; // Assuming you send data as JSON
        var result = await deleteUnknownBadge(badgeName);

        if (result.success === false) {
            res.status(404).json(result)
        }

        res.status(200).json(result)


    } catch (error) {
        res.status(500).json(result);
    }
})




module.exports = router;