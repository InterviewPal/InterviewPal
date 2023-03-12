import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorDto} from "@/lib/shared/dtos/error.dto";
import {IdentityService} from "@/lib/server/services/identity.service";
import {InterviewQuestion} from "@/lib/shared/models/interview.models";
import {UserRepository} from "@/lib/server/repositories/user.repository";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<InterviewQuestion[] | ErrorDto>
) {
    const { method } = req;

    switch (method) {
        case 'GET':
            // Authorize the user and return 401 if not authorized.
            const user = await IdentityService.authorizeSession(req);
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const { uuid } = req.query;
            if (uuid === undefined || typeof uuid !== 'string') {
                res.status(400).json({ message: 'Bad Request' });
                return;
            }

            const interviewQuestions = await UserRepository.getInterviewResultsByInterviewUUID({
                tmpUserUUID: user.uuid,
                interviewUUID: uuid
            });

            res.status(200).json(interviewQuestions);
            return;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
            return;
    }
}
