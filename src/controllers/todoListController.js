const todoModel = require("../models/todoModel");


const createTodo = (req,res)=>{
    const Username = req.headers['username'];
    const reqBody = req.body;
    const todoSubject = req.body['todoSubject'];
    const todoDescription = req.body['todoDescription'];
    const todoStatus = "New";
    const todoCreateDate = Date.now();
    const todoUpdateDate = Date.now();

    const postBody ={
        Username:Username,
        todoSubject:todoSubject,
        todoDescription:todoDescription,
        todoStatus:todoStatus,
        todoCreateDate:todoCreateDate,
        todoUpdateDate:todoUpdateDate
    }

    todoModel.create(postBody,(err,data)=>{

        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else{
            res.status(201).json({status:"Success",data:data})
        }
    })
};

const selectTodo = (req,res)=>{
    const Username = req.headers['username'];

    todoModel.find({Username:Username},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
};

const updateTodo = (req,res)=>{
    const _id = req.body['_id'];
    const todoSubject = req.body['todoSubject'];
    const todoDescription = req.body['todoDescription'];
    const todoUpdateDate = Date.now();

    const postBody = {
        todoSubject:todoSubject,
        todoDescription:todoDescription,
        todoUpdateDate:todoUpdateDate
    };

    todoModel.updateOne({_id:_id},{$set:postBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
};

const updateStatus = (req,res)=>{
    const _id = req.body['_id'];
    const todoStatus = req.body['todoStatus'];
    const todoUpdateDate = Date.now();

    const postBody = {
        todoStatus:todoStatus,
        todoUpdateDate:todoUpdateDate
    };
    todoModel.updateOne({_id:_id},{$set:postBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
};

const removeTodo = (req,res)=>{
    const _id = req.body['_id'];

    todoModel.remove({_id:_id},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
};

const selectTodoStatus = (req,res)=>{
    const Username = req.headers['username'];
    const todoStatus = req.body['todoStatus'];

    todoModel.find({Username:Username,todoStatus:todoStatus},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
};

const selectTodoByDate = (req,res)=>{
    const Username = req.headers['username'];
    const FromDate = req.body['FromDate'];
    const ToDate = req.body['ToDate'];

    todoModel.find({Username:Username,todoCreateDate:{$gte:new Date(FromDate),$lte:new Date(ToDate)}},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
};


module.exports = {createTodo,selectTodo,updateTodo,updateStatus,removeTodo,selectTodoStatus,selectTodoByDate};