import { BrainCircuit, TrendingUp, CircleDollarSign } from 'lucide-react';

export default function Logo({
  className,
  showName = true,
}: {
  className?: string;
  showName?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2" aria-label="PsycheMoney">
      <div className="flex items-center gap-2">
        <BrainCircuit className={`size-8 ${className}`} />
        <TrendingUp className={`size-8 ${className}`} />
        <CircleDollarSign className={`size-8 ${className}`} />
      </div>
      {showName && (
        <span
          className={`font-headline text-2xl font-bold tracking-wider ${className}`}
        >
          PSYCHEMONEY
        </span>
      )}
    </div>
  );
}
