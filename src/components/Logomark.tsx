export const Logomark = () => {
  return (
    <div className="ml-2 flex items-center gap-2 px-4 py-2">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="14" cy="6" r="3.5" fill="#8B5CF6" />
        <circle cx="6" cy="20" r="3.5" fill="#3B82F6" />
        <circle cx="22" cy="20" r="3.5" fill="#3B82F6" />
        <path
          d="M14 9.5L7.5 17M14 9.5L20.5 17"
          stroke="#8B5CF6"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
      <h2 className="text-lg font-bold">Nexo</h2>
    </div>
  )
}
