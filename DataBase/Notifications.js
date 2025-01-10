// Models
const Notifications = require("../models/Notifications");

// ^ To fetch all notifications
const fetchNotifications = async () => {
    try {
        const notifications = await Notifications.find().select(['-__v', '-_id'])

        // Function to parse the key and return a Date object
        function parseKey(key) {
            const [datePart, timePart] = key.split('+');
            const [month, day, year] = datePart.split('/');
            const [time, period] = timePart.split(' ');
            const [hours, minutes, seconds] = time.split(':');

            let hours24 = parseInt(hours, 10);
            if (period === 'PM' && hours24 !== 12) {
                hours24 += 12;
            } else if (period === 'AM' && hours24 === 12) {
                hours24 = 0;
            }

            return new Date(year, month - 1, day, hours24, minutes, seconds);
        }

        // Sort the notifications based on the parsed date and time in descending order
        notifications.sort((a, b) => parseKey(b.key) - parseKey(a.key));

        // res.status(200).json(notifications)
        return notifications;

    } catch (error) {
        console.error(error);
        throw `Error: ${error}`
    }
}



// Add or modify a notification
const addOrUpdateNotification = async (notificationData) => {
    const { key, imageUrl, content, redirectTo } = notificationData;

    try {
        const existingNotification = await Notifications.findOne({ key });
        if (existingNotification) {
            // Update existing notification
            existingNotification.imageUrl = imageUrl;
            existingNotification.content = content;
            existingNotification.redirectTo = redirectTo;

            await existingNotification.save();
            return { success: true, message: 'Notifications updated successfully', data: existingNotification };
        } else {
            // Add new notification
            const newNotification = new Notifications({ key, imageUrl, content, redirectTo });
            await newNotification.save();
            return { success: true, message: 'Notifications added successfully', data: newNotification };
        }
    } catch (error) {
        // return { success: false, error: error.message };
        console.log("Failed to add notification.")
        throw error;
    }
};


// Delete a notification
const deleteNotification = async (key) => {
    try {
        const deletedNotification = await Notifications.findOneAndDelete({ key });

        if (deletedNotification) {
            return { success: true, message: 'Notifications deleted successfully' };
        } else {
            return { success: false, message: 'Notifications not found' };
        }
    } catch (error) {
        console.log("Failed to delete");
        throw error;
    }
};

module.exports = {
    fetchNotifications,
    addOrUpdateNotification,
    deleteNotification,
};



