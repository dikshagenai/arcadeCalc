const express = require("express");
const router = express.Router();
const User = require('../../models/Users')
const jwt = require('jsonwebtoken');

const AdminAuthentication = require('../../middleware/verifyAdmin')
const WebsiteAuthentication = require('../../middleware/verifyWebsite')


// * Middleware to check user authentication.
const { body, validationResult } = require('express-validator');
const adminCredentials = {
    username: "admin",
    password: "AMBEdkar"
}


// ^ Make the admin login
router.post('/login', [
    WebsiteAuthentication,
    body('username', 'Username must contain at least 3 characters.').isLength({ min: 3 }),
    body('password', 'Password can\'t be less than 3 characters.').isLength({ min: 3 }),
], async (req, res) => {

    // ~ Validating body request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;


    try {
        if (adminCredentials.username === username && adminCredentials.password === password) {
            const token = jwt.sign({ username }, 'ArcadeCalcSecret', { expiresIn: '1h' }); // Set token expiration time as needed
            res.status(200).json({ message: 'Successful login', success: true, token });
        } else {
            res.status(401).json({ message: 'Invalid username or password', success: false });
        }
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }
})

router.post('/checkLogin', [AdminAuthentication, WebsiteAuthentication], async (req, res) => {
    return res.status(200).json({ message: "Authorized Access", success: true });
})



module.exports = router;