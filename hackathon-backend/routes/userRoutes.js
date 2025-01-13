const express = require("express");
const {
  register,
  login,
  logout,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
} = require("../controllers/userController");
const router = express.Router();
const authenticateAdmin = require("../midddleware/authenticateAdmin");

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/users", authenticateAdmin, getAllUsers);
router.delete("/users/:id", authenticateAdmin, deleteUser); // Delete a user by ID
router.put("/users/:id", authenticateAdmin, updateUser); // Update a user by ID
router.get("/users/:id", getUserById);

module.exports = router;
