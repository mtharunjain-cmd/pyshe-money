import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className="flex flex-col items-center gap-2" aria-label="PsycheMoney">
      <Image
        src="/logo.png"
        alt="PsycheMoney Logo"
        width={48}
        height={48}
      />
      <span className={`font-headline text-2xl font-bold tracking-wider ${className}`}>
        PSYCHEMONEY
      </span>
    </div>
  );
}
