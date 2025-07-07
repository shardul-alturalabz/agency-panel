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
  ascending: "Completed" | "Failed" | "Pending";
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
      let comparison = 0;

      if (sortOptions.field === "payoutAmount") {
        comparison = a.requestedAmount - b.requestedAmount;
        return (sortOptions as AmountDateSortOptions).ascending
          ? comparison
          : -comparison;
      } else if (sortOptions.field === "date") {
        // Use requestedAt for date
        const dateA = new Date(a.requestedAt);
        const dateB = new Date(b.requestedAt);
        comparison = dateA.getTime() - dateB.getTime();
        return (sortOptions as AmountDateSortOptions).ascending
          ? comparison
          : -comparison;
      } else if (sortOptions.field === "status") {
        const statusOption = sortOptions as StatusSortOptions;
        if (
          a.status === statusOption.ascending &&
          b.status !== statusOption.ascending
        ) {
          return -1;
        } else if (
          a.status !== statusOption.ascending &&
          b.status === statusOption.ascending
        ) {
          return 1;
        } else {
          return a.status.localeCompare(b.status);
        }
      }

      return comparison;
    });
    setItems(result);
  }

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
                    setAmountClicked((p) => !p);
                    sortTransactions(items, {
                      field: "payoutAmount",
                      ascending: amountClicked,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              ) : (
                <MoveDown
                  onClick={() => {
                    setAmountClicked((p) => !p);
                    sortTransactions(items, {
                      field: "payoutAmount",
                      ascending: amountClicked,
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
                    setDateClicked((p) => !p);
                    sortTransactions(items, {
                      field: "date",
                      ascending: dateClicked,
                    });
                  }}
                  className="cursor-pointer"
                  size={21}
                />
              ) : (
                <MoveDown
                  onClick={() => {
                    setDateClicked((p) => !p);
                    sortTransactions(items, {
                      field: "date",
                      ascending: dateClicked,
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
              className="text-white flex gap-1.5 w-[20%]"
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
                <div className="absolute h-[23%] bg-zinc-800 flex flex-col items-start px-4 justify-between py-2 w-[12%] mt-8 rounded-xl border-1 border-white/30">
                  <p
                    onClick={() => {
                      sortTransactions(items, {
                        field: "status",
                        ascending: "Completed",
                      });
                      setStatusClicked(false);
                    }}
                    className="text-green-500 cursor-pointer hover:underline"
                  >
                    Completed
                  </p>
                  <p
                    onClick={() => {
                      sortTransactions(items, {
                        field: "status",
                        ascending: "Pending",
                      });
                      setStatusClicked(false);
                    }}
                    className="text-yellow-500 cursor-pointer hover:underline"
                  >
                    Pending
                  </p>
                  <p
                    onClick={() => {
                      sortTransactions(items, {
                        field: "status",
                        ascending: "Failed",
                      });
                      setStatusClicked(false);
                    }}
                    className="text-red-500 cursor-pointer hover:underline"
                  >
                    Failed
                  </p>
                </div>
              )}
            </TableHead>
            <TableHead
              style={{ padding: 0 }}
              className="text-white text-right gap-1 w-[20%]"
            >
              Download item
            </TableHead>
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
                <Badge
                  variant={
                    item.status === "paid"
                      ? "success"
                      : item.status === "failed"
                      ? "destructive"
                      : "warn"
                  }
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="flex justify-end w-[20%] pr-10">
                <Download onClick={()=> {
                  downloadPDF()
                }} className="cursor-pointer" size={21} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EarningPayoutTable;
