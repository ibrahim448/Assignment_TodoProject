const jwt = require('jsonwebtoken');


module.exports = (req,res,next)=>{
    let token = req.headers['token-key'];
    jwt.verify(token,'secretKey123456789', (error,decoded)=>{
        if(error){
            res.status(400).json({status:"unathurized"})
        }
        else{
            //get user name from decoded
            let username = decoded['data']['Username'];
            req.headers.username = username;
            next();
        }
    })
};