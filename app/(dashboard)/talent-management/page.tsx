"use client";
import {
  FilterButton,
  FilterSettings,
} from "@/components/talent-management/FilterButton";
import TalentHeader from "@/components/talent-management/TalentHeader";
import { TalentTable } from "@/components/talent-management/TalentTable";
import { Input } from "@/components/ui/input";
import { useFetchTalentData } from "@/hooks/useFetchInsights";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Page = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({});
  const { sampleTalentData, fetchData, loading, error } = useFetchTalentData();
  const token = Cookies.get("token");

  const filterFields = [
    {
      name: "Total Earnings",
      field: "totalEarnings",
      min: 0,
      max: Math.max(
        ...sampleTalentData.map((item) => Number(item.totalEarnings))
      ),
      step: 100,
      prefix: "₹",
    },
    {
      name: "Total Followers",
      field: "totalFollowers",
      min: 0,
      max: Math.max(
        ...sampleTalentData.map((item) => Number(item.totalFollowers))
      ),
      step: 100,
    },
  ];

  const onFilterChange = (filters: FilterSettings) => {
    setFilterSettings(filters);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col text-white w-full gap-7 overflow-scroll">
      <TalentHeader data={sampleTalentData} />

      <div className="flex gap-4 px-5">
        <FilterButton
          data={sampleTalentData}
          onFilterChange={onFilterChange}
          fields={filterFields}
          initialFilters={filterSettings}
        />

        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[35%] h-[2.5rem]"
          placeholder="Search Creator"
        />
      </div>

      <div className="mt-8">
        <TalentTable
          searchValue={searchValue}
          data={sampleTalentData}
          filterSettings={filterSettings}
        />
      </div>
    </div>
  );
};

export default Page;
