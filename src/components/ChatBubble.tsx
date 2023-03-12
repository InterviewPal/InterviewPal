type ChatBubbleProps = {
    inverted?: boolean
    text: string
}

export default function ChatBubble({ inverted, text }: ChatBubbleProps) {
    return (
        <div className={`chat-bubble ${inverted ? 'inverted self-end mr-7 border-[#524f67]' : 'border-rosePineDawn-love dark:border-rosePine-love dark:ch-dark'} break-words m-3 relative border-[4px] border-rosePineDawn-highlightHigh dark:border-rosePine-highlightHigh bg-rosePineDawn-overlay dark:bg-rosePine-overlay rounded-2xl p-4 w-3/4 z-10`}>
            <div className="chat-bubble-text text-rosePineDawn-text dark:text-rosePine-text">
                {text}
            </div>
        </div>
    )
}
