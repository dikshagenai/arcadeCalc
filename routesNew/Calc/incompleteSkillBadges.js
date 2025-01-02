const express = require('express');
const router = express.Router();
const IncompleteSkillBadges = require('../BasicEndPoints/incompleteSkillBadges')



router.post('/', async (req, res) => {
    const publicUrl = req.body.publicUrl; // Assuming you send data as JSON
    try {
        var result = await new IncompleteSkillBadges().scrapPage(publicUrl);
        console.log(result);
        // res.status(result["statusCode"]).json({ result })
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred!");
    }
})


module.exports = router;