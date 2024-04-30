import React, { useState } from 'react'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "email" | "text" | "password"
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  variantItem?: {}
}

function Input({type, placeholder, variantItem, ...props}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <motion.div variants={variantItem} className="relative">
      <input 
        {...props}
        type={showPassword ? "text" : type}
        className="w-full dark:bg-foregroundDark text-text dark:text-textBaseDark focus:text-lavender dark:focus:text-lavender outline-none p-3 rounded-xl border-solid border-2 focus:border-primary transition-all ease-out duration-300" 
        placeholder={placeholder}
      />
      {type === "password" && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {!showPassword ? (
            <IoEyeOffOutline 
              className="text-text text-lg cursor-pointer dark:text-textBaseDark"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
              <IoEyeOutline 
                className="text-text text-lg cursor-pointer dark:text-textBaseDark"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
        </div>
      )}
    </motion.div>
  )
}

export default Input
