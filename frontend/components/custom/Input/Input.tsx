import React, { useState } from 'react'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "email" | "text" | "password"
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({type, placeholder, ...props}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <input 
        {...props}
        type={showPassword ? "text" : type}
        className="w-full text-text focus:text-lavender outline-none p-3 rounded-xl border-solid border-2 focus:border-primary transition-all ease-out duration-300" 
        placeholder={placeholder}
      />
      {type === "password" && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {!showPassword ? (
            <IoEyeOffOutline 
              className="text-text text-lg cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
              <IoEyeOutline 
                className="text-text text-lg cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
        </div>
      )}
    </div>
  )
}

export default Input
