const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');


// models 
const Contact = require('../../models/Contact');


// & SAVE THE CONTENT TO DATABASE
router.post('/saveContact', [
    body('email', "Please enter your email address").isEmail(),
    body('query', "Please enter your query").notEmpty(),
], async (req, res) => {

    // ~ Validating body request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let { email, query } = req.body;
        // Add the req.body to the main Contact model of mongoose
        let contactResult = await Contact.create({ email, query })

        // ~ incase it wont be saved
        if (contactResult === null) {
            return res.status(404).json({ success: false, message: "Please try again!" })
        }
        res.status(200).json({ success: true, message: 'Contact saved successfully' });
    } catch (error) {
        res.status(500).json({
            success: false, message: "Failed to save contact", error: error.message
        });
    }
})











module.exports = router;