import {NextApiRequest, NextApiResponse} from "next";
import {AssessAllInterviewQuestionsPayload, ErrorDto} from "@/lib/shared/dtos";
import {IdentityService} from "@/lib/server/services/identity.service";
import {z} from "zod";
import {InterviewService} from "@/lib/server/services/interview.service";

// asks chatGPT to give an overall feedback of the full interview Q and A and then sends back the feedback as stream.
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

    console.log("/done payload", payload)

    // stream chunguses
    const stream = await InterviewService.assessAllInterviewQuestions(payload);
    return new Response(stream);
}

function inputValidator(payload: unknown): AssessAllInterviewQuestionsPayload | null {
    const assessAllInterviewQuestionsPayload = z.object({
        interviewUUID: z.string(),
        tmpUserUUID: z.string(),
    });

    const result = assessAllInterviewQuestionsPayload.safeParse(payload);
    if (!result.success) {
        return null;
    }
    return result.data;
}
