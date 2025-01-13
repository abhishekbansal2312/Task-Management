import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks.jsx";
import TasksDetails from "./pages/TasksDetails.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AboutUs from "./components/AboutUs";
import ContactPage from "./components/ContactUs";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProtectedRouteAdminOnly from "./components/ProtectedRouteAdminOnly.jsx";
import Pending from "./pages/Pending";
import Progress from "./pages/Progress";
import Completed from "./pages/Completed";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pending"
          element={
            <ProtectedRoute>
              <Pending />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inprogress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/completed"
          element={
            <ProtectedRoute>
              <Completed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TasksDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />\
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <ProtectedRouteAdminOnly>
                <Users />
              </ProtectedRouteAdminOnly>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
