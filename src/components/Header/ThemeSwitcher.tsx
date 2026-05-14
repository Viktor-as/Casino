"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        className="switch"
        aria-hidden
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <span className="slider-skeleton"></span>
      </span>
    );
  }

  return (
    <label className="switch" aria-label="Toggle dark mode">
      <input
        type="checkbox"
        checked={resolvedTheme === "light"}
        onChange={(e) => setTheme(e.target.checked ? "light" : "dark")}
        suppressHydrationWarning
      />
      <span className="slider"></span>
    </label>
  );
}

export default ThemeSwitcher;
