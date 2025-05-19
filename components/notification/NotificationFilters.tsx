import { Button } from "@/components/ui/button";

interface NotificationFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filters: string[]
}

const NotificationFilters = ({ activeFilter, onFilterChange, filters }: NotificationFiltersProps) => {
  return (
    <div className="flex gap-2">
      {filters.map((filter, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className={`rounded-[0.85rem] p-5 py-4.5 bg-zinc-800/50 border-zinc-700 cursor-pointer hover:bg-zinc-700 ${
            activeFilter === filter ? 'bg-zinc-400/50 border-zinc-600' : ''
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

export default NotificationFilters;
