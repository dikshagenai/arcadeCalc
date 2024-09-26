const express = require("express");
const router = express.Router();
const User = require('../../models/Users')

const AdminAuthentication = require('../../middleware/verifyAdmin')


// ! For fetching all users...
router.post('/fetchUsers', AdminAuthentication, async (req, res) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const limit = 9;
        const skip = (page - 1) * limit;
        const users = await User.find().sort({ _id: -1 }).skip(skip).limit(limit).select(['-_id', '-__v']);
        res.status(200).json({ success: true, users: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/totalUsers', AdminAuthentication, async (req, res) => {
    try {
        const amountOfUsers = (await User.find()).length
        return res.status(200).json({ success: true, amountOfUsers: amountOfUsers });
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }
})




module.exports = router;