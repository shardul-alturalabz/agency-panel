'use client'
import { useEffect } from "react";
import { useFetchTalentData } from "@/hooks/useFetchInsights";
import Cookies from "js-cookie";

export default function TalentDataLoader() {
  const { fetchData } = useFetchTalentData();

  useEffect(() => {
    // Only fetch data if user is logged in (token exists)
    if (Cookies.get('token')) {
      fetchData();
    }
  }, []);

  return null;
}
