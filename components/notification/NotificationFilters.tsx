import { Button } from "@/components/ui/button";

export type NotificationType = 'payout' | 'milestone' | 'security' | 'general';

export interface Notification {
  id: string;
  title: string;
  type: NotificationType;
  timestamp: string;
  description?: string;
  amount?: string;
}

export type FilterType = 'Unread' | 'Today' | "What's new?" | 'Earnings and payouts' | 'Creator performance';

interface NotificationFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: FilterType[] = [
  'Unread',
  'Today',
  "What's new?",
  'Earnings and payouts',
  'Creator performance',
];

const NotificationFilters = ({ activeFilter, onFilterChange }: NotificationFiltersProps) => {
  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant="outline"
          size="sm"
          className={`rounded-full bg-zinc-800/50 border-zinc-700 cursor-pointer hover:bg-zinc-700 ${
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
