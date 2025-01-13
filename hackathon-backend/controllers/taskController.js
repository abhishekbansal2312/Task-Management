const task = require("../models/Task");
const mongoose = require("mongoose");

// Controller function to create a new task
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      assignedDate,
      deadlineDate,
      activities,
      team,
    } = req.body;

    // Validate required fields
    if (!title || !deadlineDate) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Create a new task
    const newTask = new task({
      title,
      description,
      priority,
      status,
      assignedDate,
      deadlineDate,
      activities,
      team,
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    // Respond with the created task
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find task by ID and delete
    const deletedTask = await task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Find task by ID and update
    const updatedTask = await task.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to get all tasks
const getTasks = async (req, res) => {
  try {
    // Retrieve all tasks from the database
    const tasks = await task.find().sort({ createdAt: -1 }).populate("team");

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to get a task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find task by ID
    const taskById = await task.findById(id).populate("team");

    if (!taskById) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(taskById);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to add a subtask
const addSubtask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const subtask = req.body;

    // Validate required fields for subtask
    if (!subtask.title) {
      return res
        .status(400)
        .json({ error: "All subtask fields are mandatory" });
    }

    // Find the parent task and add the subtask
    const parentTask = await task.findById(taskId);
    if (!parentTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    parentTask.subtasks.push(subtask);
    const updatedTask = await parentTask.save();

    res.status(201).json(updatedTask);
  } catch (error) {
    console.error("Error adding subtask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to update a subtask
const updateSubtask = async (req, res) => {
  try {
    const { taskId, subtaskId } = req.params;
    const updatedSubtask = req.body;

    // Find the parent task
    const parentTask = await task.findById(taskId);
    if (!parentTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Find the subtask and update it
    const subtask = parentTask.subtasks.id(subtaskId);
    if (!subtask) {
      return res.status(404).json({ error: "Subtask not found" });
    }

    Object.assign(subtask, updatedSubtask);
    const updatedTask = await parentTask.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating subtask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const Task = require("../models/Task");

// Existing controller functions...
const getSubtasks = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task.subtasks); // Send the subtasks
  } catch (error) {
    console.error("Error fetching subtasks:", error);
    res.status(500).json({ message: "Failed to fetch subtasks" });
  }
};

module.exports = {
  createTask,
  deleteTask,
  updateTask,
  getTasks,
  getTaskById,
  addSubtask,
  updateSubtask,
  getSubtasks,
};
