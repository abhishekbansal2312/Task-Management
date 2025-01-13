import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import "../App.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import { MdLogout } from "react-icons/md"; // Import logout icon

const Navbar = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [userName, setUserName] = useState("");

  function handleLogout() {
    const url = "https://task-management-17wt.onrender.com/auth/logout";
    fetch(url, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Logout successful");
          localStorage.clear(); // Clear all data from localStorage
          navigate("/"); // Redirect to the homepage or login page after logout
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
    }
  }, []);

  return (
    <nav
      className={`py-4 fixed top-0 left-0 w-full shadow-md ${
        theme === "light"
          ? "bg-white text-black z-50"
          : "bg-gray-800 text-white z-50"
      }`}
    >
      <div className="flex justify-between items-center px-8 ml-8">
        {/* Logo or Title */}
        <h1 className="text-2xl font-bold tracking-wide hover:text-blue-500 transition duration-200">
          <Link to="/">Project Management</Link>
        </h1>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <p className="text-lg font-semibold">
            Welcome <span style={{ color: "#3498db" }}>{userName}</span>
          </p>

          {/* <Link
            to="/about"
            className="hover:text-blue-500 transition duration-200">
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-500 transition duration-200">
            Contact
          </Link> */}

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Logout Button with Icon */}
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            <MdLogout size={20} className="mr-2" /> {/* Logout Icon */}{" "}
            <p>Logout</p>
          </button>

          {/* Profile Icon */}
          <Link
            to="/profile"
            className="hover:text-blue-500 transition duration-200"
          >
            <FaUserCircle size={28} /> {/* Profile Icon */}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
