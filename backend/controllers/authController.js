const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    // Check if user already exists
    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser  = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser .save();  

    // Respond with success
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;

    //validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "PLease fill all the details carefully",
      });
    }

    //check for registered user
    let user = await User.findOne({ email });
    //if not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    // Compare provided password with hashed password stored
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
    // Prepare token payload
    const payload = {
      email: user.email,
      id: user._id,
    };
    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      token,
      user,
      message: "User Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};


exports.logout = (req, res) => {
  try {
    // Clear the token from the cookie (if using cookies)
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiration to the past
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    });
    // Respond with success message
    res.status(200).json({
      success: true,
      message: "User  logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during logout",
    });
  }
};