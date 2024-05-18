"use client";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Toaster } from "@/components/ui/toaster";

import Link from "@/components/custom/Link/Link";
import Input from "@/components/custom/Input/Input";

import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Button from "@/components/custom/Button/Button"
import { Button as BdButton } from "@/components/ui/button";
import DarkModeButton from "@/components/custom/DarkModeButton/DarkModeButton";

type FormProps = {
  name: string;
  surname: string;
  address: string;
  email: string;
  birthdate: string;
  password: string;
};

function RegisterForm() {
  const [formData, setFormData] = useState<FormProps>({
    name: "",
    surname: "",
    address: "",
    birthdate: "",
    email: "",
    password: "",
  });

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();

  const { toast } = useToast();

  useEffect(() => {
    const theme = localStorage.getItem("darkMode");

    if (theme === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const container = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,

      transition: {
        delayChildren: 0,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  async function handleForm(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })

    const data = await response.json()

    toast({
      title: data.type === "success" ? "Success" : "Error",
      description: data.message,
    });

    if (data.type === "success") {
      setTimeout(() => {
        setLoading(false);
        window.location.href = "/dashboard";
      }, 1000);
    }
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-base dark:bg-baseDark h-screen w-screen flex flex-col items-center justify-center transition-colors ease-out duration-300">
        <Toaster />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className={`relative bg-white dark:bg-foregroundDark w-[450px] min-h-[548px] py-8 px-12 border-lavender border-solid border-2 rounded-xl shadow-xl transition-colors ease-out duration-300`}
        >
          <DarkModeButton />  
          <>
            <motion.h1
              variants={item}
              className="font-bold text-textBase dark:text-textBaseDark text-2xl text-center mt-20 transition-colors ease-out duration-300"
            >
              Create your account
            </motion.h1>
            <form
              onSubmit={(e: React.FormEvent) => handleForm(e)}
              className="flex flex-col gap-6 mt-10"
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <Input
                  variantItem={item}
                  type="text"
                  placeholder="Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { target } = e;

                    setFormData({
                      ...formData,
                      name: target.value,
                    });
                  }}
                  required
                />
                <Input
                  variantItem={item}
                  type="text"
                  placeholder="Surname"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { target } = e;

                    setFormData({
                      ...formData,
                      surname: target.value,
                    });
                  }}
                  required
                />
              </div>
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
                type="text"
                placeholder="Address"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { target } = e;

                  setFormData({
                    ...formData,
                    address: target.value,
                  });
                }}
                required
              />

              <motion.div variants={item} className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <BdButton
                      variant={"outline"}
                      className={cn(
                        "w-full h-[52px] hover:text-text flex items-center justify-start dark:bg-foregroundDark text-text dark:text-textBaseDark focus:text-lavender dark:focus:text-lavender outline-none p-3 rounded-xl border-solid border-2 focus:border-primary transition-all ease-out duration-300",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : <span className="text-muted-foreground/60 text-sm">Birthday</span>}
                    </BdButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      defaultMonth={new Date(2000, 10)}
                      selected={date}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      onSelect={(date) => {
                        setDate(date);
                        setFormData({
                          ...formData,
                          birthdate: date?.toLocaleDateString()! 
                        });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </motion.div>

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

              <div className="flex flex-col">
                <motion.div
                  variants={item}
                >
                  <Button
                    type="submit"
                    isLoading={loading}
                    isDisabled={loading}
                  >
                    Create account
                  </Button>
                </motion.div>
                <motion.p
                  variants={item}
                  className="text-xs text-textBase dark:text-textBaseDark text-center mt-4 transition-colors ease-out duration-300"
                >
                  Already have an account? <Link href="/login" text="Log in" />
                </motion.p>
              </div>
            </form>
          </>
        </motion.div>
      </main>
    </div>
  );
}

export default RegisterForm
