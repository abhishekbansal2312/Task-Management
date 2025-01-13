import React, { useState, useEffect, useContext } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const Dashboard = () => {
  const [taskData, setTaskData] = useState({
    totalTasks: 0,
    computedTasks: 0,
    tasksInProgress: 0,
    pending: 0,
    priorityData: { high: 0, normal: 0, low: 0 },
  });

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found. Redirecting to login page...");
        return;
      }

      const response = await fetch("http://localhost:3006/task/tasks", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        const totalTasks = data.length;
        const computedTasks = data.filter(
          (task) => task.status === "completed"
        ).length;
        const tasksInProgress = data.filter(
          (task) => task.status === "in-progress"
        ).length;
        const pending = data.filter((task) => task.status === "pending").length;
        const priorityData = {
          high: data.filter((task) => task.priority === "high").length,
          normal: data.filter((task) => task.priority === "normal").length,
          low: data.filter((task) => task.priority === "low").length,
        };

        setTaskData({
          totalTasks,
          computedTasks,
          tasksInProgress,
          pending,
          priorityData,
        });
      } else {
        const text = await response.text();
        console.error("Response is not JSON:", text);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      if (error.message.includes("401")) {
        // window.location.href = '/login';
      }
    }
  };

  const priorityChartData = {
    labels: ["High", "Normal", "Low"],
    datasets: [
      {
        data: Object.values(taskData.priorityData),
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
      },
    ],
  };

  const statusChartData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [
          taskData.computedTasks,
          taskData.tasksInProgress,
          taskData.pending,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          padding: 20,
          font: {
            size: 14,
          },
          color: theme === "dark" ? "#E0E0E0" : "#333", // Legend text color based on theme
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
        bodyFont: {
          size: 14,
          color: theme === "dark" ? "#E0E0E0" : "#333", // Tooltip text color based on theme
        },
        titleFont: {
          size: 16,
          color: theme === "dark" ? "#E0E0E0" : "#333", // Tooltip title color based on theme
        },
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: theme === "dark" ? "#E0E0E0" : "#333", // X-axis labels color based on theme
          font: {
            size: 14,
          },
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(224, 224, 224, 0.2)"
              : "rgba(0, 0, 0, 0.1)", // X-axis grid lines color based on theme
        },
      },
      y: {
        ticks: {
          color: theme === "dark" ? "#E0E0E0" : "#333", // Y-axis labels color based on theme
          font: {
            size: 14,
          },
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(224, 224, 224, 0.2)"
              : "rgba(0, 0, 0, 0.1)", // Y-axis grid lines color based on theme
        },
      },
    },
  };

  return (
    <div
      className={`flex ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Content area */}
        <main
          className={`flex-1 p-6 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-20">
            {[
              {
                label: "Total Tasks",
                value: taskData.totalTasks,
                color: theme === "dark" ? "text-yellow-400" : "text-yellow-800",
              },
              {
                label: "Completed Tasks",
                value: taskData.computedTasks,
                color: theme === "dark" ? "text-green-400" : "text-green-800",
              },
              {
                label: "Tasks In Progress",
                value: taskData.tasksInProgress,
                color: theme === "dark" ? "text-blue-400" : "text-blue-800",
              },
              {
                label: "Pending",
                value: taskData.pending,
                color: theme === "dark" ? "text-red-600" : "text-red-800",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg shadow-lg ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                } flex flex-col items-center`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 + index * 0.2 }}
              >
                <h2 className={`text-xl font-semibold ${item.color}`}>
                  {item.label}
                </h2>
                <p className="text-3xl font-bold mt-2">
                  <CountUp end={item.value} duration={1.5} />
                </p>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Priority Chart */}
            <motion.div
              className={`p-4 rounded-lg shadow-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                } mb-4 text-center`}
              >
                Task Priority Chart
              </h2>
              <div className="w-full h-[350px]">
                <Pie data={priorityChartData} options={chartOptions} />
              </div>
            </motion.div>

            {/* Task Status Chart */}
            <motion.div
              className={`p-4 rounded-lg shadow-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                } mb-4 text-center`}
              >
                Task Status Chart
              </h2>
              <div className="w-full h-[350px]">
                <Bar data={statusChartData} options={chartOptions} />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
