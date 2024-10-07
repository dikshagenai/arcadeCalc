const Badges = require('../../../../models/Badges');

async function getSkillBadges() {
    for (let i = 0; i < 5; i++) {
        try {
            let badges = await Badges.findOne({ type: "skillBadges" }).select(['data', '-_id']);

            if (Object.keys(badges['data']).length === 0) throw new Error("No badges found");
            data = badges.toObject().data;
            let result = { 'data': Object }

            for (const [key, value] of data.entries()) {
                result['data'][key] = value;
                delete result['data'][key]._id; // Remove the _id field from nested objects if present
            }
            result['success'] = true;
            // console.log(result)

            return result;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i === 4) {
                return { success: false };
            }
        }
    }
}

async function getSpecialBadges() {
    for (let i = 0; i < 5; i++) {
        try {
            let badges = await Badges.findOne({ type: "specialBadges" }).select(['data', '-_id']);

            if (Object.keys(badges['data']).length === 0) throw new Error("No badges found");
            let data = badges.toObject().data;
            let result = { 'data': {} }; // Initialize result.data as an empty object

            for (const [key, value] of data.entries()) {
                result['data'][key] = value;
                delete result['data'][key]._id; // Remove the _id field from nested objects if present
            }
            result['success'] = true;
            // console.log(result);

            return result;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i === 4) {
                return { success: false };
            }
        }
    }
}


module.exports = { getSkillBadges, getSpecialBadges };
