"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/login";
  }, []);
  return (
    <main style={{ display: "none" }}>
      <Link href="/login">login</Link>
      <Link href="/register">register</Link>
    </main>
  );
}
