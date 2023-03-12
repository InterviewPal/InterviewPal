import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorDto} from "@/lib/shared/dtos/error.dto";
import {IdentityService} from "@/lib/server/services/identity.service";
import {InterviewService} from "@/lib/server/services/interview.service";
import {InterviewQuestionSubmissionPayload} from "@/lib/shared/dtos";
import { z } from "zod";
import {ChatgptAnswer} from "@/lib/shared/models/chatgptAnswer.model";

// asks chatGPT to give feedback and then sends back the feedback as stream. The stream is then saved in Redis as well (async and ignored so Redis won't block the thread).
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ChatgptAnswer | ErrorDto>
) {
    // Authorize the user and return 401 if not authorized.
    const user = await IdentityService.authorizeSession(req);
    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const payload = inputValidator(req.body);
    if (payload == null) {
        // invalid input
        res.status(400).json({ message: 'Bad Input'});
        return;
    }

    // stream chunguses
    // const stream = await InterviewService.assessInterviewQuestion(payload);
    // return stream.pipe(res);

    const answer = await InterviewService.assessInterviewQuestion(payload);
    console.log("answer", answer)
    res.status(200).json(JSON.parse(answer) as ChatgptAnswer);
}

function inputValidator(payload: unknown): InterviewQuestionSubmissionPayload | null {
    const interviewQuestionSubmissionPayload = z.object({
        tmpUserUUID: z.string(),
        interviewUUID: z.string(),
        promptNumber: z.number(),
        question: z.string(),
        userAnswerContent: z.string().max(1200),
    });

    const result = interviewQuestionSubmissionPayload.safeParse(payload);
    if (!result.success) {
        return null;
    }
    return result.data;
}
