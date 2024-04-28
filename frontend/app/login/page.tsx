'use client';
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
      <div className="bg-white w-[450px] py-8 px-12 rounded-xl shadow-xl">
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
            value={formData?.email || ""}
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
            value={formData?.password || ""}
            required
          />

          <div className="flex flex-row items-center gap-2 mb-12">
            <Checkbox
              id="remember-password"
              onCheckedChange={(e: boolean) => setFormData({...formData, persist: e})}
            />
            <Label htmlFor="remember-password" className="text-xs">Remember</Label>
          </div>
          <button 
            type="submit"
            className="bg-primary hover:bg-primary py-4 px-2 font-medium text-white rounded-xl hover:brightness-125 transition ease-out dduration-200"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
