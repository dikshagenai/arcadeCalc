// * Imports
const express = require('express');
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const axios = require('axios');

// * Files
const SERVER = require('./buildTime')

// * Database Connection
const connectToMongo = require('./db');
connectToMongo();


// * Starting Server!
const app = express();
app.use(express.json());
app.use(cors());





// ! Routes

// ^ Indicate Server is Live!
app.get('/', async (req, res) => {
    res.status(200).send("Server is Live!");
});


// ^ For calculating points
app.use('/calculate', require('./routes/NoAuthRequired/calculate'));

// ^ For Incomplete Skill Badges.
app.use('/incompleteSkillBadges', require('./routes/NoAuthRequired/incompleteSkillBadges'));



// ! API BASED REQUESTS.
// & For storing Users and Notifications.
app.use("/api/users", require("./routes/NoAuthRequired/users.js"));
app.use("/api/notifications", require("./routes/NoAuthRequired/notifications.js"));

// & For storing responses of the contact page.
app.use("/api/contact", require("./routes/NoAuthRequired/contact.js"));


// & For Admin
app.use("/admin", require("./routes/AuthRequired/admin.js")); // used for login
app.use("/admin/users", require("./routes/AuthRequired/users")) // used for fetching users.
app.use("/admin/contact", require("./routes/AuthRequired/contact.js"))
app.use("/admin/notifications", require("./routes/AuthRequired/notifications.js"))






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
