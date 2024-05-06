import React from "react"
import { IoMdArrowBack } from "react-icons/io"

interface BackButtonProps {
  action: () => void;
}

function BackButton({ action }: BackButtonProps) {
  return (
    <button
      className="absolute top-4 left-4 w-fit flex flex-col items-center py-2 px-4"
      onClick={action}
    >
      <span 
        className="flex flex-row gap-3 hover:gap-2 transition-all ease-out duration-300 text-text dark:text-textBaseDark"
      >
        <IoMdArrowBack className="text-2xl" /> <p>Back</p>
      </span>
    </button>
  )
}

export default BackButton
