type ChatBubbleProps = {
    inverted?: boolean
    text: string
}

export default function ChatBubble({ inverted, text }: ChatBubbleProps) {
    return (
        <>
            <div className="chat-bubble-dark relative border-2 border-rosePineDawn-highlightHigh dark:border-rosePine-highlightHigh bg-rosePineDawn-overlay dark:bg-rosePine-overlay rounded-2xl p-4 w-3/4 z-10">
                <div className="chat-bubble-text text-rosePineDawn-text dark:text-rosePine-text">
                    {text}
                </div>
            </div>
        </>
    )
}