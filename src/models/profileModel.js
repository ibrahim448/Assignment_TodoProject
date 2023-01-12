const mongoose = require("mongoose");

const dataScema = mongoose.Schema({
    Firstname:{type: String},
    Lastname:{type: String},
    Mobile:{type: String},
    Email:{type: String},
    Username:{type: String, unique:true},
    Password:{type: String}
}, {versionKey: false});

const profileModel = mongoose.model("profiles", dataScema);

module.exports = profileModel;