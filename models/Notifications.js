const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    key: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
    redirectTo: { type: String, required: true }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
