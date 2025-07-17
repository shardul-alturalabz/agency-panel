"use client";
import { MoveDown, Download, MoveUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { downloadPDF } from "@/lib/pdf";


// API Transaction type
type Transaction = {
  id: number;
  paymentReference: string;
  status: string;
  requestedAmount: number;
  requestedAt: string;
}

interface SortOptionsBase {
  field: "payoutAmount" | "date" | "status";
}

interface AmountDateSortOptions extends SortOptionsBase {
  field: "payoutAmount" | "date";
  ascending: boolean;
}

interface StatusSortOptions extends SortOptionsBase {
  field: "status";
  priorityStatus: "Paid" | "Rejected" | "Processing" | "Requested";
}

type SortOptions = AmountDateSortOptions | StatusSortOptions;

const EarningPayoutTable = () => {
  const [statusClicked, setStatusClicked] = useState(false);
  const [dateClicked, setDateClicked] = useState(false);
  const [amountClicked, setAmountClicked] = useState(false);
  const [items, setItems] = useState<Transaction[]>([]);
  const agencyId = Cookies.get('agencyId');
  const token = Cookies.get('token');

  useEffect(() => {
    async function fetchWithdrawals() {
      try {
        // Replace with your actual API endpoint
        const res = await axios.get(process.env.NEXT_PUBLIC_PAYOUT_DETAILS_API!+'/'+agencyId, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const withdrawals = res.data?.data?.withdrawals || [];
        setItems(withdrawals);
      } catch (err) {
        // Optionally handle error
        setItems([]);
      }
    }
    fetchWithdrawals();
  }, []);

  function sortTransactions(data: Transaction[], sortOptions: SortOptions) {
    let result = [...data];

    result.sort((a, b) => {
      if (sortOptions.field === "payoutAmount") {
        const comparison = a.requestedAmount - b.requestedAmount;
        return (sortOptions as AmountDateSortOptions).ascending
          ? comparison
          : -comparison;
      } else if (sortOptions.field === "date") {
        const dateA = new Date(a.requestedAt);
        const dateB = new Date(b.requestedAt);
        const comparison = dateA.getTime() - dateB.getTime();
        return (sortOptions as AmountDateSortOptions).ascending
          ? comparison
          : -comparison;
      } else if (sortOptions.field === "status") {
        const statusOption = sortOptions as StatusSortOptions;
        const priorityStatus = statusOption.priorityStatus.toLowerCase();
        
        // Normalize status for comparison
        const statusA = a.status.toLowerCase();
        const statusB = b.status.toLowerCase();
        
        // If one matches priority status, it comes first
        if (statusA === priorityStatus && statusB !== priorityStatus) {
          return -1;
        } else if (statusA !== priorityStatus && statusB === priorityStatus) {
          return 1;
        } else {
          // Both match or both don't match priority, sort alphabetically
          return statusA.localeCompare(statusB);
        }
      }

      return 0;
    });
    setItems(result);
  }

  // Function to get badge variant based on status
  const getBadgeVariant = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case "paid":
        return "success";
      case "rejected":
        return "destructive";
      case "processing":
        return "warn";
      case "requested":
        return "secondary"; // or you can use "outline" or create a new variant
      default:
        return "warn";
    }
  };

  return (
    <div className="flex pr-4">
      <Table className="bg-[#1E1E1E] flex flex-col p-4 border-0 rounded-xl">
        <TableHeader className="w-full">
          <TableRow className="hover:bg-transparent border-white/50 flex justify-between w-full items-center">
            <TableHead
              style={{ padding: 0 }}
              className="text-white flex w-[20%]"
            >
              Transaction ID
            </TableHead>
            <TableHead
              style={{ padding: 0 }}
              className="text-white flex gap-1.5 w-[20%]"
            >
              {amountClicked ? (
                <MoveUp
                  onClick={() => {
                    setAmountClicked(false);
                    sortTransactions(items, {
                      field: "payoutAmount",
                      ascending: false,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              ) : (
                <MoveDown
                  onClick={() => {
                    setAmountClicked(true);
                    sortTransactions(items, {
                      field: "payoutAmount",
                      ascending: true,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              )}
              Payout amount
            </TableHead>
            <TableHead
              style={{ padding: 0 }}
              className="text-white flex gap-1.5 w-[20%]"
            >
              {dateClicked ? (
                <MoveUp
                  onClick={() => {
                    setDateClicked(false);
                    sortTransactions(items, {
                      field: "date",
                      ascending: false,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              ) : (
                <MoveDown
                  onClick={() => {
                    setDateClicked(true);
                    sortTransactions(items, {
                      field: "date",
                      ascending: true,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              )}
              Date
            </TableHead>
            <TableHead
              style={{ padding: 0 }}
              className="text-white flex gap-1.5 w-[20%] relative"
            >
              <MoveDown
                onClick={() => {
                  setStatusClicked(true);
                }}
                className="cursor-pointer"
                size={21}
              />
              Status
              {statusClicked && (
                <div className="absolute h-fit w-[8rem] gap-y-3  bg-zinc-800 flex flex-col items-start px-4 justify-between py-2 mt-8 rounded-xl border-1 border-white/30 z-10">
                  <p
                    onClick={() => {
                      sortTransactions(items, {
                        field: "status",
                        priorityStatus: "Paid",
                      });
                      setStatusClicked(false);
                    }}
                    className="text-green-500 cursor-pointer hover:underline"
                  >
                    Paid
                  </p>
                  <p
                    onClick={() => {
                      sortTransactions(items, {
                        field: "status",
                        priorityStatus: "Processing",
                      });
                      setStatusClicked(false);
                    }}
                    className="text-yellow-500 cursor-pointer hover:underline"
                  >
                    Processing
                  </p>
                  <p
                    onClick={() => {
                      sortTransactions(items, {
                        field: "status",
                        priorityStatus: "Requested",
                      });
                      setStatusClicked(false);
                    }}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Requested
                  </p>
                  <p
                    onClick={() => {
                      sortTransactions(items, {
                        field: "status",
                        priorityStatus: "Rejected",
                      });
                      setStatusClicked(false);
                    }}
                    className="text-red-500 cursor-pointer hover:underline"
                  >
                    Rejected
                  </p>
                </div>
              )}
            </TableHead>
            {/* <TableHead
              style={{ padding: 0 }}
              className="text-white text-right gap-1 w-[20%]"
            >
              Download item
            </TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-scroll h-[51vh]">
          {items.map((item) => (
            <TableRow
              key={item.id}
              className="flex justify-between items-center hover:bg-transparent border-dashed border-white/30 text-white/85"
            >
              <TableCell
                style={{ paddingTop: "18px", paddingBottom: "18px" }}
                className="w-[20%]"
              >
                {item.paymentReference}
              </TableCell>
              <TableCell className="w-[20%] ml-2">
                <Badge variant="payout">₹{item.requestedAmount}</Badge>
              </TableCell>
              <TableCell className="w-[20%]">
                {new Date(item.requestedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="w-[20%]">
                <Badge variant={getBadgeVariant(item.status)}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </TableCell>
              {/* <TableCell className="flex justify-end w-[20%] pr-10">
                <Download onClick={()=> {
                  downloadPDF()
                }} className="cursor-pointer" size={21} />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EarningPayoutTable;