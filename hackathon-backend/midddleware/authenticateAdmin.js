const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); 
    // console.log("User verified:", verified);
    // console.log("Role:", verified.role);
    if(verified.role === "member") {
        return res.status(403).json({ error: "Access denied. Admin only." });
    }
    req.user = verified;
    next(); // Continue to the next middleware/route handler
  } catch (err) {
    res.status(403).json({ error: "Invalid token." });
  }
};

module.exports = authenticateAdmin;
