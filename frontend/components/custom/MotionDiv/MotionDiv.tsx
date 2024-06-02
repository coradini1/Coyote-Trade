"use client"
import React from "react"
import { motion } from "framer-motion"

function MotionDiv({ children, item }: any) {
  return(
    <motion.div variants={item}>
      {children}
    </motion.div>
  )
}

export default MotionDiv
