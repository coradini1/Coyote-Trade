"use client";
import React from "react";
import { useUser } from "@/hooks/useUser";

function UserCard() {
  const { userData }: any = useUser();
  return (
    <div>
      <h1> {userData?.user.name}</h1>
    </div>
  );
}
export default UserCard;
