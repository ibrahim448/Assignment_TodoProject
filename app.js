//Basic Library Import
const express = require("express");
require("dotenv").config();
const app = express();
const router = require("./src/routes/api");

//Security Middleware Library Import
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

//Database Library Import
const mongoose = require('mongoose');

//Security Middleware Library Implement
app.use(cors())
app.use(hpp())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())

//Body Parser Implement
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Request Rate Limit
const limiter = rateLimit({ windowMs: 15*60*1000, max: 3000});
app.use(limiter);

//Mongo DB Connect
// const URL = "mongodb://localhost:27017/todoProject"
const OPTION = {user:"", pass:"", autoIndex: true};

mongoose
.connect(process.env.DATABASE,OPTION)
.then(()=> console.log("DB Connect"))
.catch((error)=> console.log(error))

//Routing Implement
app.use("/api/v1", router)

//Routing Error handle
app.use("*",(req,res)=>{
    res.status(404).json({status:"Fail",data:"Not Found"})
});

//Server Error handle
app.use((error,req,res)=>{
    res.status(401).json({status:"Fail",data:"Server Broken"})
});



module.exports = app;