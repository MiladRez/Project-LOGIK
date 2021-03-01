const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const bodyParser = require('body-parser')

const Form = require("./models/form");
const Result = require("./models/result");

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
        console.log(err);
    })

app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/", (req, res) => {
    res.json({
        "data": ["random", "data"]
    });
});

app.get("/form/:title", (req, res) => {

    Form.findOne({title: req.params.title}).then(form => {
        res.json(form);
    });
});

app.get("/allForms", (req, res) => {
    Form.find({}).then(form => {
        res.json(form);
    });
});

app.post("/sendData/", bodyParser.json(), (req, res) => {
    const result = req.body;

    var newResult = new Result({
        result: result
    });

    newResult.save();
})

app.post("/addForm/", bodyParser.json(), (req, res) => {
    const listOfFields = req.body;

    console.log(listOfFields);

    var newForm = new Form({
        title: listOfFields.title,
        fields: listOfFields.fields
    });

    newForm.save();
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});