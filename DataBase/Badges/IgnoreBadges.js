const Badges = require('../../models/badges/IgnoreBadges');

// Fetch all skill badges sorted by badgeType
async function fetchBadges() {
    try {
        // Fetch all skill badges from the database and sort them by badgeType
        const badges = await Badges.find().sort({ badgeName: 1 }).select(['-__v', '-_id']); // 1 for ascending order
        return { success: true, message: 'Badges fetched and sorted successfully!', data: badges };
    } catch (error) {
        console.error('Error fetching and badges:', error);
        throw error;
    }
}

// Add a new skill badge or update an existing one
async function addBadge(badgeData) {
    try {
        // Use findOneAndUpdate with upsert to add or update the skill badge
        const updatedBadge = await Badges.findOneAndUpdate(
            { badgeName: badgeData.badgeName.trim() }, // Match criteria (e.g., badgeName)
            { $set: badgeData }, // Data to update or insert
            { new: true, upsert: true } // Options: return the updated document and create if it doesn't exist
        );
        return { success: true, message: 'Badge has been successfully added/updated.', data: updatedBadge };
    } catch (error) {
        console.error('Error adding or updating skill badge:', error);
        throw error;
    }
}

// Delete a skill badge by its badgeName
async function deleteBadge(badgeName) {
    try {
        // Use findOneAndDelete to delete a skill badge by its badgeName
        const deletedBadge = await Badges.findOneAndDelete({ badgeName: badgeName.trim() });

        // If the skill badge doesn't exist, return null
        if (!deletedBadge) {
            return { success: false, message: 'No skill badge with name ' + badgeName + ' exists.' };
        }
        return { success: true, message: 'Skill badge has been successfully deleted.', data: deletedBadge };
    } catch (error) {
        console.error('Error deleting skill badge:', error);
        throw error;
    }
}

module.exports = { fetchBadges, addBadge, deleteBadge };
