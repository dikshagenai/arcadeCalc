const UnknownBadge = require('../../models/badges/UnknownBadges');

/**
 * Fetch all unknown badges from the database.
 * @returns {Promise<Array>} List of all unknown badges.
 */
async function fetchUnknownBadges() {
    try {
        const badges = await UnknownBadge.find().select(['-_id', '-__v']);
        return { success: true, message: 'Badges has been successfully fetched', data: badges };
    } catch (error) {
        console.error('Error fetching unknown badges:', error);
        throw error;
    }
}

/**
 * Add or update an unknown badge in the database.
 * If an unknown badge with the same `badgeName` exists, it updates it.
 * Otherwise, it creates a new unknown badge.
 * @param {Object} badgeData - Unknown badge details to add or update.
 * @returns {Promise<Object>} The newly added or updated unknown badge.
 */
async function addOrUpdateUnknownBadge(badgeData) {
    try {
        const updatedBadge = await UnknownBadge.findOneAndUpdate(
            { badgeName: badgeData.badgeName }, // Match criteria (e.g., badgeName)
            { $set: badgeData }, // Update data
            { new: true, upsert: true } // Return updated badge and create if not found
        );
        return { success: true, message: 'The badge has been successfully updated.', data: updatedBadge };
    } catch (error) {
        console.error('Error adding or updating unknown badge:', error);
        throw error;
    }
}

/**
 * Delete an unknown badge by its name.
 * @param {String} badgeName - Name of the unknown badge to delete.
 * @returns {Promise<Object|null>} The deleted unknown badge or null if not found.
 */
async function deleteUnknownBadge(badgeName) {
    try {
        const deletedBadge = await UnknownBadge.findOneAndDelete({ badgeName });
        return { success: true, message: 'Badge has been successfully deleted!', data: deletedBadge };
    } catch (error) {
        console.error('Error deleting unknown badge:', error);
        throw error;
    }
}



module.exports = {
    fetchUnknownBadges,
    addOrUpdateUnknownBadge,
    deleteUnknownBadge
};
