const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const authMiddleware = async (req, res, next) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.authToken;
        // console.log("token is ",token);
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded information (userId, etc.) to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token. Please log in again." });
    }
};

module.exports = {authMiddleware};