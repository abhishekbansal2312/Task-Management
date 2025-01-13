import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sampleImage from "../assets/images/sample.png";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        "https://task-management-backend-a9ud.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        // Extract the error message from the response
        const errorData = await response.text(); // or response.json() if your server returns JSON errors
        setLoading(false);
        throw new Error(`Login failed: ${errorData}`);
      }

      const data = await response.json();
      console.log(data);

      // Check if the response contains the expected success message
      if (data.message === "Login successful") {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/dashboard"); // Redirect to dashboard or any protected route
      } else {
        setLoading(false);
        throw new Error(`Unexpected response: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      // Set a more detailed error message
      setLoading(false);
      setError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side: Form */}
      <div className="flex justify-center items-center w-1/2 h-screen">
        <div className="p-8 bg-white custom-shadow rounded-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Login
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2 ">
                Email
              </label>
              <input
                type="email"
                className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            {!loading && (
              <button
                type="submit"
                className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-300 ease-in-out"
              >
                Login
              </button>
            )}
            {loading && (
              <button className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-300 ease-in-out">
                Loading.....
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Stylish Vertical Border */}
      {/* <div className="w-px bg-gradient-to-t from-teal-100 via-transparent to-blue-100 h-screen"></div> */}

      {/* Right side: Picture with gradient */}
      <div className="w-1/2 bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-10 flex justify-center items-center">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          {/* Add more bubbles as needed */}
        </div>
        <img
          src={sampleImage}
          alt="Decorative"
          className="h-64 w-128 object-cover rounded-lg shadow-lg z-20"
        />
      </div>
    </div>
  );
};

export default Login;
