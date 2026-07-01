type Props = {
  className?: string
}

export function CardArrowIcon({ className }: Props) {
  return (
    <svg
      className={className}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6.5 19.5L19.5 6.5M19.5 6.5H9.75M19.5 6.5V16.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
