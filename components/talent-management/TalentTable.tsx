'use client'
import { ChevronRight, MoveUp, MoveDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from "react";
import { SideSheet } from "./SideSheet";
import { SheetTrigger } from "../ui/sheet";
import { FilterSettings } from "./FilterButton";

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

interface TalentTableProps {
  data: TalentData[];
  searchValue: string;
  filterSettings: FilterSettings;
}

export const TalentTable = ({ data, searchValue, filterSettings }: TalentTableProps) => {
  const [items, setItems] = useState(data);
  const [filteredItems, setFilteredItems] = useState(data);
  
  // Sort states
  const [nameClicked, setNameClicked] = useState(false);
  const [earningsClicked, setEarningsClicked] = useState(false);
  const [streamsClicked, setStreamsClicked] = useState(false);
  const [followersClicked, setFollowersClicked] = useState(false);
  const [callDurationClicked, setCallDurationClicked] = useState(false);
  const [avgStreamTimeClicked, setAvgStreamTimeClicked] = useState(false);
  const [viewersClicked, setViewersClicked] = useState(false);
  const [diamondsClicked, setDiamondsClicked] = useState(false);

  // Helper function to get max value for a field
  function getMaxValue(data: TalentData[], field: keyof TalentData): number {
    return Math.max(...data.map(item => Number(item[field])));
  }

  function sortTalentData(field: SortField, ascending: boolean) {
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
      applyAllFilters(items);
      return;
    }

    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    applyAllFilters(filtered);
  }

  function applyAllFilters(dataToFilter: TalentData[]) {
    // If no filter settings provided or empty object, return all data
    if (!filterSettings || Object.keys(filterSettings).length === 0) {
      setFilteredItems(dataToFilter);
      return;
    }

    const filtered = dataToFilter.filter(item => {
      // Check each filter setting
      for (const [field, range] of Object.entries(filterSettings)) {
        const value = item[field as keyof TalentData] as number;
        if (value < range[0] || value > range[1]) {
          return false;
        }
      }
      return true;
    });
    
    setFilteredItems(filtered);
  }

  // Update filtered items when data changes
  useEffect(() => {
    setItems(data);
    filterByName(searchValue);
  }, [data]);

  // Update when search value changes
  useEffect(() => {
    filterByName(searchValue);
  }, [searchValue, items]);

  // Update when filter settings change
  useEffect(() => {
    filterByName(searchValue);
  }, [filterSettings]);

  return (
    <div className='flex flex-col px-4 '>
      <Table className="bg-[#1E1E1E] text-sm max-lg:text-[0.58rem] max-md:text-[0.5rem] flex flex-col w-full py-4 border-0 rounded-xl">
        <TableHeader className='w-full'>
          <TableRow className="hover:bg-transparent border-white/50 px-4 flex justify-between w-full items-center">
            <TableHead style={{ padding: 0 }} className="text-white flex gap-1.5 w-[7%]">
              {nameClicked ?
                <MoveUp 
                  onClick={() => {
                    setNameClicked(false);
                    sortTalentData('name', true);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                /> :
                <MoveDown 
                  onClick={() => {
                    setNameClicked(true);
                    sortTalentData('name', false);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                />
              }
              <p className="w-full text-wrap">Name</p>
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[10%] overflow-hidden'>
              {earningsClicked ?
                <MoveUp 
                  onClick={() => {
                    setEarningsClicked(false);
                    sortTalentData('totalEarnings', true);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                /> :
                <MoveDown 
                  onClick={() => {
                    setEarningsClicked(true);
                    sortTalentData('totalEarnings', false);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                />
              }
              <p className="w-full text-wrap">Total earnings</p>
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[10%] overflow-hidden'>
              {streamsClicked ?
                <MoveUp 
                  onClick={() => {
                    setStreamsClicked(false);
                    sortTalentData('totalStreams', true);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                /> :
                <MoveDown 
                  onClick={() => {
                    setStreamsClicked(true);
                    sortTalentData('totalStreams', false);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                />
              }
              <p className="w-full text-wrap">Total streams</p>
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[10%] overflow-hidden'>
              {followersClicked ?
                <MoveUp 
                  onClick={() => {
                    setFollowersClicked(false);
                    sortTalentData('totalFollowers', true);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                /> :
                <MoveDown 
                  onClick={() => {
                    setFollowersClicked(true);
                    sortTalentData('totalFollowers', false);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                />
              }
              <p className="w-full text-wrap">Total followers</p>
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[15%] overflow-hidden'>
              {callDurationClicked ?
                <MoveUp 
                  onClick={() => {
                    setCallDurationClicked(false);
                    sortTalentData('totalPrivateCallDuration', true);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                /> :
                <MoveDown 
                  onClick={() => {
                    setCallDurationClicked(true);
                    sortTalentData('totalPrivateCallDuration', false);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                />
              }
              <p className="w-full text-wrap">Total private call duration</p>
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[10%] overflow-hidden'>
              {avgStreamTimeClicked ?
                <MoveUp 
                  onClick={() => {
                    setAvgStreamTimeClicked(false);
                    sortTalentData('avgStreamTime', true);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                /> :
                <MoveDown 
                  onClick={() => {
                    setAvgStreamTimeClicked(true);
                    sortTalentData('avgStreamTime', false);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                />
              }
              <p className="w-full text-wrap">Avg stream time</p>
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[13%] overflow-hidden'>
              {viewersClicked ?
                <MoveUp 
                  onClick={() => {
                    setViewersClicked(false);
                    sortTalentData('avgViewersPerStream', true);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                /> :
                <MoveDown 
                  onClick={() => {
                    setViewersClicked(true);
                    sortTalentData('avgViewersPerStream', false);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                />
              }
              <p className="w-full text-wrap">Avg viewer per stream</p>
            </TableHead>
            <TableHead style={{ padding: 0 }} className='text-white flex gap-1.5 w-[13%] overflow-hidden'>
              {diamondsClicked ?
                <MoveUp 
                  onClick={() => {
                    setDiamondsClicked(false);
                    sortTalentData('avgDiamondsPerStream', true);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                /> :
                <MoveDown 
                  onClick={() => {
                    setDiamondsClicked(true);
                    sortTalentData('avgDiamondsPerStream', false);
                  }} 
                  className='cursor-pointer' 
                  size={21} 
                />
              }
              <p className="w-full text-wrap">Avg diamonds per stream</p>
            </TableHead>
            <TableHead style={{ padding: 0 }} className="text-white text-right w-[3%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-scroll h-[65vh] px-1">
          {filteredItems.map((item) => (
            <TableRow key={item.id} className="flex justify-between items-center hover:bg-transparent border-dashed border-white/30 text-white/85">
              <TableCell style={{ paddingTop: "18px", paddingBottom: "18px" }} className="w-[7%]"><p className="text-wrap">{item.name}</p></TableCell>
              <TableCell className="w-[10%] text-center">
                <Badge variant="payout">₹{item.totalEarnings}</Badge>
              </TableCell>
              <TableCell className="w-[10%] text-center">{item.totalStreams}</TableCell>
              <TableCell className="w-[10%] text-center">{item.totalFollowers}</TableCell>
              <TableCell className="w-[15%] text-center">{item.totalPrivateCallDuration} mins</TableCell>
              <TableCell className="w-[10%] text-center">{item.avgStreamTime} mins</TableCell>
              <TableCell className="w-[13%] text-center">{item.avgViewersPerStream}</TableCell>
              <TableCell className="w-[13%] text-center">{item.avgDiamondsPerStream}</TableCell>
              <SideSheet>
                <SheetTrigger asChild>
                  <TableCell className="flex justify-end w-[3%]">
                    <ChevronRight className='cursor-pointer' size={21} />
                  </TableCell>
                </SheetTrigger>
              </SideSheet>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}