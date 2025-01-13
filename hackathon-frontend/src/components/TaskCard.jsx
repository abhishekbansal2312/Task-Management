import { Link } from "react-router-dom";
import {
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineFlag,
  AiOutlineInfoCircle,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineCalendar,
} from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext

const TaskCard = ({ task, onDelete }) => {
  const [role, setRole] = useState("");

  // Use ThemeContext to get the theme
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);

  let { _id, title, priority, status, deadlineDate, team } = task;

  // Function to extract initials
  const getInitials = (username) => {
    const names = username.split(" ");
    const initials = names.map((name) => name.charAt(0)).join("");
    return initials.toUpperCase();
  };

  // Determine the icon and color based on priority level
  const getPriorityIcon = () => {
    switch (priority) {
      case "high":
        return {
          icon: (
            <AiOutlineExclamationCircle size={24} className="text-red-500" />
          ),
          color: "bg-red-100 ", // Dark mode color
        };
      case "medium":
        return {
          icon: <AiOutlineInfoCircle size={24} className="text-yellow-500" />,
          color: "bg-yellow-100 ", // Dark mode color
        };
      case "normal":
        return {
          icon: <AiOutlineFlag size={24} className="text-blue-500" />,
          color: "bg-blue-100", // Dark mode color
        };
      case "low":
        return {
          icon: <AiOutlineCheckCircle size={24} className="text-green-500" />,
          color: "bg-green-100", // Dark mode color
        };
      default:
        return {
          icon: <AiOutlineFlag size={24} className="text-gray-500" />,
          color: "bg-gray-100", // Dark mode color
        };
    }
  };

  const { icon, color } = getPriorityIcon();

  // Calculate days left
  const deadline = new Date(deadlineDate);
  const today = new Date();
  const daysLeft = Math.max(
    0,
    Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
  );

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-teal-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      className={`relative pt-3 shadow-md rounded-lg border transition-shadow duration-200 ease-in-out ${
        theme === "dark"
          ? "bg-gray-700 border-gray-700 text-white hover:shadow-lg"
          : "bg-slate-100 border-gray-200 text-gray-800 hover:shadow-lg"
      }`}>
      {/* Priority Icon */}
      <div
        className={`absolute top-[-15px] left-[-15px] w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>

      {/* Task Header */}
      <div className="pl-12">
        <Link to={`/tasks/${_id}`}>
          <h2
            className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
            {title}
          </h2>
        </Link>
      </div>

      {/* Task Details */}
      <div
        className={`pl-6 mt-4 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
        <div className="flex items-center mb-2">
          <AiOutlineCalendar className="text-red-500 mr-2" />
          <span>Deadline: {new Date(deadlineDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center mb-2">
          <AiOutlineInfoCircle className="text-yellow-500 mr-2" />
          <span>Status: {status}</span>
        </div>

        <div className="flex items-center mb-2">
          <AiOutlineUser className="text-green-700 mr-2" />
          <span>
            Team:{" "}
            {team.length > 0
              ? team.map((member) => member.username).join(", ")
              : "N/A"}
          </span>
        </div>

        {/* Days Left */}
        <div className="flex items-center mt-4 mb-16">
          <AiOutlineClockCircle className="text-gray-500 mr-2" />
          <span>{daysLeft} days left</span>
        </div>

        {/* Team Member Avatars */}
        <div className="flex mt-4 space-x-1 absolute bottom-3">
          {team.slice(0, 4).map((member, index) => (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${getRandomColor()}`}>
              {getInitials(member.username)}
            </div>
          ))}
          {team.length > 4 && (
            <span className="text-gray-500 flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-white">
              +{team.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Delete Button */}
      {role === "admin" && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => onDelete(_id)}
            className={`transition-colors duration-200 ${
              theme === "dark"
                ? "text-red-400 hover:text-red-600"
                : "text-red-500 hover:text-red-700"
            }`}>
            <AiOutlineDelete size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
