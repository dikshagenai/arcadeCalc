const express = require("express");
const router = express.Router();
const Notifications = require("../../models/Notifications");

// & Validations
const { body, validationResult } = require('express-validator');
const AdminAuthentication = require('../../middleware/verifyAdmin')


// ^ This route is responsible for adding new notifications...
router.post('/addNotifications', [
    body('key', 'Please pass a unique key').isLength({ min: 3 }),
    body('imageUrl', 'Please provide a link for the image.').isLength({ min: 3 }),
    body('content', 'Please share description about the notification').isLength({ min: 3 }),
    body('redirectTo', 'Must pass the link where to redirect the user.').isLength({ min: 5 }),
    AdminAuthentication,
], async (req, res) => {
    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        data = req.body;
        await Notifications.findOneAndUpdate(
            { key: req.body.key },
            req.body,
            { upsert: true, new: true }
        );
        res.status(200).json({ success: true, message: "Notification has been successfully updated!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error getting notifications", Error: error.message })
    }
})

// ^ EDIT NOTIFICATION
router.put('/updateNotification', [
    body('key', 'Please pass a unique key').isLength({ min: 3 }),
    body('imageUrl', 'Please provide a link for the image.').isLength({ min: 3 }),
    body('content', 'Please share description about the notification').isLength({ min: 3 }),
    body('redirectTo', 'Must pass the link where to redirect the user.').isLength({ min: 5 }),
    AdminAuthentication,
], async (req, res) => {
    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const data = req.body;
        const notification = await Notifications.findOneAndUpdate(
            { key: req.body.key },
            data,
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found!" });
        }
        res.status(200).json({ success: true, message: "Notification has been successfully updated!", notification });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating notification", error: error.message });
    }
});


// ^ DELETE NOTIFICATION
router.delete('/deleteNotification', [
    body('key', 'Please pass a unique key').isLength({ min: 3 }),
    AdminAuthentication,
], async (req, res) => {
    // Check for the validation results!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const notification = await Notifications.findOneAndDelete({ key: req.body.key });
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found!" });
        }
        res.status(200).json({ success: true, message: "Notification has been successfully deleted!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting notification", error: error.message });
    }
});



module.exports = router;