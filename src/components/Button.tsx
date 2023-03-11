type ButtonProps = {
    content: string
    width?: string
    arrow: boolean
    onClick: () => void
}

export default function Button({ content, onClick, width, arrow }: ButtonProps) {
    return (
        <button
            className={["flex font-display text-xl font-semibold items-center justify-center h-14 text-rosePineDawn-text dark:text-rosePine-text bg-rosePine-foam dark:bg-rosePineDawn-love rounded-md", width ?? "w-48"].join(" ")}
            onClick={onClick}
        >
            {content}
            <div className="w-8" />
            {arrow && (
                <svg className="w-5 h-5 fill-rosePineDawn-text dark:fill-rosePine-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            )}
        </button>
    )
}