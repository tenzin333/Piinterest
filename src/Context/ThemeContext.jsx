import React, { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"; // Load preference
  });

  const toggleTheme = () => {
    setDarkMode((mode) => {
      const newMode = !mode;
      localStorage.setItem("theme", newMode ? "dark" : "light"); // Save preference
      return newMode;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
