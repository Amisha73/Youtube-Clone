const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticate = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    console.log("Received token:", token); // Log the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Log the decoded token
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log the error
    return res.status(401).json({ error: "Invalid token" });
  }
};
