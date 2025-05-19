"use client";

import NotificationFilters from "@/components/notification/NotificationFilters";
import NotificationsList from "@/components/notification/NotificationsList";
import { useState } from "react";

const notifications = [
  {
    id: "1",
    title: "Payout of ₹50,000 processed successfully!",
    type: "payout",
    timestamp: "26-03-2025 10:36pm",
    description:
      "Your payment has been transferred to your registered bank account. Expected to reflect in 2-3 business days.",
  },
  {
    id: "2",
    title: "Samuel just crossed 10,000 followers! 🎉",
    type: "milestone",
    timestamp: "26-03-2025 10:36pm",
  },
  {
    id: "3",
    title: "Payout of ₹30,540 processed successfully!",
    type: "payout",
    timestamp: "26-03-2025 10:36pm",
  },
  {
    id: "4",
    title: "Suspicious login detected from a new device",
    type: "security",
    timestamp: "26-03-2025 10:36pm",
  },
  {
    id: "5",
    title: "Payout of ₹50,000 processed successfully!",
    type: "payout",
    timestamp: "26-03-2025 10:36pm",
  },
  {
    id: "6",
    title: "Payout of ₹50,000 processed successfully!",
    type: "payout",
    timestamp: "26-03-2025 10:36pm",
  },
];

const filters = [
  "Unread",
  "Today",
  "What's new?",
  "Earnings and payouts",
  "Creator performance",
];

const Page = () => {
  const [activeFilter, setActiveFilter] = useState<string>("Unread");

  return (
    <div className="flex flex-col gap-4 bg-black text-white p-6 overflow-hidden">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
      <NotificationFilters
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <NotificationsList notifications={notifications} />
    </div>
  );
};

export default Page;
