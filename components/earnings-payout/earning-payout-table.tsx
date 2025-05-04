'use client'
import { MoveDown, Download, MoveUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useState } from "react";

interface Transaction {
  transactionId: string;
  status: 'Completed' | 'Failed' | 'Pending' | string;
  payoutAmount: number;
  date: string;
}

interface SortOptionsBase {
  field: 'payoutAmount' | 'date' | 'status';
}

interface AmountDateSortOptions extends SortOptionsBase {
  field: 'payoutAmount' | 'date';
  ascending: boolean;
}

interface StatusSortOptions extends SortOptionsBase {
  field: 'status';
  ascending: 'Completed' | 'Failed' | 'Pending';
}

type SortOptions = AmountDateSortOptions | StatusSortOptions;

export const EarningPayoutTable = ({ data }: { data: Transaction[] }) => {
  const [statusClicked, setStatusClicked] = useState(false)
  const [dateClicked, setDateClicked] = useState(false);
  const [amountClicked, setAmountClicked] = useState(false);
  const [items, setItems] = useState(data);

  function sortTransactions(data: Transaction[], sortOptions: SortOptions){
    let result = [...data];
    
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortOptions.field === 'payoutAmount') {
        comparison = a.payoutAmount - b.payoutAmount;
        return (sortOptions as AmountDateSortOptions).ascending ? comparison : -comparison;
      } 
      else if (sortOptions.field === 'date') {
        const [dayA, monthA, yearA] = a.date.split('/');
        const [dayB, monthB, yearB] = b.date.split('/');
        
        const dateA = new Date(`20${yearA}-${monthA}-${dayA}`);
        const dateB = new Date(`20${yearB}-${monthB}-${dayB}`);
        
        comparison = dateA.getTime() - dateB.getTime();
        return (sortOptions as AmountDateSortOptions).ascending ? comparison : -comparison;
      } 
      else if (sortOptions.field === 'status') {
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

  return (
    <div className='flex pr-4'>
      <Table className="bg-zinc-900 flex flex-col p-4 border-0 rounded-xl">
        <TableHeader className='w-full'>
          <TableRow className="hover:bg-transparent border-white/50 flex justify-between w-full items-center">
            <TableHead style={{ padding: 0 }} className="text-white flex w-[20%]">Transaction ID</TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[20%]'>{amountClicked?<MoveUp onClick={() =>{setAmountClicked((p) => !p); sortTransactions(items, { field: 'payoutAmount', ascending: amountClicked })}} className='cursor-pointer' size={21} />:<MoveDown onClick={() =>{setAmountClicked((p) => !p); sortTransactions(items, { field: 'payoutAmount', ascending: amountClicked })}} className='cursor-pointer' size={21} />}Payout amount</TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[20%]'>{dateClicked?<MoveUp onClick={() => {setDateClicked((p) => !p); sortTransactions(data, { field: 'date', ascending: dateClicked })}} className='cursor-pointer' size={21} />:<MoveDown onClick={() => {setDateClicked((p) => !p); sortTransactions(data, { field: 'date', ascending: dateClicked })}} className='cursor-pointer' size={21} />}Date</TableHead>
            <TableHead style={{ padding: 0 }} className="text-white flex gap-1.5 w-[20%]"><MoveDown onClick={() => {setStatusClicked(true)}} className='cursor-pointer' size={21} />Status
              {statusClicked &&
                <div className="absolute h-[23%] bg-zinc-800 flex flex-col items-start px-4 justify-between py-2 w-[12%] mt-8 rounded-xl border-1 border-white/30">
                  <p onClick={() => {sortTransactions(data, { field: 'status', ascending: "Completed" }); setStatusClicked(false)}} className="text-green-500 cursor-pointer hover:underline">Completed</p>
                  <p onClick={() => {sortTransactions(data, { field: 'status', ascending: "Pending" }); setStatusClicked(false)}} className="text-yellow-500 cursor-pointer hover:underline">Pending</p>
                  <p onClick={() => {sortTransactions(data, { field: 'status', ascending: "Failed" }); setStatusClicked(false)}} className="text-red-500 cursor-pointer hover:underline">Failed</p>
                </div>}
            </TableHead>
            <TableHead style={{ padding: 0 }} className="text-white text-right gap-1 w-[20%]">Download item</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-scroll h-[51vh]">
          {items.map((item) => (
            <TableRow key={item.transactionId} className="flex justify-between items-center hover:bg-transparent border-dashed border-white/30 text-white/85">
              <TableCell style={{ paddingTop: "18px", paddingBottom: "18px" }} className="w-[20%]">{item.transactionId}</TableCell>
              <TableCell className="w-[20%] ml-2">
                <Badge variant="payout">₹{item.payoutAmount}</Badge>
              </TableCell>
              <TableCell className="w-[20%]">{item.date}</TableCell>
              <TableCell className="w-[20%]">
                <Badge variant={item.status === "Completed" ? "success" : item.status === "Failed" ? "destructive" : "warn"}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="flex justify-end w-[20%] pr-10"><Download className='cursor-pointer' size={21} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}