'use client'
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useEffect, useRef, useState } from "react"

interface FilterProps {
  data: any[];
  onFilterChange: (filters: FilterSettings) => void;
  initialFilters?: FilterSettings;
  fields: FilterField[];
}

export interface FilterField {
  name: string;
  field: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
}

export interface FilterSettings {
  [key: string]: [number, number];
}

export const FilterButton = ({ data, onFilterChange, initialFilters, fields }: FilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  
  const [filters, setFilters] = useState<FilterSettings>(() => {
    const defaultFilters: FilterSettings = {};
    
    fields.forEach(field => {
      if (initialFilters && initialFilters[field.field]) {
        defaultFilters[field.field] = initialFilters[field.field];
      } else {
        defaultFilters[field.field] = [field.min, field.max];
      }
    });
    
    return defaultFilters;
  });

  function getMaxValue(data: any[], field: string): number {
    return Math.max(...data.map(item => Number(item[field])));
  }

  function handleFilterChange(field: string, value: [number, number]) {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  }

  function applyFilters() {
    onFilterChange(filters);
    setIsFilterOpen(false);
  }

  function resetFilters() {
    const resetValues: FilterSettings = {};
    
    fields.forEach(field => {
      resetValues[field.field] = [field.min, field.max];
    });
    
    setFilters(resetValues);
    onFilterChange(resetValues);
    setIsFilterOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  return (
    <div className="relative" ref={filterRef}>
      <Button 
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        variant="ghost" 
        className="flex items-center gap-2 text-white bg-zinc-800 hover:bg-zinc-700"
      >
        <Filter size={16} />
        <span>Filter</span>
      </Button>
      
      {isFilterOpen && (
        <div className="absolute inset-0 w-80 h-fit top-10 bg-zinc-800 p-4 rounded-md shadow-lg z-10 border border-zinc-700">
          <h3 className="text-white font-medium mb-4">Filter Options</h3>
          
          {fields.map((field) => (
            <div className="mb-6" key={field.field}>
              <div className="flex justify-between mb-2">
                <label className="text-white/80 text-sm">{field.name}</label>
                <span className="text-white/80 text-sm">
                  {field.prefix || ''}{filters[field.field][0]} - {field.prefix || ''}{filters[field.field][1]}
                </span>
              </div>
              <Slider
                defaultValue={filters[field.field]}
                min={field.min}
                max={field.max}
                step={field.step}
                value={filters[field.field]}
                onValueChange={(value) => handleFilterChange(field.field, value as [number, number])}
                className="mb-2"
              />
            </div>
          ))}
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFilters}
              className="text-white border-white/30 bg-zinc-700 cursor-pointer"
            >
              Reset
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={applyFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}