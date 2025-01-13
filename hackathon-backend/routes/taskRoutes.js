const express = require("express");
const router = express.Router();
const authenticateToken = require("../midddleware/authenticateToken"); // Corrected path

const {
  createTask,
  deleteTask,
  updateTask,
  getTasks,
  getTaskById,
  addSubtask, // Add subtask
  updateSubtask, // Update subtask
  getSubtasks,
} = require("../controllers/taskController");

const {
  getActivity,
  updateActivity,
} = require("../controllers/activityController");

// Secure Routes with authenticateToken middleware
router.post("/create", authenticateToken, createTask);
router.delete("/delete/:id", authenticateToken, deleteTask);
router.put("/update/:id", authenticateToken, updateTask);
router.get("/tasks", authenticateToken, getTasks);
router.get("/task/:id", authenticateToken, getTaskById);

// Subtask routes
router.post("/task/:taskId/subtasks", authenticateToken, addSubtask); // Add a subtask
router.put("/task/:taskId/subtasks/:subtaskId", updateSubtask); // Update a subtask
router.get("/task/:taskId/subtasks", authenticateToken, getSubtasks);

// Activity routes
router.post("/task/:id/add-activity", authenticateToken, getActivity);
router.put("/task/:id/update-activity", authenticateToken, updateActivity);

module.exports = router;
