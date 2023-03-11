import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorDto} from "@/lib/dtos/error.dto";
import {IdentityService} from "@/lib/services/identity.service";
import {InterviewService} from "@/lib/services/interview.service";
import {InterviewQuestionSubmissionPayload} from "@/lib/dtos";
import { z } from "zod";

// asks chatGPT to give feedback and then sends back the feedback as stream. The stream is then saved in Redis as well (async and ignored so Redis won't block the thread).
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ErrorDto>
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
    const stream = await InterviewService.assessInterviewQuestion(payload);
    return new Response(stream);
}

function inputValidator(payload: unknown): InterviewQuestionSubmissionPayload | null {
    const interviewQuestionSubmissionPayload = z.object({
        tmpUserUUID: z.string(),
        interviewUUID: z.string(),
        promptNumber: z.number(),
        question: z.string(),
        userAnswerContent: z.string(),
    });

    const result = interviewQuestionSubmissionPayload.safeParse(payload);
    if (!result.success) {
        return null;
    }
    return result.data;
}
