const express = require('express');
const router = express.Router();


// validations
const { body, validationResult } = require('express-validator');
const AdminAuthentication = require('../../middleware/verifyAdmin');

// importing functions from the database folder
const { fetchSkillBadges, addOrUpdateSkillBadge, deleteSkillBadge
} = require('../../DataBase/Badges/SkillBadges');



// --------------------------- MAIN ------------------------

// Fetching all game badges
router.get('/getBadges', async (req, res) => {
    try {
        const result = await fetchSkillBadges();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Adding a new badge
router.post('/addBadge', [
    body('skillBadge', 'Skill badge name is required').notEmpty(),
    body('skillBadgeLink', 'Skill badge link must be a valid URL').isURL(),
    body('totalLabs', 'Total labs must be a valid number').isInt({ min: 1 }),
    body('difficulty', 'Difficulty must be one of Introductory, Intermediate, or Advanced').isIn(['Introductory', 'Intermediate', 'Advanced']),
    body('image', 'Image link must be a valid URL').isURL(),
    // AdminAuthentication
], async (req, res) => {

    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newBadge = req.body;
        const result = await addOrUpdateSkillBadge(newBadge);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Deleting a badge
router.delete('/deleteBadge', [
    body('badgeName', 'Badge Name is needed for this action!').notEmpty(),
    // AdminAuthentication
], async (req, res) => {

    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const {badgeName} = req.body;
        const result = await deleteSkillBadge(badgeName);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})




module.exports = router;