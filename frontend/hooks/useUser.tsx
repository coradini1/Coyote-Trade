"use client";
import React, { useEffect, useState } from "react";
interface UserResponse {
  status: string;
  user: {
    name: string;
    surname: string;
    email: string;
    address: string;
    role: string;
    birthdate: string;
  };
}
export function useUser() {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("");
        }
        const userDataObj: UserResponse = await response.json();
        setUserData(userDataObj);
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, []);

  return { userData };
}
