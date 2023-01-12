const mongoose = require("mongoose");

const dataScema = mongoose.Schema({

    Username:{type:String},
    todoSubject:{type:String},
    todoDescription:{type:String},
    todoStatus:{type:String},
    todoCreateDate:{type:Date},
    todoUpdateDate:{type:Date},

},{versionKey:false});


const todoModel = mongoose.model("todoLists", dataScema);

module.exports = todoModel;