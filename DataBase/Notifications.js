// Models
const Notifications = require("../models/Notifications");

const fetchNotifications = async () => {
    try {
        const notifications = await Notifications.find()
            .select(['-__v', '-_id'])
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order (LIFO)

        return notifications;
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching notifications: ${error.message}`);
    }
};



// Add a notification
const addNotifications = async (notificationData) => {
    const { imageUrl, content, redirectTo } = notificationData;

    try {
        // Create new notification (key is automatically generated in the schema)
        const newNotification = new Notifications({ imageUrl, content, redirectTo });
        await newNotification.save();

        return { success: true, message: 'Notification added successfully', data: newNotification };
    } catch (error) {
        throw error;
    }
};

const updateNotification = async (data) => {
    const { key, imageUrl, content, redirectTo } = data;

    try {
        // Find the notification by key
        const notification = await Notifications.findOne({ key });

        if (!notification) {
            return { success: false, message: "Notification not found." };
        }

        // Update all values
        notification.imageUrl = imageUrl;
        notification.content = content;
        notification.redirectTo = redirectTo;

        // Save back to the database
        await notification.save();

        return { success: true, message: "Notification updated successfully.", data: notification };
    } catch (error) {
        console.error("Error updating notification:", error);
        return { success: false, message: "Error updating notification.", error: error.message };
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
        throw error;
    }
};

module.exports = {
    fetchNotifications,
    addNotifications,
    updateNotification,
    deleteNotification,
};



