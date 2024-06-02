"use client"

import React from "react"
import { useSetDarkMode } from "@/components/theme-provider"

import { MdSunny } from "react-icons/md"
import { IoMdMoon } from "react-icons/io"



function DarkModeButton() {
  const { isDarkMode, handleDarkMode } = useSetDarkMode()

  return (
    <button 
      className="absolute right-4 top-4 flex w-10 flex-col items-center rounded-full bg-lavender px-4 py-2 text-white"
      onClick={handleDarkMode}
    >
      {!isDarkMode ? (<MdSunny className="text-2xl" />) : (<IoMdMoon className="text-2xl" />)}
    </button>
  )
}

export default DarkModeButton
