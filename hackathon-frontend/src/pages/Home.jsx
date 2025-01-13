import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "../index.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isLoggedin, setIsLoggedIn] = useState("false");
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header with Navbar */}
      <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-black text-white py-3 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 animate-fadeIn">
            <FontAwesomeIcon icon={faTrello} className="text-4xl slow-spin" />
            <span className="text-3xl font-bold tracking-wide text-indigo-300">
              WorkGrid
            </span>
          </div>
          {/* Buttons */}
          <div className="flex space-x-4">
            {!isLoggedin && (
              <Link to="/login">
                <button className="bg-transparent border border-gray-500 py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                  Login
                </button>
              </Link>
            )}
            <Link
              to="/about"
              className="hover:text-blue-500 transition duration-200 bg-transparent border border-gray-500 py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300 "
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-500 transition duration-200 bg-transparent border border-gray-500 py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              Contact
            </Link>
            <Link to="/dashboard">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 py-2 px-6 rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black to-gray-900 py-24 text-center min-h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-normal">
            Organize &amp; Optimize Your{" "}
            <span className="text-indigo-400">Team's Workflow</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            Streamline Task Management, Boost Collaboration
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Take control of your projects with an intuitive platform built for
            productivity. Whether you're managing teams, tracking progress, or
            setting goals,
            <strong> WorkGrid</strong> helps you achieve more with less effort.
          </p>
          <Link to="/dashboard">
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-transform duration-300 mx-auto">
              Get Started Free
            </button>
          </Link>
          {/* Image */}
          <div className="mt-12">
            <img
              className="mx-auto rounded-lg shadow-lg max-h-[32rem] object-cover transition-transform duration-500 hover:scale-105"
              src="/homephoto.jpg"
              alt="Project Collaboration"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-gray-900 to-black py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-400">
            One Platform, Endless Possibilities
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Empower your team with WorkGrid — a single solution designed to
            handle any workflow and drive unparalleled results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Card 1 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">
                Accelerate Collaboration
              </h3>
              <p className="text-gray-300 mb-4">
                Boost team efficiency with real-time task updates, shared
                boards, and instant feedback loops.
              </p>
              <ul className="text-indigo-300 space-y-2">
                <li>• Instant task syncing</li>
                <li>• Shared project boards</li>
                <li>• In-app feedback</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">
                Stay on Track, Every Time
              </h3>
              <p className="text-gray-300 mb-4">
                Keep your projects on schedule with automatic task assignments,
                progress tracking, and team accountability.
              </p>
              <ul className="text-indigo-300 space-y-2">
                <li>• Automated task assignments</li>
                <li>• Timeline and progress insights</li>
                <li>• Role-based task visibility</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">
                Scale with Confidence
              </h3>
              <p className="text-gray-300 mb-4">
                Integrate seamlessly across platforms and automate workflows to
                scale your operations with ease.
              </p>
              <ul className="text-indigo-300 space-y-2">
                <li>• Cross-platform integrations</li>
                <li>• Automated workflow triggers</li>
                <li>• Fully customizable dashboards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Left and Right Section */}
      <section className="bg-black pt-24 mx-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-400">
            Unlock Powerful Features
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-16">
            Designed for teams of all sizes, WorkGrid offers an array of
            features to streamline your project management and ensure every task
            is completed with precision.
          </p>

          {/* Row 1: Content Left, Image Right */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            {/* Content */}
            <div className="md:w-1/2 text-left space-y-4">
              <h3 className="text-3xl font-bold text-indigo-400">
                Boost Efficiency & Minimize Costs
              </h3>
              <p className="text-lg text-gray-300 mr-6">
                With real-time collaboration, powerful integrations, and
                efficient task management, WorkGrid ensures your team operates
                at peak productivity without breaking the bank.
              </p>
              <ul className="text-indigo-300 space-y-2">
                <li>✔ Real-time collaboration tools</li>
                <li>✔ Smart task management</li>
                <li>✔ Multi-platform integrations</li>
              </ul>
            </div>

            {/* Image */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 mx-auto"
                src="https://t3.ftcdn.net/jpg/07/64/19/46/240_F_764194617_mriQFo2VdT6WoDw4ihl7G695lZYmI9sJ.jpg"
                alt="Boost Efficiency"
              />
            </div>
          </div>

          {/* Row 2: Image Left, Content Right */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Image */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 mx-auto"
                src="https://t3.ftcdn.net/jpg/02/13/05/58/240_F_213055873_eCxNAjgfwP9JE6MM4Io2s0qpNOPxOoIs.jpg"
                alt="Collaborate with Ease"
              />
            </div>

            {/* Content */}
            <div className="md:w-1/2 text-left space-y-4">
              <h3 className="text-3xl font-bold text-indigo-400">
                Collaborate with Ease
              </h3>
              <p className="text-lg text-gray-300 mr-12">
                Empower your team with advanced collaboration tools that drive
                engagement, streamline communication, and foster innovation.
              </p>
              <ul className="text-indigo-300 space-y-2">
                <li>✔ Real-time messaging and notifications</li>
                <li>✔ Shared project boards</li>
                <li>✔ Integrated file sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black py-24 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-xl italic mb-4">
                "WorkGrid has revolutionized how we manage projects. Its
                seamless integration and intuitive interface have boosted our
                team's efficiency."
              </p>
              <h3 className="text-lg font-bold">John Doe, CEO at TechCorp</h3>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-xl italic">
                "Since switching to WorkGrid, our team has seen a 40% increase
                in productivity. It's a game-changer for managing complex
                tasks."
              </p>
              <h3 className="text-lg font-bold">
                Jane Smith, Project Manager at InnovateX
              </h3>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-xl italic mb-4">
                "WorkGrid has simplified collaboration across our teams. It's
                the perfect tool for keeping everyone aligned and on track."
              </p>
              <h3 className="text-lg font-bold">Samuel Lee, CTO at DevHub</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm md:text-base text-gray-400">
            © 2024 WorkGrid Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
