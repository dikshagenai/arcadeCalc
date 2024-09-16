const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const Arcade = require("./workersEndPoints/calculationMain");
const cors = require("cors");
const axios = require('axios');


// database
const Database = "https://arcadecalc-backend-2.onrender.com"

const IncompleteSkillBadges = require('./workersEndPoints/incompleteSkillBadges');

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.status(200).send("Server is Live!");
});

// ! For handling the calculation part of main application.
app.post('/calculate', async (req, res) => {
    const publicUrl = req.body.publicUrl; // Assuming you send data as JSON

    // ^ INCREMENTING USER IN SERVER
    try {
        fetch(`${Database}/api/users/incrementUser`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
    } catch (error) {
        console.log(error.message);
    }


    try {
        var result = await new Arcade().scrapPage(publicUrl);
        console.log(result);
        res.status(result["statusCode"]).json({ result });
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred!");
    }
});

// ! For giving out the list of skill badges with their respective link. which user haven't completed yet.
app.post('/incompleteSkillBadges', async (req, res) => {
    const publicUrl = req.body.publicUrl; // Assuming you send data as JSON
    try {
        var result = await new IncompleteSkillBadges().scrapPage(publicUrl);
        console.log(result);
        // res.status(result["statusCode"]).json({ result })
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred!");
    }
});

// ! For giving out the notification from the file present.
app.post('/notifications', async (req, res) => {

    // ^ INCREMENTING USER IN SERVER
    try {
        var response = await fetch(`${Database}/api/notifications/getNotifications`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

        if (response.statusCode === 200) {
            var notificationsFromDB = await response.json();
            res.status(200).json(notificationsFromDB);
        }
        else {
            res.status(403).json({ error: "Failed to fetch data" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error Occurred!" });
    }

});

// New endpoint to handle contact form submissions
app.post('/contact', (req, res) => {
    const { email, query } = req.body;
    if (!email || !query) {
        return res.status(400).send("Email and query are required.");
    }

    const dateTime = new Date().toISOString();
    const newEntry = { [dateTime]: [email, query] };

    const filePath = path.join(__dirname, 'requiredFiles', 'contactDetails.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send("Internal Server Error Occurred!");
        }

        const jsonData = data ? JSON.parse(data) : {};
        Object.assign(jsonData, newEntry);

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Internal Server Error Occurred!");
            }
            res.status(200).send("Contact details saved successfully.");
        });
    });
});

// New endpoint to retrieve contact data
app.get('/contactData', (req, res) => {
    const filePath = path.join(__dirname, 'requiredFiles', 'contactDetails.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(200).json({});
            }
            return res.status(500).send("Internal Server Error Occurred!");
        }

        const jsonData = data ? JSON.parse(data) : {};
        res.status(200).json(jsonData);
    });
});

// * Reload the website every 5 minutes. Replace with your Render URL.
const url = `https://arcadecalc.onrender.com`; // Replace with your Render URL
const interval = 300000; // Interval in milliseconds (5 minutes)

// Reloader Function
function reloadWebsite() {
    axios.get(url)
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
