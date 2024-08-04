// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const Arcade = require("./api")
const cors = require("cors")

app.use(express.json());
app.use(cors())
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




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
