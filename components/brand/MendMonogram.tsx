type MendMonogramProps = {
  className?: string;
};

/** Brand monogram — icon / favicon / watermark use. */
export default function MendMonogram({ className = "h-10 w-10" }: MendMonogramProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 34V14l7 12 7-12v20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 14c0 0 3.5 5 7 10-3.5 5-7 10-7 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 32c5-8 11-15 18-19"
        stroke="#b08d57"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="9" cy="30" r="1.2" fill="#b08d57" />
    </svg>
  );
}
