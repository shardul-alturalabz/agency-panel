"use client";
import { ChartBar } from "@/components/main/ChartBar";
import ChartPie from "@/components/main/ChartPie";
import TitleCard from "@/components/main/TiltleCard";
import { BadgeWithHeader } from "@/components/ui/badge-with-header";
import badge from "../../../public/badgeleader.png";
import React, { useState } from "react";
import Image from "next/image";
import { ChartHorizontal } from "@/components/main/ChartHorizontal";
import NotificationFilters from "@/components/notification/NotificationFilters";
import { Copy } from "lucide-react";
import { useMenuStore } from "@/zustand/stores/useMenuStore";
import { toast } from "sonner";

const filters = ["This year", "Last month", "This month", "This week"];

const Page = () => {
  const [activeFilter, setActiveFilter] = useState<string>("This year");
  const setMenu = useMenuStore((state)=> state.setIndex);

  return (
    <div className="w-full bg-black text-white overflow-auto">
      <div className="border-white/15 border-b-2 w-full p-4 pb-1 flex justify-between  items-center">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Agency Panel</h1>
        <div className="flex items-center gap-10">
          <div onClick={()=>{navigator.clipboard.writeText("https://play.google.com/store/apps/details?id=app.salsayou.android&pli=1"); toast.info("Copied the link")}} className="bg-[#404040] flex gap-3 p-3 mb-1.5 rounded-lg cursor-pointer">
            <Copy />
            Copy app link to invite creators
          </div>
          <p onClick={()=> setMenu(2)}  className="text-[#1A88FF] underline cursor-pointer text-lg pr-2">
            Send feedback
          </p>
        </div>
      </div>
      <div className="p-6 pl-3 flex flex-col gap-3 h-full">
        <NotificationFilters
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <div className="flex gap-x-4 flex-wrap gap-y-4">
          <BadgeWithHeader type="price" price={' --'} text="Total earnings" />
          <BadgeWithHeader type="price" price={' --'} text="Average earnings" />
          <BadgeWithHeader type="text" price={' --'} text="Creators onboard" />
          <BadgeWithHeader
            type="text"
            price={' --'}
            text="Avg stream time"
          />
        </div>
        <div className="flex gap-x-4">
          <div className="w-[50%] flex-col bg-[#1e1e1e] h-[36vh] pb-5 px-1 border-0 rounded-2xl">
            <TitleCard text="Total earnings"></TitleCard>
            {/* <div className="flex justify-center gap-6">
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
            <ChartBar /> */}
            <div className='flex items-center opacity-45 justify-center mt-4'>
                No Data found
            </div>
          </div>
          <div className="w-[50%] bg-[#1e1e1e] h-[36vh] h-min-fit pb-5 px-1 flex flex-col  rounded-2xl">
            <TitleCard text="Revenue source"></TitleCard>
            <div className="flex h-full">
              <div className="flex flex-col w-[30%] ml-12 mt-6 gap-8">
                <div className="flex items-center gap-2">
                  <div className="size-4 border-0  bg-[#e85414]"></div>
                  <p>Gifts</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 border-0  bg-[#61C4C7]"></div>
                  <p>Private Calls</p>
                </div>
              </div>
              <div className="w-[60%] h-full flex">
                {/* <ChartPie /> */}
                <div className="size-56 rounded-full flex ml-32 mt-6 items-center justify-center text-white/80 bg-[#e85414] border-0">
                  No data found
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[32vh] gap-3 flex">
          <div className="w-1/3 flex flex-col pb-[3.5rem] rounded-2xl h-full bg-[#1e1e1e]">
            <TitleCard text="Most watched category" />
            {/* <ChartHorizontal /> */}
            <div className='flex items-center opacity-45 justify-center mt-4'>
                No Data found
            </div>
          </div>
          <div className="w-1/3 h-full bg-[#1e1e1e] rounded-2xl pb-3 flex flex-col">
            <TitleCard text="LeaderBoard" />
            <div className="flex px-8 justify-between my-2 text-white/40 text-[0.6vw] max-lg:px-2 ">
              <div className="w-[8%] flex"></div>
              <div className="w-[22%]">Creator</div>
              <div className="w-[20%] pl-2">Earned</div>
              <div className="w-[30%]">Avg Stream Time</div>
            </div>
            <div className="overflow-scroll">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex px-8 justify-between max-lg:px-2 my-2  text-[0.7vw]"
                >
                  <div className="w-[8%] flex">
                    <Image
                      src={badge}
                      alt="medal"
                      className="object-fill"
                    ></Image>
                  </div>
                  <p className="w-[22%] text-wrap">-</p>
                  <div className="w-[20%] px-2">-</div>
                  <div className="w-[30%]">-</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/3 bg-[#1e1e1e] flex h-full flex-col pb-3 rounded-2xl">
            <TitleCard text="⚠️ Flags / Warnings" />
            <div className="mt-2 overflow-scroll flex flex-col pb-2.5 gap-2">
              {/* {[...Array(3)].map((_, index) => (
                <p key={index} className="text-wrap px-6 text-[0.9vw]">
                  -
                  <br />
                  <span className="opacity-40">-</span>
                </p>
              ))} */}
              <div className='flex items-center opacity-45 justify-center mt-4'>
                No Data found
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
