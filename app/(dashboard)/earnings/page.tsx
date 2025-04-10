import { EarningPayoutTable } from '@/components/earnings-payout/earning-payout-table'
import { PriceText } from '@/components/earnings-payout/price-text'
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
    },
    
  ]

  return (
    <div className='bg-black h-full pl-8 flex flex-col text-white gap-8'>
      <div className='h-[17%] w-[35%]  mt-10 flex flex-col justify-between text-[1.10rem] max-lg:text-sm'>
        <PriceText text='Total earnings' price={24000} />
        <div className='flex justify-between'>
          <PriceText text='Total payout' price={24000} />
          <PriceText text='Balance' price={0} />
        </div>
        <p>Next payout scheduled on :<span className='font-semibold'> 24 / 04 / 2025</span></p>
      </div>
      <p className='mt-8 text-3xl font-semibold'>Transaction history</p>
        <EarningPayoutTable data={data}/>
    </div>
  )
}

export default page