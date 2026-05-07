import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed });

  res.json(user);
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json("Invalid credentials");
  }
};
