"use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import React from "react";

export default function AuthUserProvider({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
