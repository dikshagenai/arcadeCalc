// * Imports
const express = require('express');
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const axios = require('axios');

// * Update Ranks
const { updateRanks } = require('./DataBase/WebsiteEngagement/user.js');


// * Files
const SERVER = require('./buildTime')

// * Database Connection
const connectToMongo = require('./db');
connectToMongo();


// * Starting Server!
const app = express();
app.use(express.json());


// Define allowed origin
const allowedOrigins = [
    'http://localhost:3000', // development
    'https://arcadecalc.netlify.app' // production
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests from the specified origins or block them
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include credentials if needed (e.g., cookies)
};
// Apply CORS with the specified options
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({ error: 'Access denied!' });
    } else {
        next(err);
    }
});




// ! Routes

// ^ Indicate Server is Live!
app.get('/', async (req, res) => {
    res.status(200).send("Server is Live!");
});


// ^ For calculating points
// app.use('/calculate', require('./routes/NoAuthRequired/calculate'));

// ^ For Incomplete Skill Badges.
// app.use('/incompleteSkillBadges', require('./routes/NoAuthRequired/incompleteSkillBadges'));



// ! API BASED REQUESTS.
// & For storing Users and Notifications.
// app.use("/api/users", require("./routes/NoAuthRequired/users.js"));
// app.use("/api/notifications", require("./routes/NoAuthRequired/notifications.js"));

// & For storing responses of the contact page.
// app.use("/api/contact", require("./routes/NoAuthRequired/contact.js"));

// & For fetching badges.
// app.use("/api/badges", require("./routes/BasicEndPoints/extractBadgesFromDB.js"))

// & For Admin
// app.use("/admin/users", require("./routes/AuthRequired/users")) // used for fetching users.
// app.use("/admin/contact", require("./routes/AuthRequired/contact.js"))
// app.use("/admin/notifications", require("./routes/AuthRequired/notifications.js"))

// ----------------------------------- NEW
// & Badges
app.use("/api/skillBadges", require("./routes/Badges/SkillBadges.js"));
app.use("/api/gameBadges", require("./routes/Badges/GameBadges.js"));
app.use("/api/unknownBadges", require("./routes/Badges/UnknownBadges.js"));
app.use("/api/ignoreBadges", require("./routes/Badges/IgnoreBadges.js"));

// & Notifications and Users count
app.use("/api/notifications", require("./routes/Admin/notifications.js"));
app.use("/api/usersData", require("./routes/UserEngagement/engagement.js"));
app.use("/api/analytics", require("./routes/UserEngagement/users.js"));

// & Main calculation part
app.use("/api/analyzeProfile", require("./routes/Calc/arcade.js"))
app.use("/api/leaderboard", require("./routes/Calc/leaderboard.js"))

// & Admin 
app.use("/api/admin/auth", require("./routes/Admin/AdminLogin")); // used for login
app.use("/api/admin", require("./routes/Admin/handleIncompleteBadges.js"))




// & Test
app.use("/api/test", require("./routes/test/checkingFunctions.js"));


// * Updates rank every 10 minutes.
setInterval(updateRanks, 10 * 60 * 1000); // Update every 10 minutes
// updateRanks();


// * Reload the website every 5 minutes. Replace with your Render URL.
const interval = 300000; // Interval in milliseconds (5 minutes)
// Reloader Function
function reloadWebsite() {
    axios.get(SERVER)
        .then(response => {
            console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
        })
        .catch(error => {
            console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
        });
}
setInterval(reloadWebsite, interval);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
