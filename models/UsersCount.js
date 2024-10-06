const mongoose = require('mongoose');

const usersCount = new mongoose.Schema({
    uniqueUsers: { type: Number, default: 0 },
    dashboardSearches: { type: Number, default: 0 }

});

const User = mongoose.model('userCount', usersCount);
module.exports = User;
