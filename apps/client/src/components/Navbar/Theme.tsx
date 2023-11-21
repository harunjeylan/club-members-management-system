"use client";
import useTheme from "@client/hooks/useTheme";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

function Theme() {
  const {theme, toggleLightDark} = useTheme();
  return (
    <div className="relative">
      <div>
        <button className="flex btn-icon" onClick={toggleLightDark}>
          {theme === "dark" ? (
            <MdOutlineLightMode size={20} />
          ) : (
            <MdOutlineDarkMode size={20} />
          )}
        </button>
      </div>
      <ul></ul>
    </div>
  );
}

export default Theme;
