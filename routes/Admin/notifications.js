const express = require("express");
const router = express.Router();
const { fetchNotifications, addOrUpdateNotification, deleteNotification, } = require("../../DataBase/Notifications")

// & Validations
const { body, validationResult } = require('express-validator');
const AdminAuthentication = require('../../middleware/verifyAdmin')
const WebsiteAuthentication = require('../../middleware/verifyWebsite')


// ^ This is responsible to fetch all the notifications
router.get('/getNotifications', WebsiteAuthentication, async (req, res) => {
    try {
        const result = await fetchNotifications();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
});

// ^ This route is responsible for adding new notifications...
router.post('/addNotifications', [
    body('key', 'Please pass a unique key').isLength({ min: 3 }),
    body('imageUrl', 'Please provide a link for the image.').isLength({ min: 3 }),
    body('content', 'Please share description about the notification').isLength({ min: 3 }),
    body('redirectTo', 'Must pass the link where to redirect the user.').isLength({ min: 5 }),
    AdminAuthentication,
    WebsiteAuthentication
], async (req, res) => {
    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        data = req.body;
        const result = await addOrUpdateNotification(data);
        if (result.success) {
            res.status(200).json({ success: true, message: "Notification has been successfully updated!" });
        } else {
            res.status(400).json({ success: true, message: "Failed to add notification." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error getting notifications", Error: error.message })
    }
})



// ^ DELETE NOTIFICATION
router.delete('/deleteNotification', [
    body('key', 'Please pass a unique key').isLength({ min: 3 }),
    AdminAuthentication,
    WebsiteAuthentication
], async (req, res) => {
    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const result = await deleteNotification(req.body.key);
        if (result.success) {
            res.status(200).json({ success: true, message: "Notification has been successfully deleted!" });
        } else {
            res.status(404).json({ success: false, message: "Notification not found!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting notification", error: error.message });
    }
});



module.exports = router;