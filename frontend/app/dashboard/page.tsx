"use client";
import React, { useState, useEffect } from "react";
import UserCard from "@/components/custom/UserCard/UserCard";
import Orders from "@/components/custom/Orders/Orders";
import Portfolio from "@/components/custom/Portfolio/Portfolio";
import Investments from "@/components/custom/Investments/Investments";

export default function Page() {
  const [user, setUser] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const userData = await response.json();

      if (
        (userData?.user?.role !== "admin" && userData?.user?.role !== "user") ||
        !userData
      ) {
        return (window.location.href = "/login");
      }

      setUser(userData.user);
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Portfolio />
          <UserCard userData={user}/>
        </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Investments />
          <Orders />
        </div>
      </div>
    </div>
  );
}
