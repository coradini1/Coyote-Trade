"use client"
import React, { useState, useEffect } from "react"

export function ThemeProvider({ children }: any) {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  const { isDarkMode } = useSetDarkMode()

  useEffect(() => {
    setDarkMode(isDarkMode)
  }, [isDarkMode])

  return (
    <div className={darkMode ? "dark" : ""}>
      {children}
    </div>
  )
}

export const useSetDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const theme = localStorage.getItem("darkMode")

    if (theme === "true") {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)
    }
  }, [])

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem("darkMode", String(!isDarkMode))
    window.location.reload()
  }

  return { isDarkMode, handleDarkMode }
}
