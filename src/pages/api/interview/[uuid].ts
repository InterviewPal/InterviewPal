import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorDto} from "@/lib/dtos/error.dto";
import {IdentityService} from "@/lib/services/identity.service";
import {Interview, InterviewRepository} from "@/lib/repositories/interview.repository";

// get the interview by interview uuid
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Interview | ErrorDto>
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

            const { uuid } = req.body;
            if (!uuid) {
                res.status(400).json({ message: 'Bad Request' });
                return;
            }

            const interview = await InterviewRepository.getInterviewById(uuid);
            if (!interview) {
                res.status(404).json({ message: 'Not Found' });
                return;
            }

            res.status(200).json(interview);
            return;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
            return;
    }
}
