import React from "react"
import { motion } from "framer-motion"

interface CardProps {
  isCentered?: boolean;
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

function Card({ isCentered, children }: CardProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={container} className={`${isCentered && "flex flex-col justify-center"} relative bg-white dark:bg-foregroundDark w-[450px] min-h-[548px] py-8 px-12 border-lavender border-solid border-2 rounded-xl shadow-xl transition-colors ease-out duration-300`}>
      {children}
    </motion.div>
  )
}

export default Card
