const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Added name field
    email: { type: String, required: true },
    message: { type: String, required: true },  // Renamed from query to message
    profileUrl: { type: String, required: false }  // Added profileUrl field
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
