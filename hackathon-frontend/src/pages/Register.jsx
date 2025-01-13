import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    role: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/signup", formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard"); // Redirect to dashboard or any protected route
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-6 bg-white shadow-md rounded" onSubmit={handleSignup}>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
