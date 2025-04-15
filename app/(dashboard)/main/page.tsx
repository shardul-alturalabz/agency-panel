import React from "react";

const Page = () => {
  return (
    <div className="w-full min-h-screenbg-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Agency Panel</h1>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          Total earnings
          <br />
          ₹24,000
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          Average earnings
          <br />
          ₹5,670
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          Creators onboard
          <br />
          52
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          Avg stream time
          <br />
          24 min
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-[#1e1e1e] h-48 rounded-lg" />
        <div className="bg-[#1e1e1e] h-48 rounded-lg" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          <h2 className="font-semibold mb-2">🏅 Leaderboard</h2>
          <p>🥇 Influencer 1 — 325h — ₹240k</p>
          <p>🥈 Influencer 2 — 300h — ₹200k</p>
          <p>🥉 Influencer 3 — 268h — ₹160k</p>
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          <h2 className="font-semibold mb-2">🚩 Flag / Warnings</h2>
          <p>Influencer name — 5 warnings</p>
          <p>Influencer name — 5 warnings</p>
          <p>Influencer name — 5 warnings</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
