'use client'
import { useEffect } from "react";
import { useFetchTalentData } from "@/hooks/useFetchInsights";
import Cookies from "js-cookie";

export default function TalentDataLoader() {
  const { fetchData } = useFetchTalentData();

  useEffect(() => {
    if (Cookies.get('token')) {
      fetchData();
    }
  }, []);

  return null;
}
