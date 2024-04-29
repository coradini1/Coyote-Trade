'use client'
import React, { useEffect, useState } from "react"

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"
import { Toaster } from "@/components/ui/toaster"

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
  const { toast } = useToast()

  function handleForm(e: React.FormEvent) {
    e.preventDefault()

    toast({
      title: "Test notification",
      description: "I'm testing the notification system"
    })
    console.log(formData)
  }

  return (
    <main className="bg-base h-screen w-screen flex flex-col items-center justify-center">
      <Toaster />
      <div className="bg-white w-[450px] py-8 px-12 border-lavender border-solid border-2 rounded-xl shadow-xl">
        <h1 className="font-bold text-textBase text-2xl text-center mt-20">Access your account</h1>
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
              <Label htmlFor="remember-password" className="text-xs">Remember</Label>
            </div>
            <Link href="/forgot-password" text="Reset password" />
          </div>

          <div className="flex flex-col">
            <button 
              type="submit"
              className="bg-lavender-400 py-4 px-2 font-medium text-white rounded-xl hover:bg-lavender-500 transition ease-out duration-200"
            >
              Login
            </button>
            <p className="text-xs text-textBase text-center mt-4">
              New here? <Link href="/register" text="Create an account" />
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

function Link({ href, text }: { href: string, text: string}) {
  return (
    <a 
      href={href}
      className="relative text-lavender-400 text-xs after:content-[''] after:absolute after:w-0 after:h-[2px]
                after:bottom-0 after:left-0 after:bg-lavender after:transition-all after:duration-300 after:ease-out
                hover:after:w-full hover:after:transition-all hover:after:duration-300 hover:after:ease-out"
    >
      {text}
    </a>
  )
}

