"use client"
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
        className="w-full rounded-xl border-2 border-solid p-3 text-text outline-none transition-all duration-300 ease-out focus:border-primary focus:text-lavender dark:bg-foregroundDark dark:text-textBaseDark dark:focus:text-lavender" 
        placeholder={placeholder}
      />
      {type === "password" && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
          {!showPassword ? (
            <IoEyeOffOutline 
              className="cursor-pointer text-lg text-text dark:text-textBaseDark"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
              <IoEyeOutline 
                className="cursor-pointer text-lg text-text dark:text-textBaseDark"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
        </div>
      )}
    </motion.div>
  )
}

export default Input
