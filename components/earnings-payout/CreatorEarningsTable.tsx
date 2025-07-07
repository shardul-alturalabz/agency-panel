"use client";
import { MoveDown, MoveUp } from "lucide-react";
import { useEffect, useState } from "react";

interface CreatorEarning {
  week: string;
  totalCreatorEarnings: number;
  agencyCommission: number;
  commissionSlab: number;
  status: "Added to wallet" | "Pending" | "Processing" | string;
}

interface SortOptionsBase {
  field: "totalCreatorEarnings" | "agencyCommission" | "commissionSlab" | "week" | "status";
}

interface NumericSortOptions extends SortOptionsBase {
  field: "totalCreatorEarnings" | "agencyCommission" | "commissionSlab";
  ascending: boolean;
}

interface WeekSortOptions extends SortOptionsBase {
  field: "week";
  ascending: boolean;
}

interface StatusSortOptions extends SortOptionsBase {
  field: "status";
  ascending: "Added to wallet" | "Pending" | "Processing";
}

type SortOptions = NumericSortOptions | WeekSortOptions | StatusSortOptions;

import axios from "axios";
import Cookies from "js-cookie";

// API response settlement type
interface Settlement {
  id: number;
  agencyId: number;
  isoWeek: string;
  totalHostEarnings: number;
  commissionPercent: number;
  commissionAmount: number;
  generatedAt: string;
  remarks: string;
}

const Badge = ({ children, variant, className = "" }: { children: React.ReactNode; variant: string; className?: string }) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border";
  const variantStyles = {
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    warn: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    destructive: "bg-red-500/20 text-red-400 border-red-500/30"
  };
  
  return (
    <span className={`${baseStyles} ${variantStyles[variant as keyof typeof variantStyles]} ${className}`}>
      {children}
    </span>
  );
};

export default function CreatorEarningsTable() {
  const [statusClicked, setStatusClicked] = useState(false);
  const [weekClicked, setWeekClicked] = useState(false);
  const [earningsClicked, setEarningsClicked] = useState(false);
  const [commissionClicked, setCommissionClicked] = useState(false);
  const [slabClicked, setSlabClicked] = useState(false);
  const [items, setItems] = useState<CreatorEarning[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSettlements = async () => {
      setLoading(true);
      setError("");
      try {
        const token = Cookies.get('token');
        const agencyId = Cookies.get('agencyId');
        const res = await axios.get(process.env.NEXT_PUBLIC_SETTLEMENT_DETAILS_API!+'/'+agencyId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const settlements: Settlement[] = res.data?.data?.settlements || [];

        const mapped: CreatorEarning[] = settlements.map((s) => ({
          week: s.isoWeek,
          totalCreatorEarnings: s.totalHostEarnings,
          agencyCommission: s.commissionAmount,
          commissionSlab: s.commissionPercent,
          status: "Added to wallet",
        }));
        setItems(mapped);
      } catch (err) {
        setError("Failed to fetch settlements.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettlements();
  }, []);

  function sortEarnings(data: CreatorEarning[], sortOptions: SortOptions) {
    let result = [...data];

    result.sort((a, b) => {
      let comparison = 0;

      if (sortOptions.field === "totalCreatorEarnings") {
        comparison = a.totalCreatorEarnings - b.totalCreatorEarnings;
        return (sortOptions as NumericSortOptions).ascending ? comparison : -comparison;
      } else if (sortOptions.field === "agencyCommission") {
        comparison = a.agencyCommission - b.agencyCommission;
        return (sortOptions as NumericSortOptions).ascending ? comparison : -comparison;
      } else if (sortOptions.field === "commissionSlab") {
        comparison = a.commissionSlab - b.commissionSlab;
        return (sortOptions as NumericSortOptions).ascending ? comparison : -comparison;
      } else if (sortOptions.field === "week") {
        comparison = a.week.localeCompare(b.week);
        return (sortOptions as WeekSortOptions).ascending ? comparison : -comparison;
      } else if (sortOptions.field === "status") {
        const statusOption = sortOptions as StatusSortOptions;
        if (a.status === statusOption.ascending && b.status !== statusOption.ascending) {
          return -1;
        } else if (a.status !== statusOption.ascending && b.status === statusOption.ascending) {
          return 1;
        } else {
          return a.status.localeCompare(b.status);
        }
      }

      return comparison;
    });
    setItems(result);
  }

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="flex pr-4">
      <div className="bg-[#1E1E1E] flex flex-col p-4 border-0 rounded-xl w-full">
        <div className="w-full">
          <div className="hover:bg-transparent border-b border-white/50 flex justify-between w-full items-center pb-4">
            {/* ...existing header code... */}
            <div className="text-white flex gap-1.5 w-[20%] items-center">
              {weekClicked ? (
                <MoveUp
                  onClick={() => {
                    setWeekClicked((p) => !p);
                    sortEarnings(items, {
                      field: "week",
                      ascending: weekClicked,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              ) : (
                <MoveDown
                  onClick={() => {
                    setWeekClicked((p) => !p);
                    sortEarnings(items, {
                      field: "week",
                      ascending: weekClicked,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              )}
              Week
            </div>
            <div className="text-white flex gap-1.5 w-[25%] items-center">
              {earningsClicked ? (
                <MoveUp
                  onClick={() => {
                    setEarningsClicked((p) => !p);
                    sortEarnings(items, {
                      field: "totalCreatorEarnings",
                      ascending: earningsClicked,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              ) : (
                <MoveDown
                  onClick={() => {
                    setEarningsClicked((p) => !p);
                    sortEarnings(items, {
                      field: "totalCreatorEarnings",
                      ascending: earningsClicked,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              )}
              Total creator earnings
            </div>
            <div className="text-white flex gap-1.5 w-[20%] items-center">
              {commissionClicked ? (
                <MoveUp
                  onClick={() => {
                    setCommissionClicked((p) => !p);
                    sortEarnings(items, {
                      field: "agencyCommission",
                      ascending: commissionClicked,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              ) : (
                <MoveDown
                  onClick={() => {
                    setCommissionClicked((p) => !p);
                    sortEarnings(items, {
                      field: "agencyCommission",
                      ascending: commissionClicked,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              )}
              Agency Commission
            </div>
            <div className="text-white flex gap-1.5 w-[15%] items-center">
              {slabClicked ? (
                <MoveUp
                  onClick={() => {
                    setSlabClicked((p) => !p);
                    sortEarnings(items, {
                      field: "commissionSlab",
                      ascending: slabClicked,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              ) : (
                <MoveDown
                  onClick={() => {
                    setSlabClicked((p) => !p);
                    sortEarnings(items, {
                      field: "commissionSlab",
                      ascending: slabClicked,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              )}
              Commission slab
            </div>
            <div className="text-white flex gap-1.5 w-[20%] items-center relative">
              <MoveDown
                onClick={() => {
                  setStatusClicked(!statusClicked);
                }}
                className="cursor-pointer"
                size={21}
              />
              Status
              {statusClicked && (
                <div className="absolute top-8 left-0 bg-zinc-800 flex flex-col items-start px-4 py-3 w-40 rounded-xl border border-white/30 z-10 space-y-2">
                  <p
                    onClick={() => {
                      sortEarnings(items, {
                        field: "status",
                        ascending: "Added to wallet",
                      });
                      setStatusClicked(false);
                    }}
                    className="text-green-500 cursor-pointer hover:underline text-sm"
                  >
                    Added to wallet
                  </p>
                  <p
                    onClick={() => {
                      sortEarnings(items, {
                        field: "status",
                        ascending: "Processing",
                      });
                      setStatusClicked(false);
                    }}
                    className="text-yellow-500 cursor-pointer hover:underline text-sm"
                  >
                    Processing
                  </p>
                  <p
                    onClick={() => {
                      sortEarnings(items, {
                        field: "status",
                        ascending: "Pending",
                      });
                      setStatusClicked(false);
                    }}
                    className="text-orange-500 cursor-pointer hover:underline text-sm"
                  >
                    Pending
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-auto h-[51vh] mt-2">
          {loading ? (
            <div className="text-zinc-400 text-center py-8">Loading settlements...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-zinc-400 text-center py-8">No settlements found.</div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.week}-${index}`}
                className="flex justify-between items-center hover:bg-white/5 border-b border-dashed border-white/30 text-white/85 py-4"
              >
                <div className="w-[20%] text-sm">
                  {item.week}
                </div>
                <div className="w-[25%]">
                  <span className="text-white font-medium">
                    {formatCurrency(item.totalCreatorEarnings)}
                  </span>
                </div>
                <div className="w-[20%]">
                  <span className="text-white font-medium">
                    {formatCurrency(item.agencyCommission)}
                  </span>
                </div>
                <div className="w-[15%]">
                  <span className="text-white font-medium">
                    {item.commissionSlab}%
                  </span>
                </div>
                <div className="w-[20%]">
                  <Badge
                    variant={
                      item.status === "Added to wallet"
                        ? "success"
                        : item.status === "Processing"
                        ? "warn"
                        : "destructive"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}