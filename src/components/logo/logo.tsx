interface Props {
  size?: number;
  className?: string;
}

export function Logo({ size = 14, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 1V10.2021L10.2021 13H1V1H13Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
