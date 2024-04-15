import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        try {
            // extract token from authHeader string
            token = authHeader.split(" ")[1];

            // verified token returns user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // find user's obj in db and assign to req.user
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, invalid token" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token found" });
    }
};

export { protect };
