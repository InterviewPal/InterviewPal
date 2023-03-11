import {NextApiRequest, NextApiResponse} from "next";
import {ErrorDto} from "@/lib/dtos";

// asks chatGPT to give an overall feedback of the full interview Q and A and then sends back the feedback as stream.
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ErrorDto>
) {

}
