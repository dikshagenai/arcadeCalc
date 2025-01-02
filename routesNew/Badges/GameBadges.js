const express = require('express');
const router = express.Router();

// validations
const { body, validationResult } = require('express-validator');
const AdminAuthentication = require('../../middleware/verifyAdmin');



// importing functions from the database folder
const { fetchBadges, addBadge, deleteBadge } = require('../../DataBase/Badges/GameBadges');


// Fetching all game badges
router.get('/getBadges', async (req, res) => {
    try {
        const result = await fetchBadges();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Adding a new badge
router.post('/addBadge', [
    body('badgeName', 'Badge name is required').notEmpty(),
    body('badgeName', 'Badge name should be a string').isString(),
    body('points', 'Points must be a valid number').isInt({ min: 0 }),  // Ensure points is a positive integer
    body('badgeMonth', 'Badge month must be a number between 1 and 12').isInt({ min: 1, max: 12 }),
    body('badgeType', "Please select a badge type").notEmpty().isIn(['Game', 'Trivia', 'Certification', 'Speedrun']),
    // AdminAuthentication
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
router.delete('/deleteBadge', [
    body('badgeName', 'Badge Name is needed for this action!').notEmpty(),
    // AdminAuthentication
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