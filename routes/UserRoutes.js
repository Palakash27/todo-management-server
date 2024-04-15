import express from "express";
import UserController from "../controllers/UserController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /register - Create a new user
router.post("/register", UserController.registerUser);

// POST /login - Login user
router.post("/login", UserController.loginUser);

// GET /profile - Get user profile
router.route("/profile").get(protect, UserController.getUserProfile);

// GET /profile/:username - Get user profile with username
router.route("/profile/:username").get(protect, UserController.getUserProfile);

export default router;