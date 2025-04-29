'use client'
import { ChartBar } from "@/components/main/ChartBar";
import ChartPie from "@/components/main/ChartPie";
import TitleCard from "@/components/main/TiltleCard";
import { BadgeWithHeader } from "@/components/ui/badge-with-header";
import badge from '../../../public/badgeleader.png'
import React, { useState } from "react";
import Image from "next/image";
import { ChartHorizontal } from "@/components/main/ChartHorizontal";
import NotificationFilters from "@/components/notification/NotificationFilters";

const filters = [
  'This year',
  'Last month',
  "This month",
  'This week',
];


const Page = () => {
  const [activeFilter, setActiveFilter] = useState<string>('This year');

  return (
    <div className="w-full bg-black text-white overflow-scroll">
      <div className="border-white/15 border-b-2 w-full p-4 pb-1">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Agency Panel</h1>
      </div>
      <div className="p-6 flex flex-col gap-3 h-full">
      <NotificationFilters
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <div className="flex gap-x-4 flex-wrap">
          <BadgeWithHeader type="price" price={24000} text="Total earnings" />
          <BadgeWithHeader type="price" price={5670} text="Average earnings" />
          <BadgeWithHeader type="text" price={52} text="Creators onboard" />
          <BadgeWithHeader type="text" price={24 + "min"} text="Avg stream time" />
        </div>
        <div className="flex gap-x-4">
          <div className="w-[50%] flex-col bg-[#1e1e1e] pb-5 px-1 h-[23rem] border-0 rounded-2xl">
            <TitleCard text="Total earnings"></TitleCard>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-1">
                <div className="size-4 border-0 bg-[grey]"></div>
                <p>Previous month</p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <div className="size-4 border-0  bg-[#e85414]"></div>
                  <p>Current month</p>
                </div>
              </div>
            </div>
            <div></div>
            <ChartBar />
          </div>
          <div className="w-[50%] bg-[#1e1e1e] h-[23rem] h-min-fit pb-5 px-1 flex flex-col  rounded-2xl">
            <TitleCard text="Revenue source"></TitleCard>
            <div className="flex h-full">
              <div className="flex flex-col w-[30%] ml-12 mt-6 gap-8">
                <div className="flex items-center gap-2">
                  <div className="size-4 border-0  bg-[#e85414]"></div>
                  <p>Streaming</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 border-0  bg-[#FEBE24]"></div>
                  <p>Private calls</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 border-0  bg-[#61C4C7]"></div>
                  <p>Private chats</p>
                </div>
              </div>
              <div className="w-[60%] h-full flex">
                  <ChartPie/>
              </div>
            </div>
          </div>
        </div>
          <div className="w-full gap-3 flex">
            <div className="w-1/3 flex rounded-2xl">
                <ChartHorizontal/>
            </div>
            <div className="w-1/3 bg-[#1e1e1e] rounded-2xl flex flex-col">
              <TitleCard text="LeaderBoard"/>
              <div className="flex px-8 justify-between my-2 text-white/40">
                <div className="w-[10%] flex"></div>
                <div className="w-[20%]">Creator</div>
                <div className="w-[20%]">Earned</div>
                <div className="w-[30%]">Avg Stream Time</div>
              </div>
              <div className="overflow-scroll">
              {[...Array(3)].map((_, index)=><div key={index} className="flex px-8 justify-between my-2">
                <div className="w-[10%] flex"><Image src={badge} alt="medal" className=""></Image></div>
                <p className="w-[20%] text-wrap">Simran makeup</p>
                <div className="w-[20%] px-2">₹3,10,000</div>
                <div className="w-[30%]">21 hrs/week</div>
              </div>)}
              </div>
            </div>
            <div className="w-1/3 bg-[#1e1e1e] rounded-2xl">
              <TitleCard text="⚠️ Flags / Warnings"/>
              <div className="mt-2 overflow-scroll h-full">
                {[...Array(3)].map((_, index)=><p key={index} className="text-wrap px-6 text-lg mt-2">Riya_traveldiaries – Low stream time this week (6 hrs)<br/><span className="opacity-40">Apr 12</span></p>)}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Page;
