const express = require('express');
const router = express.Router();
const { fetchSkillBadges } = require('../../DataBase/Badges/SkillBadges');

const { fetchBadges } = require('../../DataBase/Badges/GameBadges')


router.post('/game', async (req, res) => {
    try {
        const result = await fetchBadges(); // Call the function
        console.log('Fetched Skill Badges:', result); // Log the result to the console
        res.json(result);
    } catch (error) {
        console.error('Error fetching skill badges:', error);
    }
})
router.post('/skill', async (req, res) => {
    try {
        const result = await fetchSkillBadges(); // Call the function
        console.log('Fetched Skill Badges:', result); // Log the result to the console
        res.json(result);
    } catch (error) {
        console.error('Error fetching skill badges:', error);
    }
})

module.exports = router;