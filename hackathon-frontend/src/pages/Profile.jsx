import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

const AnimatedParticles = () => {
  const particlesRef = React.useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    particlesRef.current.rotation.x = t * 0.2;
    particlesRef.current.rotation.y = t * 0.2;
  });

  return (
    <group ref={particlesRef}>
      {[...Array(100)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.1, 16, 16]}
          position={[
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
          ]}
        >
          <meshStandardMaterial
            attach="material"
            color={`hsl(${Math.random() * 360}, 100%, 80%)`}
          />
        </Sphere>
      ))}
    </group>
  );
};

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken._id;

          if (!/^[a-f\d]{24}$/i.test(userId)) {
            setError("Invalid user ID format.");
            return;
          }

          const response = await fetch(
            `http://localhost:3006/auth/users/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message);
          } else {
            const data = await response.json();
            setUserProfile(data);
          }
        } else {
          setError("Token is missing. Please log in again.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-5 left-5 z-10">
        <button
          onClick={handleBackClick}
          className="flex items-center text-blue-300 hover:text-blue-200 transition duration-200"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>
      </div>
      <Canvas
        className="absolute inset-0 -z-10"
        style={{ position: "absolute" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedParticles />
      </Canvas>
      {error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-400 text-center z-10"
        >
          {error}
        </motion.div>
      ) : userProfile ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden z-10"
        >
          <div className="flex items-center justify-center bg-gradient-to-r from-blue-700 to-indigo-600 p-6">
            <FaUserCircle className="text-white text-5xl" />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              {userProfile.username}
            </h2>
            <p className="mb-4">Role: {userProfile.role}</p>
            <p className="mb-4">Email: {userProfile.email}</p>
          </div>
        </motion.div>
      ) : (
        <p className="text-center">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
