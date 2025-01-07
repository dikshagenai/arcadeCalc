const Badges = require('../../models/badges/GameBadges');


// Fetch all badges sorted by badgeType
async function fetchBadges() {
    try {
        // Fetch all badges from the database and sort them by badgeType
        const badges = await Badges.find().sort({ badgeType: 1 }).select(['-__v', '-_id']); // 1 for ascending order
        return { success: true, message: 'Badges fetched and sorted successfully!', data: badges };
    } catch (error) {
        console.error('Error fetching and sorting badges:', error);
        return { success: false, message: error.message }
    }
}

// Add a new badge or update an existing one
async function addBadge(badgeData) {
    try {
        // Use `findOneAndUpdate` with upsert to add or update the badge
        const updatedBadge = await Badges.findOneAndUpdate(
            { badgeName: badgeData.badgeName.trim() }, // Match criteria (e.g., badgeName)
            { $set: badgeData }, // Data to update or insert
            { new: true, upsert: true } // Options: return the updated document and create if it doesn't exist
        );
        return { success: true, message: 'Badge has been successfully added.', data: updatedBadge };
    } catch (error) {
        console.error('Error adding or updating badge:', error);
        return { success: false, message: error.message }
    }
}

// Delete a badge by its badgeName
async function deleteBadge(badgeName) {
    try {
        // Use `findOneAndDelete` to delete a badge by its badgeName
        const deletedBadge = await Badges.findOneAndDelete({ badgeName: badgeName.trim() });

        // If the badge doesn't exist, return null
        if (!deletedBadge) {
            return { success: false, message: 'No badge with name ' + badgeName + ' exists.' };
        }
        return { success: true, message: 'Badge has been successfully deleted.', data: deletedBadge };
    } catch (error) {
        console.error('Error deleting badge:', error);
        return { success: false, message: error.message }
    }
}


module.exports = { fetchBadges, addBadge, deleteBadge };
