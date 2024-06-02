import React from "react"

import Spinner from "@/components/custom/Spinner/Spinner"

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined
  isLoading?: boolean
  isDisabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

function Button({type, isLoading, isDisabled, onClick, children}: ButtonProps) {
  return (
    <button
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      className="w-full rounded-xl bg-lavender px-2 py-4 font-medium text-white transition duration-200 ease-out hover:bg-lavender-500"
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default Button
