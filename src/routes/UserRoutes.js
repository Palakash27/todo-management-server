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

// patch /profile/:id - Update user profile picture with id
router
    .route("/profile/:id")
    .patch(protect, UserController.updateProfilePicture);

// DELETE /profile - Delte user profile
router
    .route("/profile/:id/delete")
    .delete(protect, UserController.deleteUserProfile);

export default router;
