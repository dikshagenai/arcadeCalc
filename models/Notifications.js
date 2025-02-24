const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    key: { type: String, unique: true }, // Unique key based on createdAt
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
    redirectTo: { type: String, required: true }
}, { timestamps: true });

// Middleware to set the key before saving
notificationSchema.pre('save', function (next) {
    if (!this.key) {
        this.key = new Date(this.createdAt || Date.now()).getTime().toString(); // Convert timestamp to string
    }
    next();
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
