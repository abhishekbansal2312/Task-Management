import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FaFlag,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaComment,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../App.css";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newActivity, setNewActivity] = useState({
    type: "assigned",
    activity: "",
    date: new Date().toISOString().split("T")[0], // Default date to today
  });
  const [showPopup, setShowPopup] = useState(false);
  const [showTimelinePopup, setShowTimelinePopup] = useState(true);
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState({
    title: "",
    status: "pending",
  });
  const [editSubtask, setEditSubtask] = useState(null);
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3006/task/task/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const taskData = await response.json();
        setTask(taskData);

        // Fetch subtasks
        const subtaskResponse = await fetch(
          `http://localhost:3006/task/task/${id}/subtasks`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!subtaskResponse.ok) {
          throw new Error(`HTTP error! Status: ${subtaskResponse.status}`);
        }

        const subtaskData = await subtaskResponse.json();
        setSubtasks(subtaskData);
      } catch (error) {
        console.error("Error fetching task details:", error);
        setError("Error fetching task details.");
      } finally {
        // setLoading(false); // End loading
      }
    };

    fetchTaskDetails();
  }, [id, subtasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3006/task/task/${id}/add-activity`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newActivity),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedResponse = await fetch(
        `http://localhost:3006/task/task/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!updatedResponse.ok) {
        throw new Error(`HTTP error! Status: ${updatedResponse.status}`);
      }

      const updatedTask = await updatedResponse.json();
      setTask(updatedTask);
      setNewActivity({
        type: "assigned",
        activity: "",
        date: new Date().toISOString().split("T")[0],
      });
      setShowPopup(false);
      setShowTimelinePopup(true); // Close timeline popup
    } catch (error) {
      console.error("Error adding activity:", error);
      setError("Failed to add activity.");
    }
  };
  const handleAddSubtask = async (e) => {
    e.preventDefault();
    try {
      // console.log("new subtask is,",newSubtask);
      const response = await fetch(
        `http://localhost:3006/task/task/${id}/subtasks`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubtask),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const addedSubtask = await response.json();
      // console.log("addedSubtask is", addedSubtask)
      setSubtasks((prev) => [...prev, addedSubtask]); // Add new subtask to the list
      setNewSubtask({ title: "", status: "pending" }); // Reset new subtask form
    } catch (error) {
      console.error("Error adding subtask:", error);
      setError("Failed to add subtask.");
    }
  };

  const handleUpdateSubtask = async (subtaskId) => {
    try {
      const response = await fetch(
        `http://localhost:3006/task/task/${id}/subtasks/${subtaskId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editSubtask),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedSubtask = await response.json();
      setSubtasks((prev) =>
        prev.map((subtask) =>
          subtask._id === subtaskId ? updatedSubtask : subtask
        )
      );
      setEditSubtask(null); // Reset editing state
    } catch (error) {
      console.error("Error updating subtask:", error);
      setError("Failed to update subtask.");
    }
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="container mx-auto p-6 mt-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              {task?.title || "Task Title"}
            </h1>
            <div className="space-x-2">
              <button
                onClick={() => setShowPopup((prev) => !prev)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                {showPopup ? "Cancel Activity" : "Add Activity"}
              </button>
              <button
                onClick={() => setShowTimelinePopup((prev) => !prev)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                {showTimelinePopup ? "Hide Timeline" : "Show Timeline"}
              </button>
            </div>
          </div>

          {/* Task Details Section */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-200 shadow-lg rounded-lg p-6 mb-4 border border-blue-300 text-black">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Task Details
            </h2>
            <p>
              <strong>Priority:</strong> {task?.priority || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {task?.status || "N/A"}
            </p>
            <p>
              <strong>Date Created:</strong>{" "}
              {task?.date ? new Date(task.date).toLocaleDateString() : "N/A"}
            </p>
            <p>
              <strong>Assigned Date:</strong>{" "}
              {task?.assignedDate
                ? new Date(task.assignedDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {task?.deadlineDate
                ? new Date(task.deadlineDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="flex items-center gap-2 overflow-x-auto">
              <strong>Team:</strong>
              {task?.team?.length > 0
                ? task.team.map((user) => (
                    <span key={user._id} className="text-blue-600">
                      {user.username},
                    </span>
                  ))
                : "No team members"}
            </p>
            <p className="flex items-start gap-2 overflow-x-auto">
              <strong>Descrition:</strong>
              <div>{task?.description || "N/A"}</div>
            </p>
            <h2 className="text-2xl font-semibold mb-4 text-blue-800 mt-10">
              Task Sub Tasks
            </h2>
            {/* Subtasks Section */}
            <div className="bg-gradient-to-r from-green-50 to-green-200 shadow-lg rounded-lg p-6 mb-4 border border-green-300 text-black">
              <h2 className="text-2xl font-semibold mb-4 text-green-800">
                Subtasks
              </h2>
              <ul>
                {subtasks.map((subtask) => (
                  <li
                    key={subtask._id}
                    className="flex justify-between items-center mb-2"
                  >
                    {editSubtask && editSubtask._id === subtask._id ? (
                      <input
                        type="text"
                        value={editSubtask.title}
                        onChange={(e) =>
                          setEditSubtask({
                            ...editSubtask,
                            title: e.target.value,
                          })
                        }
                        className="border border-gray-300 p-2 rounded"
                      />
                    ) : (
                      <span>{subtask.title}</span>
                    )}
                    <button
                      onClick={() =>
                        setEditSubtask(editSubtask ? null : subtask)
                      }
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      {editSubtask && editSubtask._id === subtask._id
                        ? "Cancel"
                        : "Edit"}
                    </button>
                    {editSubtask && editSubtask._id === subtask._id && (
                      <button
                        onClick={() => handleUpdateSubtask(subtask._id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 ml-2"
                      >
                        Save
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {/* Add Subtask Form */}
              <form onSubmit={handleAddSubtask} className="mt-4">
                <input
                  type="text"
                  placeholder="New Subtask Title"
                  value={newSubtask.title} // Bind the value to state
                  onChange={(e) =>
                    setNewSubtask({ ...newSubtask, title: e.target.value })
                  }
                  required
                  className="border border-gray-300 rounded p-2 mr-2"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Add Subtask
                </button>
              </form>
            </div>
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-lg w-[80vw] max-w-4xl text-black"
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Add New Activity
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 ">
                  <div className="flex flex-col">
                    <label htmlFor="type" className="mb-1 font-medium">
                      Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={newActivity.type}
                      onChange={handleChange}
                      className="border border-gray-300 rounded p-2"
                      required
                    >
                      <option value="assigned">Assigned</option>
                      <option value="started">Started</option>
                      <option value="in progress">In Progress</option>
                      <option value="bug">Bug</option>
                      <option value="completed">Completed</option>
                      <option value="commented">Commented</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="activity" className="mb-1 font-medium">
                      Activity
                    </label>
                    <textarea
                      id="activity"
                      name="activity"
                      value={newActivity.activity}
                      onChange={handleChange}
                      rows="3"
                      className="border border-gray-300 rounded p-2"
                      required
                    ></textarea>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="date" className="mb-1 font-medium">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={newActivity.date}
                      onChange={handleChange}
                      className="border border-gray-300 rounded p-2"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowPopup(false)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {showTimelinePopup && task && (
            <div className="my-6 text-black">
              <VerticalTimeline>
                {task.activities.map((activity) => (
                  <VerticalTimelineElement
                    key={activity._id}
                    date={
                      <span style={{ color: "white" }}>
                        {new Date(activity.date).toISOString().split("T")[0]}
                      </span>
                    }
                    iconStyle={{
                      background: getIconBackgroundColor(activity.type),
                      color: "#fff",
                    }}
                    icon={getActivityIcon(activity.type)}
                  >
                    <h3 className="text-xl font-semibold">{activity.type}</h3>
                    <p>{activity.activity}</p>
                    <p>By : {activity.userName}</p>
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const getIconBackgroundColor = (type) => {
  switch (type) {
    case "assigned":
      return "blue";
    case "started":
      return "orange";
    case "in progress":
      return "yellow";
    case "completed":
      return "green";
    case "bug":
      return "red";
    case "commented":
      return "purple";
    default:
      return "gray";
  }
};

const getActivityIcon = (type) => {
  switch (type) {
    case "assigned":
      return <FaFlag />;
    case "started":
      return <FaExclamationTriangle />;
    case "in progress":
      return <FaComment />;
    case "completed":
      return <FaCheck />;
    case "bug":
      return <FaBug />;
    case "commented":
      return <FaComment />;
    default:
      return <FaComment />;
  }
};

export default TaskDetails;
