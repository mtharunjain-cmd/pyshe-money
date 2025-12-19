export default function Logo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className="flex justify-center" aria-label="PsycheMoney">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {/* Brain Path */}
        <path d="M9.5 8.5C9.5 5.76 11.52 4.5 12.5 4.5C13.48 4.5 15.5 5.76 15.5 8.5" />
        <path d="M12.5 6V4.5" />
        <path d="M12.5 18V19.5" />
        <path d="M16.05 5.5C16.43 5.59 16.79 5.72 17.13 5.88C18.94 6.79 20 8.08 20 9.75C20 11.42 18.94 12.71 17.13 13.62C16.79 13.78 16.43 13.91 16.05 14" />
        <path d="M5 9.75C5 8.08 6.06 6.79 7.87 5.88C8.21 5.72 8.57 5.59 8.95 5.5" />
        <path d="M9.5 9C7 9 4.5 10.15 4.5 12.5C4.5 14.06 5.44 15.42 6.66 16.19" />
        
        {/* Rupee Path (Integrated) */}
        <path d="M15 13.5h-5.5" />
        <path d="M15 16.5h-5.5" />
        <path d="M9.5 13.5c-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5h5.5" />
      </svg>
    </div>
  );
}
