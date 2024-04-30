'use client'
import React, { useEffect, useState } from "react"

import { MdSunny } from "react-icons/md"
import { IoMdArrowBack, IoMdMoon } from "react-icons/io"


import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Toaster } from "@/components/ui/toaster"

import Link from "@/components/custom/Link/Link"
import Input from "@/components/custom/Input/Input"

import { useToast } from "@/components/ui/use-toast"

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

  function handleForm(e: React.FormEvent) {
    e.preventDefault()

    toast({
      title: "Test notification",
      description: "I'm testing the notification system"
    })
    console.log(formData)
  }

  function handleResetPassword() {
    setLoading(true)
    setIsResetingPassword(true)

    setTimeout(() => {
      setLoading(false)
    }, 600)
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-base dark:bg-baseDark h-screen w-screen flex flex-col items-center justify-center transition-colors ease-out duration-300">
        <Toaster />
        <div className={`${isResetingPassword && "flex flex-col justify-center"} relative bg-white dark:bg-foregroundDark w-[450px] min-h-[548px] py-8 px-12 border-lavender border-solid border-2 rounded-xl shadow-xl transition-colors ease-out duration-300`}>
          <button 
            className="absolute top-4 right-4 w-10 flex flex-col items-center bg-lavender text-white py-2 px-4 rounded-full"
            onClick={() => {
              localStorage.setItem("darkMode", String(!darkMode))
              setDarkMode(!darkMode)
            }}
          >
            {!darkMode ? (<MdSunny className="text-2xl" />) : (<IoMdMoon className="text-2xl" />)}
          </button>
          { !loading ?
            (
              <>
                { !isResetingPassword ? 
                  (
                    <>  
                      <h1 className="font-bold text-textBase dark:text-textBaseDark text-2xl text-center mt-20 transition-colors ease-out duration-300">Access your account</h1>
                      <form onSubmit={(e: React.FormEvent) => handleForm(e)}  className="flex flex-col gap-6 mt-10">
                        <Input 
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

                        <div className="flex flex-row justify-between items-center gap-2 mb-12">
                          <div className="flex flex-row items-center gap-1">
                            <Checkbox
                              id="remember-password"
                              onCheckedChange={(e: boolean) => setFormData({...formData, persist: e})}
                            />
                            <Label htmlFor="remember-password" className="text-xs dark:text-textBaseDark transition-colors ease-out duration-300">Remember</Label>
                          </div>
                          <Link onClick={handleResetPassword} href="#" text="Reset password" />
                        </div>

                        <div className="flex flex-col">
                          <button 
                            type="submit"
                            className="bg-lavender py-4 px-2 font-medium text-white rounded-xl hover:bg-lavender-500 transition ease-out duration-200"
                          >
                            Login
                          </button>
                          <p className="text-xs text-textBase dark:text-textBaseDark text-center mt-4 transition-colors ease-out duration-300">
                            New here? <Link href="/register" text="Create an account" />
                          </p>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <button className="absolute top-4 left-4 w-fit flex flex-col items-center  py-2 px-4" onClick={() => setIsResetingPassword(false)}>
                        <span className="flex flex-row gap-3 hover:gap-2 transition-all ease-out duration-300 text-text dark:text-textBaseDark">
                          <IoMdArrowBack className="text-2xl" /> <p>Back</p>
                        </span>
                      </button>
                      <h1 className={`font-bold text-textBase dark:text-textBaseDark text-2xl text-center ${!isResetingPassword && "mt-20"} transition-colors ease-out duration-300`}>Type your email to reset your password</h1>
                      <form onSubmit={(e: React.FormEvent) => handleForm(e)}  className="flex flex-col gap-6 mt-10">
                        <Input 
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

                        <button 
                          type="submit"
                          className="bg-lavender py-4 px-2 font-medium text-white rounded-xl hover:bg-lavender-500 transition ease-out duration-200"
                        >
                          Reset password
                        </button>
                      </form>
                    </>
                  )}
              </>
            ) : (<Spinner />)}
        </div>
      </main>
    </div>
  )
}

const Spinner = () => {
  return (
    <div className="flex justify-center items-center" role="status">
      <svg aria-hidden="true" className="spinner w-11 h-11 text-gray-200 animate-spin dark:text-gray-600 fill-lavender" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>
  )
}
