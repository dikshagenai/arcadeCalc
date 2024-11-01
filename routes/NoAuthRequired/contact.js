const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');


// models 
const Contact = require('../../models/Contact');


// & SAVE THE CONTENT TO DATABASE
router.post('/saveContact', [
    body('name', "Please enter your name").notEmpty(),  // New validation for name
    body('email', "Please enter a valid email address").isEmail(),
    body('message', "Please enter your message").notEmpty(),  // Renamed from query to message
], async (req, res) => {

    // ~ Validating body request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Destructuring the new fields from req.body
        let { name, email, message, profileUrl } = req.body;

        // Add the req.body to the main Contact model of mongoose
        let contactResult = await Contact.create({ name, email, message, profileUrl });

        // ~ In case it won't be saved
        if (contactResult === null) {
            return res.status(404).json({ success: false, message: "Please try again!" });
        }

        res.status(200).json({ success: true, message: 'Contact saved successfully' });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to save contact",
            error: error.message
        });
    }
});












module.exports = router;