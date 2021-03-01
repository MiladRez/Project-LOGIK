const express = require("express");
const app = express();

require('dotenv').config();

app.get("/api/", (req, res) => {
    res.json({
        "data": ["random", "data"]
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});