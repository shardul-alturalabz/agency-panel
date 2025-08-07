'use client'
import CreatorEarningsTable from "@/components/earnings-payout/CreatorEarningsTable";
import EarningPayoutTable from "@/components/earnings-payout/earning-payout-table";
import WalletEarnings from "@/components/earnings-payout/WalletEarnings";

import React, { useState } from "react";

const page = () => {

  const [table, setTable] = useState(false);

  const data = [
    {
      transactionId: "12124235748",
      status: "Completed",
      payoutAmount: 250.0,
      date: "24/04/25",
    },
    {
      transactionId: "12124235747",
      status: "Completed",
      payoutAmount: 150.0,
      date: "24/04/25",
    },
    {
      transactionId: "12124235746",
      status: "Pending",
      payoutAmount: 350.0,
      date: "24/04/25",
    },
    {
      transactionId: "12124235745",
      status: "Failed",
      payoutAmount: 450.0,
      date: "24/04/25",
    },
    {
      transactionId: "12124235744",
      status: "Pending",
      payoutAmount: 550.0,
      date: "24/06/25",
    },
    {
      transactionId: "12124235743",
      status: "Completed",
      payoutAmount: 200.0,
      date: "24/04/25",
    },
    {
      transactionId: "12124235742",
      status: "Failed",
      payoutAmount: 300.0,
      date: "23/04/25",
    },
  ];

  return (
    <div className="bg-black h-full pl-8 flex flex-col text-white gap-8 overflow-auto">
      <div className="mt-10 flex flex-wrap  gap-5 text-[1.10rem] max-lg:text-sm">
        {/* <BadgeWithHeader type="price" text="Total earnings" price={24000} />
        <BadgeWithHeader type="price" text="Total payout" price={24000} />
        <BadgeWithHeader type="price" text="Balance" price={0} />
        <BadgeWithHeader
          type="text"
          text="Next payout scheduled on"
          currencySymbol=""
          price={"24 / 04 / 2025"}
        /> */}
        <WalletEarnings />
      </div>
      <div className="flex gap-4 items-end">
        <div onClick={() => setTable(false)} className={`mt-8 text-2xl ${table ? 'text-white/40' : ''} cursor-pointer font-semibold`}>Settlement history</div>
        <div onClick={() => setTable(true)} className={`mt-8 text-2xl ${table ? '' : 'text-white/40'}  cursor-pointer font-semibold border-l-2 border-white/30 pl-4`}>Payout history</div>

      </div>
      {table ?
        <div>
          {data.length > 0 ? (
            <EarningPayoutTable />
          ) : (
            <div className="flex items-center justify-center h-[53vh] bg-zinc-900 rounded-xl">
              <p className="text-white/50 text-lg">
                You don't have any previous transactions.
              </p>
            </div>
          )}
        </div>
        :
        <div>
          {data.length > 0 ? (
            <CreatorEarningsTable/>
          ) : (
            <div className="flex items-center justify-center h-[53vh] bg-zinc-900 rounded-xl">
              <p className="text-white/50 text-lg">
                You don't have any previous transactions.
              </p>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default page;
