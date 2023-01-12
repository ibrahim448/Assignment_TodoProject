const profileModel = require("../models/profileModel");
const jwt = require('jsonwebtoken');


const createProfile = (req,res)=>{
    let reqBody = req.body;
    profileModel.create(reqBody,(error,data)=>{
        if(error){
            res.status(400).json({status:"Fail",data:error})
        }
        else{
            res.status(201).json({status:"Success",data:data})
        }
    })
};

const userLogin = (req,res)=>{
   let Username = req.body['Username'];
   let Password = req.body['Password'];
   profileModel.find({Username:Username, Password: Password},(err,data)=>{
    if(err){
        res.status(400).json({status:"Fail",data:err})
    }
    else{
        if(data.length>0){
            //create auth token
            let payload = {
                exp: Math.floor(Date.now() / 1000) + (24*60 * 60),
                data: data[0]
            };
            let token = jwt.sign(payload, 'secretKey123456789');

            res.status(201).json({status:"Success",token:token,data:data[0]})
        }
        else{
            res.status(400).json({status:"unathurized"})
        }
    }
   });
   
};

const selectProfile = (req,res)=>{
    let Username = req.headers['username']
    profileModel.find({Username:Username},(err,data)=>{
     if(err){
         res.status(400).json({status:"Fail",data:err})
     }
     else{
        res.status(200).json({status:"Success",data:data})
     }
    });
    
 };

 const updateUser = (req,res)=>{
    const Username = req.headers['username'];
    const reqBody = req.body;
    profileModel.updateOne({Username:Username}, {$set:reqBody}, {upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else{
           res.status(200).json({status:"Success",data:data})
        }
    })
 }


module.exports = {createProfile, userLogin, selectProfile,updateUser}