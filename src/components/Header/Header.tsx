import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

function Header() {
  return (
    <div>
      <span className="text-red-800 dark:text-red-100">Header</span>
      <ThemeSwitcher />
    </div>
  );
}

export default Header;
