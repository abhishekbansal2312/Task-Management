import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// Team data array
const teamMembers = [
  {
    id: 1,
    name: "Abbas Akbar",
    role: "Frontend Developer",
    description:
      "As a frontend developer on the WorkGrid project, I was instrumental in crafting a user-friendly interface and seamless experience. My backend knowledge complemented this by ensuring robust functionality and smooth integration, helping us deliver a powerful project management tool.",
    imgSrc: "/abbas2.jpg",
  },
  {
    id: 3,
    name: "Abhishek Bansal",
    role: "Full Stack Developer",
    description:
      "As a full stack developer, I am proficient in both frontend and backend technologies, enabling me to build and maintain complete web applications. My expertise includes developing user interfaces, server-side logic, and database management, ensuring a seamless and integrated development process.",
    imgSrc: "abhishek.jpg",
  },
  {
    id: 2,
    name: "Ali Sher Khan",
    role: "Backend Developer",
    description:
      "As a backend developer, I specialize in designing and implementing server-side logic and database management to support scalable and efficient web applications. My work ensures robust performance and reliability for all backend processes.",
    imgSrc: "/ali2.jpg",
  },
];

const AboutUs = () => {
  return (
    <div className="relative bg-gray-900 text-gray-100 min-h-screen py-16 px-8">
      {/* Back to Dashboard Button */}
      <div className="absolute top-6 left-6">
        <Link
          to="/" // Adjust the route to match your dashboard path
          className="inline-block px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Back to home
        </Link>
      </div>

      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600 tracking-wide drop-shadow-lg">
          Meet the Dream Team
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-300 italic">
          Driving innovation, building solutions, and growing businesses online.
        </p>
      </div>

      {/* Team Members Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
          >
            <img
              src={member.imgSrc}
              alt={member.name}
              className="w-full h-56 object-contain transition-transform duration-300 transform hover:scale-105"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                {member.role}
              </h2>
              <p className="text-lg text-gray-300 font-semibold">
                {member.name}
              </p>
              <p className="mt-4 text-gray-200 leading-relaxed">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
