import {NextApiRequest, NextApiResponse} from "next";
import {InterviewRepository} from "@/lib/server/repositories/interview.repository";
import {ErrorDto} from "@/lib/shared/dtos/error.dto";
import {IdentityService} from "@/lib/server/services/identity.service";
import {z} from "zod";
import {CreateInterviewPayload} from "@/lib/shared/dtos/createInterview.payload";
import {Interview} from "@/lib/shared/models/interview.models";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Interview | ErrorDto>
) {
    const {method} = req;

    switch (method) {
        case 'POST':
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

            payload.userId = user.uuid;

            const interview = await InterviewRepository.createInterview(payload);
            if (!interview) {
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }

            res.status(201).json(interview);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            return;
    }
}

function inputValidator(payload: unknown): CreateInterviewPayload | null {
    const createInterviewPayload = z.object({

    });

    const result = createInterviewPayload.safeParse(payload);
    if (!result.success) {
        return null;
    }
    return result.data;
}
