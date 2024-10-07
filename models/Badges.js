const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            unique: true
        },
        data: {
            type: Map,
            of: new mongoose.Schema({
                link: String,
                image: String,
                badgeType: String,
                badgePoints: Number,
                badgeLink: String,
                solution: String,
                labs: [String]
            })
        }
    });

const Badge = mongoose.model('Badges', badgeSchema);

module.exports = Badge;
