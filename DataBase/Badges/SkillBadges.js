const SkillBadge = require('../../models/badges/SkillBadges');

/**
 * Fetch all skill badges from the database.
 * @returns {Promise<Array>} List of all skill badges.
 */
async function fetchSkillBadges() {
    try {
        const badges = await SkillBadge.find().select(['-__v', '-_id']);
        return { success: true, message: "Badges has been successfully fetched!", data: badges };
    } catch (error) {
        console.error('Error fetching skill badges:', error);
        return { success: false, message: error.message }
    }
}

/**
 * Add or update a skill badge in the database.
 * If a skill badge with the same `skillBadge` exists, it updates it.
 * Otherwise, it creates a new skill badge.
 * @param {Object} badgeData - Skill badge details to add or update.
 * @returns {Promise<Object>} The newly added or updated skill badge.
 */
async function addOrUpdateSkillBadge(badgeData) {
    try {
        const updatedBadge = await SkillBadge.findOneAndUpdate(
            // trim this badgeName
            { badgeName: badgeData.badgeName.trim() }, // Match criteria (e.g., skillBadge)
            { $set: badgeData }, // Update data
            { new: true, upsert: true } // Return updated badge and create if not found
        );
        return { success: true, message: "Badge has been successfully added/updated.", data: updatedBadge };
    } catch (error) {
        console.error('Error adding or updating skill badge:', error);
        return { success: false, message: error.message }
    }
}

/**
 * Delete a skill badge by its name.
 * @param {String} skillBadgeName - Name of the skill badge to delete.
 * @returns {Promise<Object|null>} The deleted skill badge or null if not found.
 */
async function deleteSkillBadge(skillBadgeName) {
    try {
        const deletedBadge = await SkillBadge.findOneAndDelete({ badgeName: skillBadgeName.trim() });
        return { success: true, message: "Skill badge has been deleted", data: deletedBadge };
    } catch (error) {
        console.error('Error deleting skill badge:', error);
        return { success: false, message: error.message }
    }
}



module.exports = {
    fetchSkillBadges,
    addOrUpdateSkillBadge,
    deleteSkillBadge
};
