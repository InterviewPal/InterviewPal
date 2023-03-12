import {ApiRequestService} from "@/lib/client/services/apiRequest.service";
import {CreateInterviewPayload} from "@/lib/shared/dtos/createInterview.payload";
import {Interview, InterviewType} from "@/lib/shared/models/interview.models";

export async function createInterview({type}: {type: InterviewType}) {
    const result = await ApiRequestService.post({
        url: '/api/interview',
        params: {
            type,
        } as CreateInterviewPayload,
        shouldAuth: true,
    });

    if (result.status === 201) {
        return await result.json() as unknown as Interview;
    }
    console.log(result, await result.json());
    return null;
}

export async function getInterviewQuestions({interviewId}: {interviewId: string}) {
    const result = await ApiRequestService.get({
        url: `/api/interview/mock/introductory/getRandomQuestions/${interviewId}`,
        shouldAuth: true,
    });

    if (result.status === 200) {
        return await result.json() as unknown as string[];
    }
    console.log(result, await result.json());
    return null;
}

export async function submitOneQuestion() {

}
