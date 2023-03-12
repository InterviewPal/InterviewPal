import {useEffect} from "react";

export function useChatRoomHelpers({chatRoomRef, chatBubbles, handleSubmit, currentQuestionIndex, answer}: any) {
    // scroll to the bottom of the chat room when the chat bubbles change
    useEffect(() => {
        if (chatRoomRef.current) {
            chatRoomRef.current.scrollIntoView({behavior: "smooth"});
            chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight ?? 0;
        }
    }, [chatBubbles]);

    // handle the enter key press -> (next question or submit the interview)
    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent) => {
            // check if the user holds the shift key
            if (e.shiftKey) {
                return;
            }
            if (e.key === "Enter" ) {
                handleSubmit();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [currentQuestionIndex, answer, chatBubbles]);
}
