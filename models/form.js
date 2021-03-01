const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: String,
    fields: Array
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;