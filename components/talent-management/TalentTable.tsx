'use client'
import { ChevronRight, ChevronsUpDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from "react";

interface TalentData {
  id: string;
  name: string;
  totalEarnings: number;
  totalStreams: number;
  totalFollowers: number;
  totalPrivateCallDuration: number;
  avgStreamTime: number;
  avgViewersPerStream: number;
  avgDiamondsPerStream: number;
}

type SortField = keyof Omit<TalentData, 'id'>;

export const TalentTable = ({ data, searchValue }: { data: TalentData[]; searchValue: string; }) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortAscending, setSortAscending] = useState(false);
  const [items, setItems] = useState(data);
  const [filteredItems, setFilteredItems] = useState(data);

  function handleSort(field: SortField) {
    const ascending = sortField === field ? !sortAscending : true;
    setSortField(field);
    setSortAscending(ascending);
    
    const sortedItems = [...filteredItems].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return ascending ? aValue - bValue : bValue - aValue;
      }
      
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      return ascending 
        ? aString.localeCompare(bString) 
        : bString.localeCompare(aString);
    });
    setFilteredItems(sortedItems);
  }

  function filterByName(searchValue: string) {
    if (!searchValue.trim()) {
      setFilteredItems(items);
      return;
    }
    
    const filtered = items.filter(item => 
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    setFilteredItems(filtered);
  }

  useEffect(()=> {
    filterByName(searchValue);
  },[searchValue])

  return (
    <div className='flex pr-4'>
      <Table className="bg-zinc-900 text-sm max-lg:text-[0.58rem] max-md:text-[0.5rem] flex flex-col w-full py-4 border-0 rounded-xl">
        <TableHeader className='w-full'>
          <TableRow className="hover:bg-transparent border-white/50 px-4 flex justify-between w-full items-center">
            <TableHead style={{ padding: 0 }} className="text-white flex w-[7%]">
              Name
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[10%] overflow-hidden'>
              <ChevronsUpDown 
                onClick={() => handleSort('totalEarnings')} 
                className='cursor-pointer' 
                size={21} 
              />
              <p className="w-full text-wrap">Total earnings</p>
              
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[10%] overflow-hidden'>
              <ChevronsUpDown 
                onClick={() => handleSort('totalStreams')} 
                className='cursor-pointer' 
                size={21} 
              />
              <p className="w-full text-wrap">Total streams</p>
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[10%] overflow-hidden'>
              <ChevronsUpDown 
                onClick={() => handleSort('totalFollowers')} 
                className='cursor-pointer' 
                size={21} 
              />
              <p className="w-full text-wrap">Total followers</p>
              
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[15%] overflow-hidden'>
              <ChevronsUpDown 
                onClick={() => handleSort('totalPrivateCallDuration')} 
                className='cursor-pointer' 
                size={21} 
              />
              <p className="w-full text-wrap">Total private call duration</p>
              
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[10%] overflow-hidden'>
              <ChevronsUpDown 
                onClick={() => handleSort('avgStreamTime')} 
                className='cursor-pointer' 
                size={21} 
              />
              <p className="w-full text-wrap">Avg stream time</p>
              
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[13%] overflow-hidden'>
              <ChevronsUpDown 
                onClick={() => handleSort('avgViewersPerStream')} 
                className='cursor-pointer' 
                size={21} 
              />
              <p className="w-full text-wrap">Avg viewer per stream</p>
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[13%] overflow-hidden'>
              <ChevronsUpDown 
                onClick={() => handleSort('avgDiamondsPerStream')} 
                className='cursor-pointer' 
                size={21} 
              />
              <p className="w-full text-wrap">Avg diamonds per stream</p>
            </TableHead>
            <TableHead style={{ padding: 0 }} className="text-white text-right w-[3%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-scroll h-[65vh] px-1">
          {filteredItems.map((item) => (
            <TableRow key={item.id} className="flex justify-between items-center hover:bg-transparent border-dashed border-white/30 text-white/85">
              <TableCell style={{ paddingTop: "18px", paddingBottom: "18px" }} className="w-[7%]">{item.name}</TableCell>
              <TableCell className="w-[10%] text-center">
                <Badge variant="payout">₹{item.totalEarnings}</Badge>
              </TableCell>
              <TableCell className="w-[10%] text-center">{item.totalStreams}</TableCell>
              <TableCell className="w-[10%] text-center">{item.totalFollowers}</TableCell>
              <TableCell className="w-[15%] text-center">{item.totalPrivateCallDuration} mins</TableCell>
              <TableCell className="w-[10%] text-center">{item.avgStreamTime} mins</TableCell>
              <TableCell className="w-[13%] text-center">{item.avgViewersPerStream}</TableCell>
              <TableCell className="w-[13%] text-center">{item.avgDiamondsPerStream}</TableCell>
              <TableCell className="flex justify-end w-[3%]">
                <ChevronRight className='cursor-pointer' size={21} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}