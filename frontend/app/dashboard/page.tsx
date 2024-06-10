"use client";
import React from "react";
import UserCard from "@/components/custom/UserCard/UserCard";
import Orders from "@/components/custom/Orders/Orders";
import Portfolio from "@/components/custom/Portfolio/Portfolio";
import Investments from "@/components/custom/Investments/Investments";
export default function Page() {
  return (
    <div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Portfolio />
          <UserCard />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Investments />
          <Orders />
        </div>
      </div>
    </div>
  );
}
