import React, { useState, useEffect, useCallback, useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineFlag,
} from "react-icons/ai";
import { ThemeContext } from "../context/ThemeContext";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Progress = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(""); // Add state for user ID

  // Use ThemeContext to get the theme
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
      setUserId(decodedToken._id); // Extract user ID
    }
  }, []);

  const openAddTask = () => {
    setIsAddTaskOpen(true);
  };

  const closeAddTask = () => {
    setIsAddTaskOpen(false);
  };

  // Memoize fetchTasks to avoid recreating the function on each render
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://task-management-backend-a9ud.onrender.com/task/tasks",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data) {
        let filteredTasks;

        if (role === "admin" || role === "manager") {
          // Admins see all in-progress tasks
          filteredTasks = data.filter((task) => task.status === "in-progress");
        } else {
          // Regular users see only their in-progress tasks
          filteredTasks = data
            .filter((task) => task.status === "in-progress")
            .filter((task) =>
              task.team.some((member) => member._id === userId)
            );
        }

        setTasks(filteredTasks);
      } else {
        const text = await response.text();
        console.error("Response is not JSON:", text);
        setError("Failed to fetch tasks.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error fetching tasks.");
    } finally {
      setLoading(false);
    }
  }, [role, userId]); // Add `role` and `userId` as dependencies

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Include `fetchTasks` in dependencies

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `https://task-management-backend-a9ud.onrender.com/task/delete/${taskId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      } else {
        setError("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Error deleting task.");
    }
  };

  const PriorityDisplay = ({ priority }) => {
    const getPriorityIcon = () => {
      switch (priority) {
        case "high":
          return (
            <AiOutlineExclamationCircle size={20} className="text-red-500" />
          );
        case "normal":
          return <AiOutlineFlag size={20} className="text-blue-500" />;
        case "low":
          return <AiOutlineCheckCircle size={20} className="text-green-500" />;
        default:
          return <AiOutlineFlag size={20} className="text-gray-500" />;
      }
    };

    const getPriorityColor = () => {
      switch (priority) {
        case "high":
          return "bg-red-100";
        case "normal":
          return "bg-blue-100";
        case "low":
          return "bg-green-100";
        default:
          return "bg-gray-100";
      }
    };

    return (
      <span
        className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor()}`}
      >
        {getPriorityIcon()}
        <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
      </span>
    );
  };

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <Sidebar />
      <main className="flex-1 p-6 text-black">
        <Navbar />
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 animate-fadeIn">
          In-Progress Tasks
        </h2>
        {role !== "admin" && (
          <div className="flex items-center space-x-4 mb-8">
            <PriorityDisplay priority="high" />
            <PriorityDisplay priority="normal" />
            <PriorityDisplay priority="low" />
          </div>
        )}
        {role === "admin" && (
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={openAddTask}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            >
              Add Task
            </button>
            <PriorityDisplay priority="high" />
            <PriorityDisplay priority="normal" />
            <PriorityDisplay priority="low" />
          </div>
        )}

        {loading ? (
          <p className="text-lg">Loading tasks...</p>
        ) : error ? (
          <p className="text-red-600 text-lg">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <p className="text-lg">No in-progress tasks available.</p>
            )}
          </div>
        )}

        {isAddTaskOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <CreateTask onClose={closeAddTask} />
              <button
                onClick={closeAddTask}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Progress;
