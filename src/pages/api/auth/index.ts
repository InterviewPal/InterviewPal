import type { NextApiRequest, NextApiResponse } from 'next'
import {IdentityService} from "@/lib/server/services/identity.service";
import {ErrorDto} from "@/lib/shared/dtos/error.dto";

type ResponseData = {
    uuid: string
}

// asks chatGPT to give feedback and then sends back the feedback as stream. The stream is then saved in Redis as well (async and ignored so Redis won't block the thread).
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | ErrorDto>
) {
    // Authorize the user and return 401 if not authorized.
    let tmpUser = await IdentityService.authorizeSession(req);
    if (!tmpUser) {
        // make a new token (new user)
        tmpUser = await IdentityService.createNewIdentity();
        if (!tmpUser) {
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ uuid: tmpUser.uuid });
        return;
    }

    res.status(200).json({ uuid: tmpUser.uuid });
}
