import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "system";
  });

  // Detect system color scheme
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  // Apply theme changes
  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      switch (theme) {
        case "dark":
          root.classList.add("dark");
          break;
        case "light":
          root.classList.remove("dark");
          break;
        case "system":
          systemTheme === "dark"
            ? root.classList.add("dark")
            : root.classList.remove("dark");
          break;
      }
    };

    applyTheme();
    localStorage.setItem("theme", theme);
  }, [theme, systemTheme]);

  // Watch for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement;
        mediaQuery.matches
          ? root.classList.add("dark")
          : root.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
