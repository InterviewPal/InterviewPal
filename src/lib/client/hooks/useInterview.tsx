import {Interview} from "@/lib/shared/models/interview.models";
import {useEffect, useState} from "react";
import * as InterviewService from "@/lib/client/services/interview.service";

export function useInterview(interviewUUID: string) {
    const [isDone, setIsDone] = useState(false);
    const [interview, setInterview] = useState<Interview | null>(null);

    useEffect(() => {
        (async () => {
            if (isDone || !interviewUUID) {
                return;
            }

            const interview = await InterviewService.getInterviewById({interviewUUID});
            if (interview && interview.isDone == "false") {
                setInterview(interview);
            }
            setIsDone(true);
        })();
    }, [interviewUUID]);

    return {interview, isDone};
}
