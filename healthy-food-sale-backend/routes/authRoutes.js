import express from "express";
import { login, register } from "../controllers/authController.js";

const authRoutes = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new admin user
 * @access  Public (you can later restrict this)
 */
authRoutes.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    Login admin user & return JWT token
 * @access  Public
 */
authRoutes.post("/login", login);

export default authRoutes;
