export default function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="PsycheMoney">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M9 8.5C9 5.76 11.02 4.5 12 4.5C12.98 4.5 15 5.76 15 8.5C15 9.98 14.12 10.99 12.87 11.23C11.62 11.47 11 12.51 11 13.5C11 14.49 11.51 15.5 12.5 15.5C13.49 15.5 14.5 14.49 14.5 13.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6V4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 18V19.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.55 5.5C15.93 5.59 16.29 5.72 16.63 5.88C18.44 6.79 19.5 8.08 19.5 9.75C19.5 11.12 18.88 12.21 17.9 12.88"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.84 16.19C19.06 15.42 20 14.06 20 12.5C20 10.15 17.5 9 15 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 9.75C4.5 8.08 5.56 6.79 7.37 5.88C7.71 5.72 8.07 5.59 8.45 5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 9C6.5 9 4 10.15 4 12.5C4 14.06 4.94 15.42 6.16 16.19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-headline text-xl font-bold text-foreground">
        PsycheMoney
      </span>
    </div>
  );
}
