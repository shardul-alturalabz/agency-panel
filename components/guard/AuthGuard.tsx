"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.replace("/unauthorized");
    } else {
      setIsAuthenticated(true);
    }

    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    // Optionally add a spinner/loading indicator here
    return null;
  }

  if (!isAuthenticated) {
    return null; // Prevent render before redirect
  }

  return <>{children}</>;
}
