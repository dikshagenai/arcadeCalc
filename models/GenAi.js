const mongoose = require('mongoose');

const genAiSchema = new mongoose.Schema({});

const genaibadges = mongoose.model('genaibadges', genAiSchema);

module.exports = genaibadges;
