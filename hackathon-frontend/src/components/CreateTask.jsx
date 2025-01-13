import React, { useState, useEffect } from "react";

const CreateTask = ({ onClose }) => {
  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("normal");
  const [status, setStatus] = useState("pending");
  const [assignedDate, setAssignedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [deadlineDate, setDeadlineDate] = useState("");
  const [team, setTeam] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      priority,
      status,
      assignedDate,
      deadlineDate,
      team: selectedTeam, // Use selectedTeam here
    };

    try {
      const response = await fetch(
        "https://task-management-17wt.onrender.com/task/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
          credentials: "include",
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Task created:", result);
        onClose(); // Close the modal after successful task creation
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Failed to create task:", errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to get all users from the database
  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://task-management-17wt.onrender.com/auth/users",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Users:", data);
        setTeam(data);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch users:", errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUsers(); // Fetch users when the component mounts
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (userId) => {
    setSelectedTeam((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative mt-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
          aria-label="Close"
        >
          &times;
        </button>
        <h1 className="text-2xl font-semibold mb-4">Create New Task</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="col-span-1">
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              aria-required="true"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              aria-required="true"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Priority:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Assigned Date:</label>
            <input
              type="date"
              value={assignedDate}
              onChange={(e) => setAssignedDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Deadline Date:</label>
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              aria-required="true"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Team:</label>
            <div className="mt-2 flex flex-wrap gap-4">
              {team.map((user) => (
                <div key={user._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`user-${user._id}`}
                    value={user._id}
                    checked={selectedTeam.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                    className="mr-2"
                  />
                  <label htmlFor={`user-${user._id}`} className="text-gray-700">
                    {user.username}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
