const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the IgnoreBadge schema
const ignoreBadgeSchema = new Schema({
    badgeName: {
        type: String,
        required: true, // Ensures badgeName is provided
        trim: true // Removes whitespace from beginning and end
    },
    reason: {
        type: String,
        required: true, // Ensures a reason is provided
        trim: true // Removes whitespace from beginning and end
    }
});

// Create a model from the schema
const IgnoreBadge = mongoose.model('IgnoreBadge', ignoreBadgeSchema);

// Export the model
module.exports = IgnoreBadge;
