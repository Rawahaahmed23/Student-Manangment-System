const jwt = require("jsonwebtoken");
const Admin = require("../schema/AdminSchema");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const userdata = jwt.verify(token, process.env.JWT_SELECT_KEY);

    const user = await Admin.findById(userdata.userId).select({ password: 0 });

    // ✅ User null check
    if (!user) {
      return res.status(401).json({ message: "User not found, authorization denied" });
    }

    req.user = user;
    req.token = token;
    req._id = userdata.userId;  // ✅ userId use karo, _id nahi

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;