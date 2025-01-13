const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Use JWT_SECRET from .env file
    req.user = verified; // Store user info from token in the request object
    // console.log("User verified:", verified);
    next(); // Continue to the next middleware/route handler
  } catch (err) {
    res.status(403).json({ error: "Invalid token." });
  }
};

module.exports = authenticateToken;
