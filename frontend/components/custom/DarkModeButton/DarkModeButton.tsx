import React from "react"
import { MdSunny } from "react-icons/md"
import { IoMdMoon } from "react-icons/io"

interface DarkModeButtonProps {
  handleDarkMode: () => void;
  isDarkMode: boolean;
}

function DarkModeButton({ handleDarkMode, isDarkMode }: DarkModeButtonProps) {
  return (
    <button 
      className="absolute top-4 right-4 w-10 flex flex-col items-center bg-lavender text-white py-2 px-4 rounded-full"
      onClick={handleDarkMode}
    >
      {!isDarkMode ? (<MdSunny className="text-2xl" />) : (<IoMdMoon className="text-2xl" />)}
    </button>
  )
}

export default DarkModeButton
