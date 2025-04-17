import { EarningPayoutTable } from '@/components/earnings-payout/earning-payout-table'
import { BadgeWithHeader } from '@/components/ui/badge-with-header'

import React from 'react'

const page = () => {
  
  const data = [
    {
      transactionId: "12124235748",
      status: "Completed",
      payoutAmount: 250.00,
      date: "24/04/25"
    },
    {
      transactionId: "12124235747",
      status: "Completed",
      payoutAmount: 150.00,
      date: "24/04/25"
    },
    {
      transactionId: "12124235746",
      status: "Completed",
      payoutAmount: 350.00,
      date: "24/04/25"
    },
    {
      transactionId: "12124235745",
      status: "Failed",
      payoutAmount: 450.00,
      date: "24/04/25"
    },
    {
      transactionId: "12124235744",
      status: "Completed",
      payoutAmount: 550.00,
      date: "24/06/25"
    },
    {
      transactionId: "12124235743",
      status: "Completed",
      payoutAmount: 200.00,
      date: "24/04/25"
    },
    {
      transactionId: "12124235742",
      status: "Failed",
      payoutAmount: 300.00,
      date: "23/04/25"
    }
  ]

  return (
    <div className='bg-black h-full pl-8 flex flex-col text-white gap-8'>
      <div className='mt-10 flex flex-wrap  gap-5 text-[1.10rem] max-lg:text-sm'>
          <BadgeWithHeader type='price' text='Total earnings' price={24000} />
          <BadgeWithHeader type='price' text='Total payout' price={24000} />
          <BadgeWithHeader type='price' text='Balance' price={0} />
          <BadgeWithHeader type='text' text='Next payout scheduled on' currencySymbol='' price={"24 / 04 / 2025"} />
      </div>
      <p className='mt-8 text-3xl font-semibold'>Transaction history</p>
      {data.length > 0 ? (
        <EarningPayoutTable data={data}/>
      ) : (
        <div className="flex items-center justify-center h-[53vh] bg-zinc-900 rounded-xl">
          <p className="text-white/50 text-lg">You don't have any previous transactions.</p>
        </div>
      )}
    </div>
  )
}

export default page