const express = require('express');
const router = express.Router();
const GenAi = require('../../models/GenAi');

router.get('/', async (req, res) => {
    try {
        let badges = await GenAi.find().select('-_id')
        badges = badges[0]

        let data = {}
        
        data['Badges'] = badges;
        data['success'] = true
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ "message": error.message })
    }
})





module.exports = router;