"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Toaster } from "@/components/ui/toaster"

import Link from "@/components/custom/Link/Link"
import Input from "@/components/custom/Input/Input"
import Card from "@/components/custom/Card/Card"
import Spinner from "@/components/custom/Spinner/Spinner"
import DarkModeButton from "@/components/custom/DarkModeButton/DarkModeButton"
import BackButton from "@/components/custom/BackButton/BackButton"

type FormProps = {
  email: string
  password: string
  persist?: boolean
}

export default function Home() {
  const [formData, setFormData] = useState<FormProps>({
    email: "",
    password: "",
    persist: false
  })

  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isResetingPassword, setIsResetingPassword] = useState<boolean>(false)

  const { toast } = useToast()

  useEffect(() => {
    const theme = localStorage.getItem("darkMode")

    if (theme === "true") {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [])

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  async function handleForm(e: React.FormEvent) {
    e.preventDefault()

    console.log(formData)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })

    const data = await response.json()

    document.cookie = `token=${data.token}; path=/;`

    toast({
      title: data.type === "success" ? "Success" : "Error",
      description: data.message,
    });

    if (data.type === "success") {
      window.location.href = "/admin"
    }
  }

  function handleResetPassword() {
    setLoading(true)
    setIsResetingPassword(true)

    setTimeout(() => {
      setLoading(false)
    }, 600)
  }

  function handleDarkMode() {
    localStorage.setItem("darkMode", String(!darkMode))
    setDarkMode(!darkMode)
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-base dark:bg-baseDark h-screen w-screen flex flex-col items-center justify-center transition-colors ease-out duration-300">
        <Toaster />
        <Card isCentered={isResetingPassword}>
          <DarkModeButton handleDarkMode={handleDarkMode} isDarkMode={darkMode} />
          { !loading ?
            (
              <>
                { !isResetingPassword ? 
                  (
                    <>  
                      <motion.h1 variants={item} className="font-bold text-textBase dark:text-textBaseDark text-2xl text-center mt-20 transition-colors ease-out duration-300">Access your account</motion.h1>
                      <form onSubmit={(e: React.FormEvent) => handleForm(e)}  className="flex flex-col gap-6 mt-10">
                        <Input 
                          variantItem={item}
                          type="email"
                          placeholder="Email"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const { target } = e

                            setFormData({
                              ...formData,
                              email: target.value,
                            })
                          }}
                          required
                        />
                        <Input
                          variantItem={item}
                          type="password"
                          placeholder="Password"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const { target } = e

                            setFormData({
                              ...formData,
                              password: target.value,
                            })
                          }}
                          required
                        />

                        <motion.div variants={item} className="flex flex-row justify-between items-center gap-2 mb-12">
                          <div className="flex flex-row items-center gap-1">
                            <Checkbox
                              id="remember-password"
                              onCheckedChange={(e: boolean) => setFormData({...formData, persist: e})}
                            />
                            <Label htmlFor="remember-password" className="text-xs dark:text-textBaseDark transition-colors ease-out duration-300">Remember</Label>
                          </div>
                          <Link onClick={handleResetPassword} href="#" text="Reset password" />
                        </motion.div>

                        <div className="flex flex-col">
                          <motion.button 
                            variants={item}
                            type="submit"
                            className="bg-lavender py-4 px-2 font-medium text-white rounded-xl hover:bg-lavender-500 transition ease-out duration-200"
                          >
                            Login
                          </motion.button>
                          <motion.p variants={item} className="text-xs text-textBase dark:text-textBaseDark text-center mt-4 transition-colors ease-out duration-300">
                            New here? <Link href="/register" text="Create an account" />
                          </motion.p>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <BackButton action={() => {
                        setIsResetingPassword(false)
                      }} /> 
                      <motion.h1 variants={item} className={`font-bold text-textBase dark:text-textBaseDark text-2xl text-center ${!isResetingPassword && "mt-20"} transition-colors ease-out duration-300`}>Type your email to reset your password</motion.h1>
                      <form onSubmit={(e: React.FormEvent) => handleForm(e)}  className="flex flex-col gap-6 mt-10">
                        <Input
                          variantItem={item}
                          type="email"
                          placeholder="Email"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const { target } = e

                            setFormData({
                              ...formData,
                              email: target.value,
                            })
                          }}
                          required
                        />

                        <motion.button
                          variants={item}
                          type="submit"
                          className="bg-lavender py-4 px-2 font-medium text-white rounded-xl hover:bg-lavender-500 transition ease-out duration-200"
                        >
                          Reset password
                        </motion.button>
                      </form>
                    </>
                  )}
              </>
            ) : (<Spinner />)}
        </Card>
      </main>
    </div>
  )
}
