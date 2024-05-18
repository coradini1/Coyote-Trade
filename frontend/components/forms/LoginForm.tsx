"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

import Link from "@/components/custom/Link/Link"
import Input from "@/components/custom/Input/Input"
import Button from "@/components/custom/Button/Button"

type FormProps = {
  email: string
  password: string
  persist?: boolean
}

function LoginForm({ item }: any) {
  const [formData, setFormData] = useState<FormProps>({
    email: "",
    password: "",
    persist: false
  })
  
  const { toast } = useToast()

  async function handleForm(e: React.FormEvent) {
    e.preventDefault()
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
  return (
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
      </motion.div>

      <div className="flex flex-col">
        <motion.div variants={item}>
          <Button 
            type="submit"
          >
            Login 
          </Button>
        </motion.div>
        <motion.p variants={item} className="text-xs text-textBase dark:text-textBaseDark text-center mt-4 transition-colors ease-out duration-300">
          New here? <Link href="/register" text="Create an account" />
        </motion.p>
      </div>
    </form>
  )
}

export default LoginForm
