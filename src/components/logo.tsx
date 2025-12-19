import { IndianRupee } from "lucide-react";

export default function Logo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className="flex justify-center" aria-label="PsycheMoney">
      <div className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-yellow-400">
        <IndianRupee className={className} size={28} strokeWidth={2} />
      </div>
    </div>
  );
}
