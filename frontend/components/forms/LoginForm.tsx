"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "@/components/custom/Link/Link";
import Input from "@/components/custom/Input/Input";
import Button from "@/components/custom/Button/Button";

type FormProps = {
  email: string;
  password: string;
  persist?: boolean;
};

function LoginForm({ item }: any) {
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormProps>({
    email: "",
    password: "",
    persist: false,
  });


  async function handleForm(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await response.json();

      document.cookie = `token=${data.token}; path=/;`;


      if (!response.ok) {
        setLoading(false);
        throw new Error("Login failed. Please try again.");
      }
      if (data.type === "success") {
        localStorage.setItem('user', data.user); 
        window.location.href = "/admin";
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");

      console.log(error);
    }
  }
  return (
    <form
      onSubmit={(e: React.FormEvent) => handleForm(e)}
      className="mt-10 flex flex-col gap-6"
    >
      <ToastContainer />

      <Input
        variantItem={item}
        type="email"
        placeholder="Email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { target } = e;

          setFormData({
            ...formData,
            email: target.value,
          });
        }}
        required
      />
      <Input
        variantItem={item}
        type="password"
        placeholder="Password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { target } = e;

          setFormData({
            ...formData,
            password: target.value,
          });
        }}
        required
      />

      <motion.div
        variants={item}
        className="mb-12 flex flex-row items-center justify-between gap-2"
      >
        <div className="flex flex-row items-center gap-1">
          <Checkbox
            id="remember-password"
            onCheckedChange={(e: boolean) =>
              setFormData({ ...formData, persist: e })
            }
          />
          <Label
            htmlFor="remember-password"
            className="text-xs transition-colors duration-300 ease-out dark:text-textBaseDark"
          >
            Remember
          </Label>
        </div>
      </motion.div>

      <div className="flex flex-col">
        <motion.div variants={item}>
          <Button type="submit" isLoading={loading} isDisabled={loading}>
            Login
          </Button>
        </motion.div>
        <motion.p
          variants={item}
          className="mt-4 text-center text-xs text-textBase transition-colors duration-300 ease-out dark:text-textBaseDark"
        >
          New here? <Link href="/register" text="Create an account" />
        </motion.p>
      </div>
    </form>
  );
}

export default LoginForm;
