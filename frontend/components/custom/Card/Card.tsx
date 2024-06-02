"use client"
import React from "react"
import { motion } from "framer-motion"

interface CardProps {
  isCentered?: boolean;
  fitContent?: boolean;
  children: React.ReactNode;
}

const container = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,

      transition: {
        delayChildren: 0,
        staggerChildren: 0.2
      }
    }
  }

function Card({ isCentered, fitContent, children }: CardProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={container} className={`${isCentered && "flex flex-col justify-center"} relative bg-white dark:bg-foregroundDark ${!fitContent ? "min-h-[548px] w-[450px]" : "h-fit w-fit" } rounded-xl border-2 border-solid border-lavender px-12 py-8 shadow-xl transition-colors duration-300 ease-out`}>
      {children}
    </motion.div>
  )
}

export default Card
