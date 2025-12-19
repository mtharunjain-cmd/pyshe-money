export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-2" aria-label="PsycheMoney">
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-yellow-400"
      >
        <path
          d="M15.5 7.5C15.5 5.29 13.71 3.5 11.5 3.5C9.29 3.5 7.5 5.29 7.5 7.5C7.5 9.71 9.29 11.5 11.5 11.5C13.71 11.5 15.5 9.71 15.5 7.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M5.5 14.5V11.5L3.5 9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 11.5V20.5L9.5 18.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-headline text-4xl font-bold text-white tracking-wider">
        PSYCHEMONEY
      </span>
    </div>
  );
}
