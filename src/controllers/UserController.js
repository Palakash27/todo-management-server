import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const UserController = {
    registerUser: async (req, res) => {
        try {
            const { fullName, email, password, username } = req.body;

            // check if email exists in db
            const userExists = await User.findOne({ email });

            if (userExists) {
                res.status(404).json({
                    message: `User with email(${email}) already exists`,
                });
            }

            // create new user document in db
            const user = await User.create({
                fullName,
                email,
                password,
                username,
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    username: user.username,
                });
            } else {
                res.status(400).json({ message: "Invalid user data" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            // check if user email or username exists in db
            const user = await User.findOne({
                $or: [{ email }, { username: email }],
            });

            // return user obj if their password matches
            if (user && (await user.matchPassword(password))) {
                req.loggedInUser = user;
                res.status(200).json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    username: user.username,
                    avatar: user.avatar,
                    userToken: generateToken(user._id),
                });
            } else {
                res.status(401).json({
                    message: "Invalid username/email or password",
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserProfile: async (req, res) => {
        try {
            let user;
            if (req.params.username && req.params.username !== "undefined") {
                user = await User.findOne({ username: req.params.username });
            } else {
                // req.user was set in authMiddleware.js
                user = await User.findById(req.user._id);
            }

            if (user) {
                res.status(200).json({
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    username: user.username,
                    avatar: user.avatar,
                });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateProfilePicture: async (req, res) => {
        try {
            const { avatar } = req.body;
            let updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { avatar },
                { new: true }
            );
            if (!updatedUser) {
                res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteUserProfile: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                await user.remove();
                res.status(202).json({ message: "User removed" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default UserController;
