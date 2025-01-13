const Task = require("../models/Task");
const User = require("../models/User");

const getActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, activity, date } = req.body;

    if (!type || !activity || !date) {
      return res
        .status(400)
        .json({ message: "Type, activity, and date are required fields." });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Find the user to get the username
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Add new activity with username to the task
    task.activities.push({
      type,
      activity,
      date: new Date(date),
      by: req.user._id,
      userName: user.username, // Add the username here
    });

    console.log("Task:", task);

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Error adding activity:", error);
    res
      .status(500)
      .json({ message: "Failed to add activity.", error: error.message });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { activityId, type, activity, date } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Find the user to get the username
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the activity by ID
    const taskActivity = task.activities.id(activityId);
    if (!taskActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Update the activity
    taskActivity.type = type;
    taskActivity.activity = activity;
    taskActivity.date = new Date(date);

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating activity:", error);
    res
      .status(500)
      .json({ message: "Failed to update activity.", error: error.message });
  }
};

module.exports = {
  getActivity,
  updateActivity,
};
