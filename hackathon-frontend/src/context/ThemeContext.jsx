// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Retrieve saved theme from localStorage or default to light
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("theme", theme);
    document.body.className = theme; // Apply theme class to body
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for consuming the theme context
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeContext, ThemeProvider, useTheme };
