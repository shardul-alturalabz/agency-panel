'use client'
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

export default function TalentHeader() {
    const [exportButton, setExportButton] = useState(false);

    const handleCSV = () => {

        setExportButton(false);
    }

    const handlePDF = () => {

        setExportButton(false);
    }

    return(
        <div className='flex w-full items-center justify-between px-5 mt-5'>
            <div className='flex justify-between w-[50%]'>
                <p className='text-[1.1rem]'><b>Total onboarded creators : </b><span>{52}</span></p>
                <p className='text-[1.1rem]'><b>Total earnings : </b><span>{"140M"}</span></p>
            </div>
            <div className='flex w-[50%] justify-end'>
                <Button onClick={()=>setExportButton((p)=>!p)} className='bg-zinc-600 hover:bg-zinc-700 cursor-pointer min-w-fit w-28 h-10'>Export Report<ChevronDown /></Button>
                {exportButton && <div className='absolute border-0 z-20 bg-zinc-800 w-[16%] py-4 h-36 mt-10 rounded-[12px] flex flex-col justify-between'>
                    <p className='opacity-50 text-md ml-4'>Download report as</p>
                    <div onClick={handleCSV} className='text-lg cursor-pointer mx-2 px-2 py-1 rounded-lg hover:bg-zinc-600'>CSV</div>
                    <div onClick={handlePDF} className='text-lg cursor-pointer mx-2 px-2 py-1 rounded-lg hover:bg-zinc-600'>PDF</div>
                </div>}
            </div>
        </div>
    )
}