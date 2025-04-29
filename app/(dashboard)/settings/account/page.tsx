import { DeleteIcon, Trash2 } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full flex flex-col px-7 pt-12 gap-4 max-xl:text-md max-lg:text-sm overflow-scroll'>
      <p className='text-white text-3xl mb-6 tracking-wide'>Account</p>
      <div className='w-[98%] h-[35%] flex flex-col pl-8 pt-8 pr-42 max-xl:pr-30 max-lg:pr-18  max-md:pr-12 max-sm:pr-6 rounded-2xl bg-zinc-900'>
        <p className='text-lg max-lg:text-md font-semibold text-white'>Login & Security</p>
        <div className='text-md max-xl:text-sm max-lg:text-xs font-[600] gap-5 flex justify-between mt-6 text-white tracking-wide'>
          <div className='flex flex-col '>
            <p className='text-white/30'>Username</p>
            <p>Sushi_vid1207</p>
          </div>
          <div className='flex flex-col'>
            <p className='text-white/30'>Password</p>
            <div className='flex gap-6'>
              <p className='masked'>abcdefghijklmnop</p>
              <p className='underline text-blue-500/80 cursor-pointer '>Change Password</p>
            </div>
          </div>
          <div className='flex flex-col gap-12'>
            <div className='flex flex-col gap-0.5'>
              <p className='text-white/30'>Set recovery options</p>
              <p className='text-blue-500/80 underline text-[1.1rem] max-lg:text-[0.85rem] cursor-pointer'>Add recovery email address</p>
            </div>
            <div className='flex flex-col gap-0.5'>
              <p className='text-white/30'>Account verification</p>
              <p className='text-green-600/80 font-semibold text-[1.1rem] cursor-pointer'>Verified</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[98%] h-[35%] flex flex-col pl-8 pt-8 pr-42 max-xl:pr-30 max-lg:pr-18 max-md:pr-12 max-sm:pr-6 rounded-2xl bg-zinc-900'>
        <p className='text-2xl max-xl:text-xl font-semibold text-white'>Payment Methods</p>
        <div className='flex'>
          <div className='text-white flex mt-12 gap-8 justify-between w-full items-center'>
            <div className='flex flex-col '>
              <p className='text-white/30 text-[1.05rem] max-xl:text-[0.95rem] font-semibold'>Primary payout method</p>
              <div className='flex mt-4 gap-5 items-center'>
                <div className='border-2 size-9 rounded-lg'></div>
                <div className='flex flex-col'>
                  <p className='text-lg max-xl:text-sm'>Account holder name</p>
                  <p className='text-white/75 max-xl:text-sm'><span className='masked'>1234 4321</span>5678</p>
                </div>
                <Trash2 className='ml-24 max-lg:mr-16 max-lg:ml-0 cursor-pointer' />
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <p className='underline text-blue-500/80 cursor-pointer'>Add UPI</p>
              <p className='underline text-blue-500/80 cursor-pointer'>Add another bank account</p>
              <p className='underline text-blue-500/80 cursor-pointer'>Add card details</p>
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default page