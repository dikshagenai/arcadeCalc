const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    publicUrl: { type: String, required: true },
    normalPoints: { type: Number, required: true },
    swagsWithoutFacilitator: { type: String, required: true },
    facilitatorPoints: { type: Number, required: true },
    swagsWithFacilitator: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
