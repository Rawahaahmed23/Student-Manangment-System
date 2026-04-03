const bcrypt = require("bcrypt");
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

// Login 
const Login = async (req, res) => {
  try {
    const { username, password, rememberMe } = req.body;

    const exists = await Admin.findOne({ username });
    if (!exists) {
      return res.status(400).json({ message: "User unauthorized" });
    }

    const compare = await exists.comparePassword(password);
    if (!compare) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const token = await exists.generateToken();

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", 
  maxAge: rememberMe
    ? 7 * 24 * 60 * 60 * 1000
    : 24 * 60 * 60 * 1000
});

    res.status(200).json({
      message: "Login Successfully",
      userId: exists._id.toString(),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Logout 

const Logout = async(req,res)=>{
    try{
  res.clearCookie('token', {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
});
    return res.status(200).json({message:"Logout suceesful"})
    }catch(error){
      return  res.status(500).jsonn({message:error})
    }
}



// sendOtp
const sendOtp = async(req,res)=>{
   try{
     const {email} = req.body
     const userid = await Admin.findOne({email})
     if(!userid){
        res.status(400).json({message:"User does not exsist"})
     }
 

const otp = Math.floor(100000 + Math.random() * 900000).toString();

userid.resetOtp = otp;
userid.resetOtpExpire = Date.now() + 10 * 60 * 1000; 
await userid.save();

await transporter.sendMail({
  from: process.env.Sender_Email,
  to: email,
  subject: "Password Reset OTP",
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
        
        <h2 style="color: #333; text-align: center;">
          Password Reset Request
        </h2>

        <p style="font-size: 16px; color: #555;">
          We received a request to reset your password.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 12px 25px;
            font-size: 22px;
            letter-spacing: 4px;
            border-radius: 6px;
          ">
            ${otp}
          </span>
        </div>

        <p style="font-size: 14px; color: #777;">
          This OTP is valid for 10 minutes.
        </p>

        <p style="font-size: 14px; color: #777;">
          If you didn’t request this, please ignore this email.
        </p>

      </div>
    </div>
  `
});
res.status(200).json({message:"otp send sucessfuly"})
}catch(error){
    console.log(error);
    
   }
}


// Verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.resetOtp === '' || user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.resetOtpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    return res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


// Forgot passowrd 
const ResetPassword = async(req, res) => {
  const { email, otp, newpassword } = req.body;

  if (!email || !newpassword || !otp) {
    return res.status(400).json({ message: 'Email, OTP, New password are required' });
  }

  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.resetOtp === '' || user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.resetOtpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ✅ Plain text do — hook khud hash karega
    user.password = newpassword;
    user.resetOtp = '';
    user.resetOtpExpire = 0;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const user = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const getuser = await Admin.findById(loggedInUser._id).select("-password");
  
    res.status(200).json({ user: getuser });
  } catch (error) {
    console.error("User route error:", error);
    res.status(500).json({ message: "Server error" });
  }
};






module.exports ={Singup,Login,Logout,sendOtp,ResetPassword,user,verifyOtp}