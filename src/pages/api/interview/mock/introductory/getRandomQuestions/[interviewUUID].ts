import {NextApiRequest, NextApiResponse} from "next";
import {ErrorDto} from "@/lib/shared/dtos/error.dto";
import {IdentityService} from "@/lib/server/services/identity.service";
import {GetRandomQuestionsPayload} from "@/lib/shared/dtos";
import {z} from "zod";
import {QuestionService} from "@/lib/server/services/questions.service";
import {InterviewRepository} from "@/lib/server/repositories/interview.repository";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string[] | ErrorDto>
) {
    const {method} = req;

    switch (method) {
        case 'GET':
            // Authorize the user and return 401 if not authorized.
            const user = await IdentityService.authorizeSession(req);
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const payload = inputValidator(req.query);
            if (payload == null) {
                // invalid input
                res.status(400).json({ message: 'Bad Input'});
                return;
            }

            const interview = await InterviewRepository.getInterviewById(payload.interviewUUID);
            if (!interview) {
                // interview doesn't exist
                res.status(404).json({ message: 'Interview does not exist'});
                return;
            }

            const questions = await QuestionService.fetchQuestions({
                interviewType: interview.type ?? 'personalQuestions', // the fallback is just for type safety
                length: 5,
            })

            res.status(200).json(questions);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            return;
    }
}

function inputValidator(payload: unknown): GetRandomQuestionsPayload | null {
    const getRandomQuestionsPayload = z.object({
        interviewUUID: z.string(),
    });

    const result = getRandomQuestionsPayload.safeParse(payload);
    if (!result.success) {
        return null;
    }
    return result.data;
}
