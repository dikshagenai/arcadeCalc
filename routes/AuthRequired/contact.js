const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const AdminAuthentication = require('../../middleware/verifyAdmin')


// models 
const Contact = require('../../models/Contact');


router.get('/getContacts', AdminAuthentication, async (req, res) => {
    try {
        const contact = await Contact.find().select(['-__v']);
        res.status(200).json({ success: true, contact: contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
})



// ! Route to delete the query of the person (if resolved and even if spam)
router.delete('/deleteQuery', [AdminAuthentication,
    body('_id', 'Please provide the id of the person you want to resolve.').isLength({ min: 1 }),
], async (req, res) => {

    // ~ Validating body request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let { _id } = req.body;
        let contact = await Contact.deleteOne({ _id });

        if (contact.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }

        res.status(200).json({ success: true, message: 'Contact deleted successfully', result: contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
})



module.exports = router;