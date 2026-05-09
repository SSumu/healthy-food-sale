import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc Register new user
// @route POST /api/auth/register
// @access Public
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Please provide username and password",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Please provide username and password",
      });
    }

    // Find user
    const user = await User.findOne({ username });

    // Check password
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        message: "Login successful",
        token: generateToken(user._id),
        user: {
          id: user._id,
          username: user.username,
        },
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// export const register = async (req, res) => {
//   const { username, password } = req.body;

//   const hashed = await bcrypt.hash(password, 10);
//   const user = await User.create({ username, password: hashed });

//   res.json(user);
// };

// export const login = async (req, res) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({ username });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401).json("Invalid credentials");
//   }
// };
