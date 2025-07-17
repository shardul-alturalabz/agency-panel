import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { ReactNode } from "react";

interface CreatorDetails {
  basicDetails: {
    name: string;
    mobile: string;
    email: string;
  };
  appInteraction: {
    totalEarnings: string;
    totalStreamHours: number;
    reports: number;
    avgViewersPerStream: number;
  };
  moreDetails: {
    interactions: {
      likes: number;
      comments: number;
      shares: number;
    };
    followers: string;
    privateChats: number;
    privateCalls: number;
    giftsPerPrivateChat: number;
  };
}

const creatorData: CreatorDetails = {
  basicDetails: {
    name: "Vishwanath Anand",
    mobile: "+91-9876543210",
    email: "loremipusm@lorem.com",
  },
  appInteraction: {
    totalEarnings: "₹35340",
    totalStreamHours: 325,
    reports: 0,
    avgViewersPerStream: 54,
  },
  moreDetails: {
    interactions: {
      likes: 24,
      comments: 36,
      shares: 36,
    },
    followers: "6k",
    privateChats: 30,
    privateCalls: 12,
    giftsPerPrivateChat: 12,
  },
};

interface SideSheetProps {
  children: ReactNode;
}

export function SideSheet({ children }: SideSheetProps) {
  const onRemoveCreator = () => {
    console.log("Creator removed");
  };
  return (
    <Sheet>
      {children}
      <SheetContent className="bg-[#121212] text-white p-0 border-none overflow-scroll">
        <div className="flex flex-col">
          <SheetHeader className="pl-4 py-6 flex flex-row justify-between items-center">
            <SheetTitle className="text-white text-xl font-semibold">
              Host / creator details
            </SheetTitle>
          </SheetHeader>

          <div className="px-6 pb-4 flex flex-col gap-14">
            <div>
              <h3 className="text-white text-md mb-2">Basic details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Creator name</span>
                  <span className="text-white">
                    {creatorData.basicDetails.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mobile number</span>
                  <span className="text-white">
                    {creatorData.basicDetails.mobile}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email address</span>
                  <span className="text-white">
                    {creatorData.basicDetails.email}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white text-md mb-2">Interaction on app</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total earnings</span>
                  <span className="text-white">
                    {creatorData.appInteraction.totalEarnings}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total stream hours</span>
                  <span className="text-white">
                    {creatorData.appInteraction.totalStreamHours}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Report</span>
                  <span className="text-white">
                    {creatorData.appInteraction.reports}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg viewers per stream</span>
                  <span className="text-white">
                    {creatorData.appInteraction.avgViewersPerStream}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white text-md mb-2">More details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total interactions</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{creatorData.moreDetails.interactions.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>
                        {creatorData.moreDetails.interactions.comments}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Share2 className="h-4 w-4 mr-1" />
                      <span>{creatorData.moreDetails.interactions.shares}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total followers</span>
                  <span className="text-white">
                    {creatorData.moreDetails.followers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total private chat</span>
                  <span className="text-white">
                    {creatorData.moreDetails.privateChats}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total private calls</span>
                  <span className="text-white">
                    {creatorData.moreDetails.privateCalls}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Gifts received per private chat
                  </span>
                  <span className="text-white">
                    {creatorData.moreDetails.giftsPerPrivateChat}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              {/* <button
                className="cursor-pointer text-white text-sm font-medium border-0 py-1.5 px-2 rounded-lg bg-red-600/90 border-none text-left"
                onClick={onRemoveCreator}
              >
                Remove creator
              </button> */}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
