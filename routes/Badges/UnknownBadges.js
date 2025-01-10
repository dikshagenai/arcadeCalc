const express = require('express');
const router = express.Router();


// validations
const { body, validationResult } = require('express-validator');
const AdminAuthentication = require('../../middleware/verifyAdmin');
const WebsiteAuthentication = require('../../middleware/verifyWebsite');

const {
    fetchUnknownBadges, addOrUpdateUnknownBadge, deleteUnknownBadge } = require('../../DataBase/Badges/UnknownBadges');

// Fetching all game badges
router.get('/fetch',WebsiteAuthentication, async (req, res) => {
    try {
        const result = await fetchUnknownBadges();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Adding a new badge
router.post('/push', [
    body('badgeName', 'Badge name is required').notEmpty(),
    body('profileUrl', 'Profile URL must be a valid URL').isURL(),
    AdminAuthentication,
    WebsiteAuthentication
], async (req, res) => {
    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newBadge = req.body;
        const result = await addOrUpdateUnknownBadge(newBadge);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Deleting a badge
router.delete('/pop', [
    body('badgeName', 'Badge name is required').notEmpty(),
    AdminAuthentication,
    WebsiteAuthentication
], async (req, res) => {
    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { badgeName } = req.body;
        const result = await deleteUnknownBadge(badgeName);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})




module.exports = router;