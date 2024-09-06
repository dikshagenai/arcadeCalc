// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const Arcade = require("./workersEndPoints/calculationMain")
const cors = require("cors")
const axios = require('axios');

// const IncompleteSkillBadges = require('./workersEndPoints/IncompleteSkillBadges');
// const SkillBadgesWithImages = require('./testFiles/extractAllSkillBadgesImage') use this incase skillBadgeLinkImages json lose
const IncompleteSkillBadges = require('./workersEndPoints/incompleteSkillBadges');

app.use(express.json());
app.use(cors())

app.get('/', async (req, res) => {
    res.status(200).send("Server is Live!")
})


// ! For handling the calculation part of main application.
app.post('/calculate', async (req, res) => {
    const publicUrl = req.body.publicUrl; // Assuming you send data as JSON
    try {
        var result = await new Arcade().scrapPage(publicUrl)
        console.log(result)
        res.status(result["statusCode"]).json({ result })
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred!")
    }

});


// ! For giving out the list of skill badges with their respective link. which user haven't completed yet.
app.post('/incompleteSkillBadges', async (req, res) => {
    const publicUrl = req.body.publicUrl; // Assuming you send data as JSON
    try {
        var result = await new IncompleteSkillBadges().scrapPage(publicUrl)
        console.log(result)
        // res.status(result["statusCode"]).json({ result })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred!")
    }

});


// // ! use this incase you lost skill badge images to get back all data
// app.post('/test', async (req, res) => {
//     try {
//         var result = await new SkillBadgesWithImages().main()
//         console.log(result)
//         // res.status(result["statusCode"]).json({ result })
//         res.status(200).json({ result })
//     } catch (error) {
//         res.status(500).send(error.message)
//     }

// });





















// * Reload the website every 5 minutes. Replace with your Render URL.
const url = `https://arcadecalc.onrender.com`; // Replace with your Render URL
const interval = 300000; // Interval in milliseconds (5 minutes)

//Reloader Function
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
