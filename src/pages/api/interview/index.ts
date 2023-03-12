import {NextApiRequest, NextApiResponse} from "next";
import {Interview, InterviewRepository} from "@/lib/server/repositories/interview.repository";
import {ErrorDto} from "@/lib/shared/dtos/error.dto";
import {IdentityService} from "@/lib/server/services/identity.service";

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

            const interview = await InterviewRepository.createInterview(user.uuid);
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
