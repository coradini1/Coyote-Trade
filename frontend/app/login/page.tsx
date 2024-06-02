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
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-base transition-colors duration-300 ease-out dark:bg-baseDark">
      <Card>
        <DarkModeButton />
        <MotionDiv item={item}>
          <h1 className="mt-20 text-center text-2xl font-bold text-textBase transition-colors duration-300 ease-out dark:text-textBaseDark">Access your account</h1>
        </MotionDiv>
        <LoginForm item={item} /> 
      </Card>
    </main>
  )
}
