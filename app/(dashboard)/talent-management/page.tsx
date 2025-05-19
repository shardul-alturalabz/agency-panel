'use client'
import { FilterButton, FilterSettings } from '@/components/talent-management/FilterButton';
import TalentHeader from '@/components/talent-management/TalentHeader'
import { TalentTable } from '@/components/talent-management/TalentTable'
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'

const sampleTalentData = [
  {
    id: "T001",
    name: "Priya Sharma",
    totalEarnings: 258000,
    totalStreams: 87,
    totalFollowers: 12500,
    totalPrivateCallDuration: 1850,
    avgStreamTime: 125,
    avgViewersPerStream: 340,
    avgDiamondsPerStream: 2800
  },
  {
    id: "T002",
    name: "Arjun Patel",
    totalEarnings: 185000,
    totalStreams: 65,
    totalFollowers: 9800,
    totalPrivateCallDuration: 1240,
    avgStreamTime: 110,
    avgViewersPerStream: 275,
    avgDiamondsPerStream: 2200
  },
  {
    id: "T003",
    name: "Neha Gupta",
    totalEarnings: 312000,
    totalStreams: 200,
    totalFollowers: 18200,
    totalPrivateCallDuration: 2100,
    avgStreamTime: 150,
    avgViewersPerStream: 420,
    avgDiamondsPerStream: 3500
  },
  {
    id: "T004",
    name: "Vikram Singh",
    totalEarnings: 170000,
    totalStreams: 58,
    totalFollowers: 7500,
    totalPrivateCallDuration: 980,
    avgStreamTime: 95,
    avgViewersPerStream: 210,
    avgDiamondsPerStream: 1800
  },
  {
    id: "T005",
    name: "Ananya Desai",
    totalEarnings: 290000,
    totalStreams: 92,
    totalFollowers: 15800,
    totalPrivateCallDuration: 1750,
    avgStreamTime: 115,
    avgViewersPerStream: 380,
    avgDiamondsPerStream: 3100
  },
  {
    id: "T006",
    name: "Rajiv Kumar",
    totalEarnings: 225000,
    totalStreams: 78,
    totalFollowers: 11200,
    totalPrivateCallDuration: 1520,
    avgStreamTime: 120,
    avgViewersPerStream: 310,
    avgDiamondsPerStream: 2500
  },
  {
    id: "T007",
    name: "Meera Joshi",
    totalEarnings: 340000,
    totalStreams: 110,
    totalFollowers: 21000,
    totalPrivateCallDuration: 2300,
    avgStreamTime: 45,
    avgViewersPerStream: 450,
    avgDiamondsPerStream: 3700
  },
  {
    id: "T008",
    name: "Rahul Verma",
    totalEarnings: 155000,
    totalStreams: 52,
    totalFollowers: 6800,
    totalPrivateCallDuration: 890,
    avgStreamTime: 90,
    avgViewersPerStream: 195,
    avgDiamondsPerStream: 1650
  },
  {
    id: "T009",
    name: "Divya Kapoor",
    totalEarnings: 275000,
    totalStreams: 88,
    totalFollowers: 14200,
    totalPrivateCallDuration: 1680,
    avgStreamTime: 135,
    avgViewersPerStream: 365,
    avgDiamondsPerStream: 2900
  },
  {
    id: "T010",
    name: "Karan Malhotra",
    totalEarnings: 205000,
    totalStreams: 71,
    totalFollowers: 10500,
    totalPrivateCallDuration: 1350,
    avgStreamTime: 105,
    avgViewersPerStream: 290,
    avgDiamondsPerStream: 2400
  }
];

const filterFields = [
  {
    name: "Total Earnings",
    field: "totalEarnings",
    min: 0,
    max: Math.max(...sampleTalentData.map(item => Number(item.totalEarnings))),
    step: 100,
    prefix: "₹"
  },
  {
    name: "Total Followers",
    field: "totalFollowers",
    min: 0,
    max: Math.max(...sampleTalentData.map(item => Number(item.totalFollowers))),
    step: 100
  }
];

const Page = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({});
  

  const onFilterChange = (filters: FilterSettings) => {
    setFilterSettings(filters);
  };

  return (
    <div className='flex flex-col text-white w-full gap-7 overflow-scroll'>
      <TalentHeader data={sampleTalentData}/>
      
      <div className='flex gap-4 px-5'>
        {/* Using our reusable FilterButton component */}
        <FilterButton
          data={sampleTalentData}
          onFilterChange={onFilterChange}
          fields={filterFields}
          initialFilters={filterSettings}
        />
        
        <Input 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)}  
          className='w-[35%] h-[2.5rem]' 
          placeholder='Search Creator'
        />
      </div>
      
      <div className='mt-8'>
        <TalentTable 
          searchValue={searchValue} 
          data={sampleTalentData}
          filterSettings={filterSettings}
        />
      </div>
    </div>
  )
}

export default Page;