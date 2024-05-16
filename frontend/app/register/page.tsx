"use client";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

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
import { Button } from "@/components/ui/button"

type FormProps = {
  name: string;
  surname: string;
  address: string;
  email: string;
  birthdate: string;
  password: string;
};

export default function Home() {
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
  const [isResetingPassword, setIsResetingPassword] = useState<boolean>(false);
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
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        window.location.href = "/admin";
      }, 2000);
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
          className={`${
isResetingPassword && "flex flex-col justify-center"
} relative bg-white dark:bg-foregroundDark w-[450px] min-h-[548px] py-8 px-12 border-lavender border-solid border-2 rounded-xl shadow-xl transition-colors ease-out duration-300`}
        >
          <button
            className="absolute top-4 right-4 w-10 flex flex-col items-center bg-lavender text-white py-2 px-4 rounded-full"
            onClick={() => {
              localStorage.setItem("darkMode", String(!darkMode));
              setDarkMode(!darkMode);
            }}
          >
            {!darkMode ? (
              <MdSunny className="text-2xl" />
            ) : (
                <IoMdMoon className="text-2xl" />
              )}
          </button>
          {!loading ? (
            <>
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
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-[52px] hover:text-text flex items-center justify-start dark:bg-foregroundDark text-text dark:text-textBaseDark focus:text-lavender dark:focus:text-lavender outline-none p-3 rounded-xl border-solid border-2 focus:border-primary transition-all ease-out duration-300",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date ? format(date, "PPP") : <span className="text-muted-foreground/60 text-sm">Birthday</span>}
                        </Button>
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
                    <motion.button
                      variants={item}
                      type="submit"
                      className="bg-lavender py-4 px-2 font-medium text-white rounded-xl hover:bg-lavender-500 transition ease-out duration-200"
                    >
                      Register
                    </motion.button>
                    <motion.p
                      variants={item}
                      className="text-xs text-textBase dark:text-textBaseDark text-center mt-4 transition-colors ease-out duration-300"
                    >
                      Already have an account? <Link href="/login" text="Log in" />
                    </motion.p>
                  </div>
                </form>
              </>
            </>
          ) : (
              <Spinner />
            )}
        </motion.div>
      </main>
    </div>
  );
}

const Spinner = () => {
  return (
    <div className="flex justify-center items-center" role="status">
      <svg
        aria-hidden="true"
        className="spinner w-11 h-11 text-gray-200 animate-spin dark:text-gray-600 fill-lavender"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
};
