const express = require('express');
const router = express.Router();
const Badges = require('../../models/Badges')


// For extracting skillBadges
router.get('/skillBadges', async (req, res) => {
    try {
        let badges = await Badges.find({ type: "skillBadges" }).select(['-_id', '-type'])
        // console.log(data)
        let data = badges[0].toObject();
        data['success'] = true
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ "message": error.message })
    }
})

// For extracting specialBadges.
router.get('/specialBadges', async (req, res) => {
    try {
        let badges = await Badges.find({ type: "specialBadges" }).select(['-_id', '-type'])
        // console.log(data)
        let data = badges[0].toObject();
        data['success'] = true
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ "message": error.message })
    }
})


// For extracting genAI Badges.
router.get('/genAiBadges', async (req, res) => {
    try {
        let badges = await Badges.find({ type: "genAiBadges" }).select(['-_id', '-type'])
        // console.log(data)
        let data = badges[0].toObject();
        data['success'] = true
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ "message": error.message })
    }
})



// For extracting unknown Badges.
router.get('/unknownBadges', async (req, res) => {
    try {
        let badges = await Badges.find({ type: "unknownBadges" }).select(['-_id', '-type'])
        let data = badges[0].toObject();
        data['success'] = true
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ "message": error.message })
    }
})





module.exports = router;