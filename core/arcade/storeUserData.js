
// MongoDB: Database Models.
const User = require('../../models/Users')

const storeUserData = async (userData) => {
    // code will come here
    // * Adding data in my database
    try {
        // Remove the existing entry if it exists
        await User.findOneAndDelete({ id: userData['id'] });

        // Add the new entry
        var user = await User.findOneAndUpdate(
            { id: userData['id'] },
            userData,
            { upsert: true, new: true }
        );
        console.log("User has been successfully updated!");
        console.log(user);
    } catch (error) {
        console.error(error);
        console.log("An error occurred while adding data to my database.");
    }

}

module.exports = storeUserData;