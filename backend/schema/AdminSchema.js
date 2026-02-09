const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const AdminSchema = new mongoose.Schema({
   
  username: { 
    type: String,
    required: true,
     unique: true 
    },
  email: {
    type: String, 
    required: true,
     unique: true 
    },
  password: { 
    type: String, 
    required: true },
  role: { 
    type: String, 
    default: "admin" } 
});



AdminSchema.pre('save',async function(next) {
    try{
        const admin =this
        if(!admin.isModified('password')){
            return 
        }

        const salt = await bcrypt.genSalt(10)
        const hash =  await  bcrypt.hash(admin.password,salt)
        admin.password =hash

       
    }catch(error){
     console.log(error);
     
    }
    
})
AdminSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
}



AdminSchema.methods.generateToken=async function() {
    try{
          return jwt.sign({
      userId: this._id,
      email: this.email,
       role: this.role
    },process.env.JWT_SELECT_KEY,{
      expiresIn: '30d'
    }
  
   )
    }catch(error){
   console.log(error);
   
    }
}

const Admin = mongoose.model("dmin", AdminSchema);
module.exports = Admin;