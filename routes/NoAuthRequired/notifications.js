const express = require("express");
const router = express.Router();



// Models
const Notifications = require("../../models/Notifications");


// ^ To fetch all notifications
router.get('/getNotifications', async (req, res) => {
    try {
        const notifications = await Notifications.find().select(['-__v'])

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

        res.status(200).json(notifications)

    } catch (error) {
        res.status(500).json({ Message: "Error getting notifications", Error: error.message })
    }
})





module.exports = router;