const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String, required: true, unique: true
    },
    name: {
        type: String, required: true
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
    }
});

const User = mongoose.model('UserDetails', userSchema);
module.exports = User;
