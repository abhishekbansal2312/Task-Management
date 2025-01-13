import React, { useContext } from "react";
import { motion } from "framer-motion";
import ReactSwitch from "react-switch";
import { ThemeContext } from "../context/ThemeContext";
import styled from "styled-components";
import Player from "react-lottie-player";
import sunAnimationData from "../assets/sun.json"; // Correct path
import moonAnimationData from "../assets/moon.json"; // Correct path

// Styled container for the theme toggle
const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px; /* Adding perspective for 3D effect */
`;

const ToggleSwitch = styled(ReactSwitch)`
  .react-switch-bg {
    background-color: ${({ checked }) => (checked ? "#333" : "#ccc")};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  .react-switch-handle {
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
  &:hover {
    .react-switch-handle {
      transform: scale(1.1);
    }
  }
`;

// Animation variants for the toggle switch
const variants = {
  light: {
    rotateY: 0,
    scale: 1,
  },
  dark: {
    rotateY: 180,
    scale: 1.1,
  },
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleContainer>
      <motion.div
        initial="light"
        animate={theme === "dark" ? "dark" : "light"}
        variants={variants}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ display: "flex", alignItems: "center" }}>
        <ToggleSwitch
          checked={theme === "dark"}
          onChange={toggleTheme}
          offColor="#ccc"
          onColor="#333"
          handleDiameter={24}
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                paddingRight: 10,
              }}>
              <Player
                loop
                play
                animationData={sunAnimationData}
                style={{ width: 24, height: 24 }}
              />
            </div>
          }
          checkedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                paddingRight: 10,
              }}>
              <Player
                loop
                play
                animationData={moonAnimationData}
                style={{ width: 24, height: 24 }}
              />
            </div>
          }
          height={24}
          width={60}
        />
      </motion.div>
    </ToggleContainer>
  );
};

export default ThemeToggle;
