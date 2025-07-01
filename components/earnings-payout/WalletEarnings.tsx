import React, { useState } from 'react';
import PayoutRequestModal from './PayoutModal';

const WalletEarnings = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className="bg-[#1A1A1A] text-white flex flex-col gap-6 p-6 rounded-lg w-full mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm font-medium text-gray-300 mb-1">Wallet balance</h2>
          <p className="text-2xl font-semibold">₹6,00,000</p>
        </div>
        <button onClick={()=> setModal(true)} className="bg-orange-600 hover:bg-orange-700 cursor-pointer text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Request Payout
        </button>
      </div>
      <hr className='opacity-30'></hr>
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-1">Current week creator earnings</h3>
        <p className="text-xl font-semibold mb-2">₹90,000</p>
        <p className="text-sm text-gray-400">Next settlement due on 24/05/2025</p>
      </div>
      {modal && <PayoutRequestModal set={setModal}/>}
    </div>
  );
};

export default WalletEarnings;