const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the UnknownBadge schema
const unknownBadgeSchema = new Schema({
    badgeName: {
        type: String,
        required: true
    },
    badgeLink: {
        type: String,
        required: true
    },
    badgeImg: {
        type: String,
        required: true,
        default: "NULL"
    }
});

// Create a model from the schema
const UnknownBadge = mongoose.model('UnknownBadge', unknownBadgeSchema);

// Export the model
module.exports = UnknownBadge;
