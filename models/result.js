const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    result: Array
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;