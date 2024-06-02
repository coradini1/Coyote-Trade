import React from "react"
import { IoMdArrowBack } from "react-icons/io"

interface BackButtonProps {
  action: () => void;
}

function BackButton({ action }: BackButtonProps) {
  return (
    <button
      className="absolute left-4 top-4 flex w-fit flex-col items-center px-4 py-2"
      onClick={action}
    >
      <span 
        className="flex flex-row gap-3 text-text transition-all duration-300 ease-out hover:gap-2 dark:text-textBaseDark"
      >
        <IoMdArrowBack className="text-2xl" /> <p>Back</p>
      </span>
    </button>
  )
}

export default BackButton
