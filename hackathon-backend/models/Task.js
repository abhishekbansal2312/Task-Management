// models/task.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const subtaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed:{
      type: Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description :{
      type : String
    },
    date: {
      type: Date,
      default: new Date(),
    },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed"],
    },
    assignedDate: {
      type: Date,
      default: new Date(),
    },
    deadlineDate: {
      type: Date,
      required: true,
    },
    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: [
            "assigned",
            "started",
            "in progress",
            "bug",
            "completed",
            "commented",
          ],
        },
        activity: String,
        date: { type: Date, default: new Date() },
        by: { type: Schema.Types.ObjectId, ref: "User" },
        userName: String,
      },
    ],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    subtasks: [subtaskSchema],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
