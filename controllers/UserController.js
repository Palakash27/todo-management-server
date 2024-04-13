import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const UserController = {
    registerUser: async (req, res) => {
        const { fullName, email, password } = req.body;

        // check if email exists in db
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(404);
            throw new Error("User already exists");
        }

        // create new user document in db
        const user = await User.create({ fullName, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body;

        // check if user email exists in db
        const user = await User.findOne({ email });

        // return user obj if their password matches
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                userToken: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    },

    getUserProfile: async (req, res) => {
        let user;
        if (req.params.email && req.params.email !== "undefined") {
            user = await User.findOne({ email: req.params.email });
        } else {
            // req.user was set in authMiddleware.js
            user = await User.findById(req.user._id);
        }

        if (user) {
            res.json({
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    },
};

export default UserController;
