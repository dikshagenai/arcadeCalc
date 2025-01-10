const mongoose = require('mongoose');

// Define the schema for GameBadges
const gameBadgeSchema = new mongoose.Schema({
    badgeName: {
        type: String,
        required: true, // Ensures badgeName is provided
        trim: true // Removes whitespace from beginning and end
    },
    points: {
        type: Number,
        required: true, // Ensures points is provided
        min: 0 // Ensures points cannot be negative
    },
    badgeMonth: {
        type: Number,
        required: true, // Ensures badgeMonth is provided
        min: 1, // Month cannot be less than 1
        max: 12 // Month cannot be more than 12
    },
    badgeType: {
        type: String,
        required: true, // Ensures badgeType is provided
        enum: ['gameBadges', 'triviaBadges', 'certificationBadges', 'specialBadges', 'baseCampBadges'] // Only allows values 
    }
});

// Create a model from the schema
const GameBadge = mongoose.model('GameBadge', gameBadgeSchema);

module.exports = GameBadge;
