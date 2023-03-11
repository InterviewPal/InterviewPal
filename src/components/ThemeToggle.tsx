type ThemeToggleProps = {
    theme: 'light' | 'dark' | null
    onClick: () => void
}

export default function ThemeToggle({ theme, onClick }: ThemeToggleProps) {
    return (
        <button
            className="flex items-center justify-center w-8 h-8 text-rosePineDawn-text dark:text-rosePineMoon-text bg-rosePineDawn-base dark:bg-rosePineMoon-base rounded-full"
            onClick={onClick}
        >
            {theme === 'light' ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </button>
    )
}