const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String, required: true, unique: true
    },
    name: {
        type: String, required: true
    },
    profileImage: {
        type: String, required: false, default: 'https://i.pinimg.com/736x/b8/cc/52/b8cc521993c9de7a8a6389255405f535.jpg',
    },
    publicUrl: {
        type: String, required: true
    },
    points: {
        type: Number, required: true
    },
    swagsEligibility: {
        type: String, required: true
    },
    facilitatorPoints: {
        type: Number, required: false, default: 0
    },
    swagsEligibilityFacilitator: {
        type: String, required: false, default: 'NaN'
    },
    rank: { type: Number, required: false, default: -1 } // New field to store rank
});

const User = mongoose.model('UserDetails', userSchema);

module.exports = User;
