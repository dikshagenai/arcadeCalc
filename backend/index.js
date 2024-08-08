// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const Arcade = require("./api")
const cors = require("cors")
const axios = require('axios');


app.use(express.json());
app.use(cors())

app.get('/', async (req, res) => {
    res.status(200).send("Server is Live!")
})


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

const url = `https://arcadecalc.onrender.com`; // Replace with your Render URL
const interval = 60000; // Interval in milliseconds (1 minute)

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
