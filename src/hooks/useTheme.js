import { useEffect, useState } from "react";

function useTheme() {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const [theme, setTheme] = useState(localStorage?.theme || systemTheme);
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const rootElement = document.getElementById("root");
    rootElement.classList.remove(nextTheme);
    rootElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, nextTheme]);

  return [nextTheme, setTheme];
}

export default useTheme;
