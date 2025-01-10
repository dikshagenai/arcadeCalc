const express = require('express');
const router = express.Router();
const { getLeaderboardAndUser } = require('../../DataBase/WebsiteEngagement/user');
const { body, validationResult } = require('express-validator');

const WebsiteAuthentication = require("../../middleware/verifyWebsite")

// Main calculation
router.post('/', [
    WebsiteAuthentication,
    // Validate that 'id' exists and is a non-empty string
    body('id')
        .notEmpty()
        .withMessage('User ID is required.')
        .isString()
        .withMessage('User ID must be a valid string.'),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.body;

    try {
        // Fetch leaderboard and user data
        const result = await getLeaderboardAndUser(id);

        if (result.success) {
            return res.status(200).json({
                success: true,
                topUsers: result.topUsers,
                currentUser: result.currentUser
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Failed to fetch leaderboard data.'
            });
        }
    } catch (error) {
        console.error('Error in leaderboard endpoint:', error);
        return res.status(500).json({
            success: false,
            error: 'An unexpected error occurred.'
        });
    }
}
);

module.exports = router;
