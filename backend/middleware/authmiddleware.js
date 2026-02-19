const jwt = require('jsonwebtoken');
const Admin = require('../schema/AdminSchema')

const authmiddleware = async(req,res,next)=>{
try{
     let token =req.cookies.token; 

     if(!token){
        res.status(200).json({message:"No token, authorization denie"})
     }
     const userdata = jwt.verify(process.env.JWT_SELECT_KEY)
     const user = await Admin.findById(userdata.userId).select({password:0})
     req.user = user;
    req.token = token;
    req._id = userdata._id;


}catch(error){
    console.log(error);
    
}
}

module.exports = authmiddleware