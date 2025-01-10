const express = require('express');
const router = express.Router();

// validations
const { body, validationResult } = require('express-validator');
const AdminAuthentication = require('../../middleware/verifyAdmin');



// importing functions from the database folder
const { fetchBadges, addBadge, deleteBadge } = require('../../DataBase/Badges/IgnoreBadges');


// Fetching all game badges
router.get('/fetch', async (req, res) => {
    try {
        const result = await fetchBadges();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Adding a new badge
router.post('/push', [
    body('badgeName', 'Badge name is required').notEmpty(),
    body('reason', 'Reason is required').notEmpty(),
    AdminAuthentication
], async (req, res) => {

    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newBadge = req.body;
        const result = await addBadge(newBadge);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Deleting a badge
router.delete('/pop', [
    body('badgeName', 'Badge Name is needed for this action!').notEmpty(),
    AdminAuthentication
],
    async (req, res) => {

        // Check for the validation results!
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { badgeName } = req.body;
            const result = await deleteBadge(badgeName);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })




module.exports = router;