import {NextApiRequest, NextApiResponse} from "next";
import {InterviewService} from "@/lib/services/interview.service";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    await InterviewService.assessInterviewQuestion({
        tmpUserUUID: "123",
        promptNumber: 1,
        question: "What is your name?",
        userAnswerContent: "My name is John"
    })

    res.status(200).json({ name: 'yes' })
}
