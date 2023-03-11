import {NextApiRequest, NextApiResponse} from "next";
import {InterviewService} from "@/lib/services/interview.service";
import {InterviewRepository} from "@/lib/repositories/interview.repository";
import {IdentityService} from "@/lib/services/identity.service";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // make user
    // const userUUID = await IdentityService.createNewIdentity();
    // if (!userUUID) {
    //     console.error("Failed to create user", userUUID)
    //     res.status(500).json({ message: 'Internal Server Error' });
    //     return;
    // }
    // console.log("userUUID", userUUID);
    //
    // // create interview
    // const createdInterview = await InterviewRepository.createInterview(userUUID);
    // if (!createdInterview) {
    //     console.error("Failed to create interview", createdInterview)
    //     res.status(500).json({ message: 'Internal Server Error' });
    //     return;
    // }
    // console.log("createdInterview", createdInterview);

    const interview = await InterviewRepository.getInterviewById("a883ee18-9491-43f6-988a-5d6bccea035e");
    console.log("interview", interview);

    const user = await IdentityService.getIdentity({uuid: "d822aae9-4588-42b5-ae70-947851e82944"});
    console.log("user", user);

    // await InterviewService.assessInterviewQuestion({
    //     tmpUserUUID: "123",
    //     interviewUUID: "123",
    //     promptNumber: 1,
    //     question: "What is your name?",
    //     userAnswerContent: "My name is John"
    // })

    res.status(200).json({ name: 'yes' })
}
