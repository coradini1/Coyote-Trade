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
      className="w-full bg-lavender py-4 px-2 font-medium text-white rounded-xl hover:bg-lavender-500 transition ease-out duration-200"
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default Button
