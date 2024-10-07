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
    for (let i = 0; i < 5; i++) {
        try {
            let badges = await Badges.findOne({ type: "genAiBadges" }).select(['data', '-_id']);

            if (!badges || Object.keys(badges['data']).length === 0) throw new Error("No badges found");

            let data = badges.toObject().data;
            let result = { data: {} };

            for (const [key, value] of data.entries()) {
                result.data[key] = value;
                delete result.data[key]._id; // Remove the _id field from nested objects if present
            }

            result.success = true;
            return res.json(result);
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i === 4) {
                return res.status(500).json({ message: error.message });
            }
        }
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