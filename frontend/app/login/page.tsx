import React from "react"

import Card from "@/components/custom/Card/Card"
import DarkModeButton from "@/components/custom/DarkModeButton/DarkModeButton"
import LoginForm from "@/components/forms/LoginForm"
import MotionDiv from "@/components/custom/MotionDiv/MotionDiv"

export default function Home() {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <main className="bg-base dark:bg-baseDark h-screen w-screen flex flex-col items-center justify-center transition-colors ease-out duration-300">
      <Card>
        <DarkModeButton />
        <MotionDiv item={item}>
          <h1 className="font-bold text-textBase dark:text-textBaseDark text-2xl text-center mt-20 transition-colors ease-out duration-300">Access your account</h1>
        </MotionDiv>
        <LoginForm item={item} /> 
      </Card>
    </main>
  )
}
