
const Admin = require('../schema/AdminSchema')
const transporter = require('../nodemailer/nodemailer')


const Singup = async(req,res)=>{
 try{
   const{username,email,password} = req.body
   const userExist = await Admin.findOne({
    $or: [
        { email },
        { username }
    ]
});

 if (userExist) {
    if (userExist.username === username) {
        return res.status(400).json({ message: "Username already exists" });
    }
    if (userExist.email === email) {
        return res.status(400).json({ message: "Email already exists" });
    }
}
   const create = await Admin.create({
       username,
       email,
       password

   }
 )
const mailOption= {
    from : process.env.Sender_Email,
    to: email,
    subject:'Welcome to the Software',
    text: `Your account has been create with id: ${email}`
}
await transporter.sendMail(mailOption)

 res.status(200).json({
    message:"registred Sucessful",
    token: await create.generateToken(),
    userid: create._id.toString()
 })
 


 }catch(error){
    console.log(error);
    
 }
}


const Login = async(req,res)=>{
    try{

        const {username,password} = req.body
        const exists =await  Admin.findOne({username})
        if(!exists){
          return res.status(400).json({message:"User unauthroized"})
        }
        const compare = await exists.comparePassword(password)
        if(!compare){
            res.status(400).json({message:'Incorrect email Passsword'})
        }
 const token = await exists.generateToken();
 res.cookie("token", token, {
  httpOnly: true,
  secure: true,        
  sameSite: "None", 
  maxAge:7*24*60*60*1000    
  
});
     res.status(200).json(
        {message: 'Login Sucessfuly',
        userId: exists._id.toString(),

        })
    }catch(error){
        res.status(500).jsonn({message:error})
        
    }
  


}

const Logout = async(req,res)=>{
    try{
    res.clearCookie('token',{
         httpOnly: true,
  secure: true,        
  sameSite: "None", 
  
    })
    return res.status(200).json({message:"Logout suceesful"})
    }catch(error){
      return  res.status(500).jsonn({message:error})
    }
}

module.exports ={Singup,Login,Logout}