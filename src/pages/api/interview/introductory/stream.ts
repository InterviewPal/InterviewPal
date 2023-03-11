// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {ErrorDto} from "@/lib/dtos/error.dto";
import {IdentityService} from "@/lib/services/identity.service";

type ResponseData = {
    name: string
}

// asks chatGPT to give feedback and then sends back the feedback as stream. The stream is then saved in Redis as well (async and ignored so Redis won't block the thread).
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | ErrorDto>
) {
    // Authorize the user and return 401 if not authorized.
    const user = await IdentityService.authorizeSession(req);
    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }



    res.status(200).json({ name: 'John Doe' });
}
