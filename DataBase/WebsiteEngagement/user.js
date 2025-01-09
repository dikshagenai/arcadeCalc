const UsersEngagement = require("../../models/Users");
const UsersCount = require("../../models/UsersCount");

// -------------- Users Engagement --------------
async function UpdateUsersEngagement(data) {
    try {
        UsersEngagement.findOneAndUpdate({ id: data.id }, data,
            { upsert: true, new: true }
        );
        res.send("User successfully updated!");
    } catch (error) {
        console.log('Error Updating the user in the database.')
        throw error;
    }
}

async function updateRanks() {
    try {
        // Fetch all users sorted by points, including those with rank -1
        const users = await UsersEngagement.find({}).sort({ points: -1 });

        // Assign ranks to all users
        for (let i = 0; i < users.length; i++) {
            users[i].rank = i + 1; // Rank starts from 1
            await users[i].save();
        }

        console.log('Ranks updated successfully.');
    } catch (error) {
        console.error('Error updating ranks:', error);
    }
}


async function getLeaderboardAndUser(userId) {
    try {
        // Fetch the top 10 users, excluding those with rank -1
        const topUsers = await UsersEngagement.find({ rank: { $ne: -1 } }).sort({ rank: 1 }).limit(10);

        // Fetch the current user by ID
        const currentUser = await UsersEngagement.findOne({ id: userId });

        // Include current user only if their rank is valid
        const currentUserData = currentUser && currentUser.rank !== -1
            ? { ...currentUser.toObject() }
            : null;

        return {
            success: true,
            topUsers,
            currentUser: currentUserData
        };
    } catch (error) {
        console.error('Error fetching leaderboard and user:', error);
        return { success: false, error: 'Server Error' };
    }
}


// -------------- Users Count --------------

// ! To increment the user count... (overall main searches)
async function incrementUniqueUsers() {
    try {
        // Check if a record exists
        const entries = await UsersCount.findOne();

        if (!entries) {
            // Create a new record if none exists
            await UsersCount.create({ uniqueUsers: 1 });
        } else {
            // Increment the uniqueUsers field
            await UsersCount.findOneAndUpdate({}, { $inc: { uniqueUsers: 1 } }, { new: true });
        }
        return { success: true, message: "Unique users successfully incremented!" };
    } catch (error) {
        throw new Error(`Error incrementing unique users: ${error.message}`);
    }
}

// ! To increment the user count... (dashboard searches...)
async function incrementDashboardSearches() {
    // try {
    //     // Check if a record exists
    //     const entries = await UsersCount.findOne();

    //     if (!entries) {
    //         // Create a new record if none exists
    //         await UsersCount.create({ dashboardSearches: 1 });
    //     } else {
    //         // Increment the dashboardSearches field
    //         await UsersCount.findOneAndUpdate({}, { $inc: { dashboardSearches: 1 } }, { new: true });
    //     }
    //     return { success: true, message: "Dashboard searches successfully incremented!" };
    // } catch (error) {
    //     throw new Error(`Error incrementing dashboard searches: ${error.message}`);
    // }

    try {
        // Endpoint to increment totalVisitedUsers
        var entries = await UsersCount.findOne();
        if (!entries) {
            await UsersCount.create({ dashboardSearches: 1, updates: [{ timestamp: new Date(), count: 1 }] });
        } else {
            await UsersCount.findOneAndUpdate(
                {},
                {
                    $inc: { dashboardSearches: 1 },
                    $push: { updates: { timestamp: new Date(), count: 1 } }
                },
                { new: true }
            );
        }

        console.log("User successfully incremented!");
        return { success: true, message: "Dashboard searches successfully incremented!" };
    } catch (error) {
        console.log("Failed to increment user.");
    }
}



// ------------------ COUNT USERS ----------------
async function countUniqueUsers() {
    try {
        // Retrieve the uniqueUsers count from the database
        const result = await UsersCount.findOne().select(['uniqueUsers', '-_id']);
        if (!result) {
            throw new Error("No data found for unique users.");
        }
        return { success: true, amountOfUsers: result.uniqueUsers };
    } catch (error) {
        throw new Error(`Error counting unique users: ${error.message}`);
    }
}


// ~ Count the dashboard users...
async function countDashboardUsers() {
    try {
        // Retrieve the dashboardSearches count from the database
        const result = await UsersCount.findOne().select(['dashboardSearches', '-_id']);
        if (!result) {
            throw new Error("No data found for dashboard searches.");
        }
        return { success: true, amountOfUsers: result.dashboardSearches };
    } catch (error) {
        throw new Error(`Error counting dashboard searches: ${error.message}`);
    }
}


module.exports = { UpdateUsersEngagement, updateRanks, getLeaderboardAndUser, incrementUniqueUsers, incrementDashboardSearches, countUniqueUsers, countDashboardUsers };