import {useEffect, useRef, useState} from "react";
import * as InterviewService from '@/lib/client/services/interview.service';

export function useQuestions({interviewId}: {interviewId: string}) {
    const [isDone, setIsDone] = useState(false);
    const [questions, setQuestions] = useState<string[]>([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        (async () => {
            if (isDone || !interviewId) {
                return;
            }
            const storedQuestions = await localStorage.getItem('questions');
            if (storedQuestions) {
                setQuestions(JSON.parse(storedQuestions));
                setIsDone(true);
                return;
            }
            const fetchedQuestions = await InterviewService.getInterviewQuestions({interviewId});
            if (fetchedQuestions) {
                setQuestions(fetchedQuestions);
                localStorage.setItem('questions', JSON.stringify(fetchedQuestions));
                setIsDone(true);
                return;
            }

            setNotFound(true);
        })();
    }, [interviewId]);

    return {questions, isDone, notFound};
}
