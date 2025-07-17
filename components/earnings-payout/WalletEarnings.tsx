'use client'
import React, { useState, useEffect } from 'react';
import PayoutRequestModal from './PayoutModal';
import axios from 'axios';
import Cookies from 'js-cookie';

const WalletEarnings = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    const fetchWallet = async () => {
      setLoading(true);
      setError("");
      try {
        const token = Cookies.get('token');
        const agencyId = Cookies.get('agencyId');
        const url = `${process.env.NEXT_PUBLIC_WALLET_DETAIL_API!}/${agencyId}`;
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWallet(res.data);
      } catch (err: any) {
        setError("Failed to load wallet data.");
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  return (
    <div className="bg-[#1A1A1A] text-white flex flex-col gap-6 p-6 rounded-lg w-full mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm font-medium text-gray-300 mb-1">Wallet balance</h2>
          {loading ? (
            <p className="text-2xl font-semibold text-gray-400 animate-pulse">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <p className="text-2xl font-semibold">₹{wallet ? Number(wallet.withdrawableBalance).toLocaleString('en-IN', { maximumFractionDigits: 2 }) : '0'}</p>
          )}
        </div>
        <button onClick={()=> setModal(true)} className="bg-orange-600 hover:bg-orange-700 cursor-pointer text-white px-6 py-2 rounded-lg font-medium transition-colors" disabled={loading || !!error}>
          Request Payout
        </button>
      </div>
      <hr className='opacity-30'></hr>
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-1">Current week creator earnings</h3>
        {loading ? (
          <p className="text-xl font-semibold text-gray-400 animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          <p className="text-xl font-semibold mb-2">₹{wallet ? Number(wallet.estimatedCurrentWeek).toLocaleString('en-IN', { maximumFractionDigits: 2 }) : '0'}</p>
        )}
        <p className="text-sm text-gray-400"></p>
      </div>
      {modal && <PayoutRequestModal set={setModal} availableBalance={wallet ? wallet.withdrawableBalance : 0} />} 
    </div>
  );
};

export default WalletEarnings;