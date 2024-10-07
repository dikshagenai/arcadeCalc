const Badges = require('../../../../models/Badges');

async function addUnknownBadges(badgesList) {
    try {
        if (badgesList.length === 0) return; // if nothing is in the list.

        let badgeDoc = await Badges.findOne({ type: "unknownBadges" }).select(['data', '-_id']);
        let badges = badgeDoc ? badgeDoc.toObject().data : {};

        // Create a new object to avoid mutation and potential circular references
        let newData = { ...badges };

        badgesList.forEach((badge) => {
            newData[badge] = {}; // Assign an empty object instead of a primitive value
        });

        let updatedDoc = await Badges.findOneAndUpdate(
            { type: "unknownBadges" },
            { $set: { data: newData } },
            { new: true }
        );

        console.log("Unknown Badges added to the list.");
        // console.log(updatedDoc);
    } catch (error) {
        console.log("Unable to add Unknown Badges due to the following error:");
        console.log(error);
    }
}

module.exports = addUnknownBadges;
