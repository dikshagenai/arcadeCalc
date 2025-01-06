const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the SkillBadge schema
const skillBadgeSchema = new Schema({
    skillBadge: {
        type: String,
        required: true,
    },
    skillBadgeLink: {
        type: String,
        required: true,
    },
    totalLabs: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Introductory', 'Intermediate', 'Advanced'], // You can expand the difficulty levels as per your requirements
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
    }
});

// Create a model from the schema
const SkillBadge = mongoose.model('SkillBadge', skillBadgeSchema);

// Export the model
module.exports = SkillBadge;
