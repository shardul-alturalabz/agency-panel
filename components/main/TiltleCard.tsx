import { MoveDiagonal } from "lucide-react";

export default function TitleCard({ text }: { text: string }) {
  return (
    <div className="flex justify-between px-6 py-3">
      <p className="text-xl font-semibold">{text}</p>
      <div className="cursor-pointer p-1 rounded-xl">
        <MoveDiagonal size={18} />
      </div>
    </div>
  );
}
