import {useEffect, useRef, useState} from "react";
import * as InterviewService from '@/lib/client/services/interview.service';

export function useQuestions({interviewId}: {interviewId: string}) {
    const isDone = useRef(false);
    const [questions, setQuestions] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const storedQuestions = await localStorage.getItem('questions');
            if (storedQuestions) {
                setQuestions(JSON.parse(storedQuestions));
                isDone.current = true;
                return;
            }
            const fetchedQuestions = await InterviewService.getInterviewQuestions({interviewId});
            if (fetchedQuestions) {
                setQuestions(fetchedQuestions);
                localStorage.setItem('questions', JSON.stringify(fetchedQuestions));
                isDone.current = true;
            }
        })();
    }, [interviewId]);

    return {questions, isDone: isDone.current};
}
