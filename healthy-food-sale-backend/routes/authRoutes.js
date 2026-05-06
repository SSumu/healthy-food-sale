import express from "express";
import { login, register } from "../controllers/authController";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new admin user
 * @access  Public (you can later restrict this)
 */
router.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    Login admin user & return JWT token
 * @access  Public
 */
router.post("/login", login);

export default router;
