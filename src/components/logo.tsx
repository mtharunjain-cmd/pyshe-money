import { IndianRupee } from "lucide-react";

export default function Logo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className="flex justify-center" aria-label="PsycheMoney">
      <IndianRupee className={className} size={48} strokeWidth={1.5} />
    </div>
  );
}
