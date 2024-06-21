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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <Portfolio />
        </div>
        <div className="md:col-span-1 space-y-4">
          <UserCard userData={user} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <Investments />
        </div>
        <div className="space-y-4">
          <Orders />
        </div>
      </div>
    </div>
  );
}
