import {ApiRequestService} from "@/lib/client/services/apiRequest.service";
import {CreateInterviewPayload} from "@/lib/shared/dtos/createInterview.payload";
import {Interview} from "@/lib/shared/models/interview.model";

export async function createInterview() {
    const result = await ApiRequestService.post({
        url: '/api/interview',
        params: {

        } as CreateInterviewPayload,
        shouldAuth: true,
    });

    if (result.status === 201) {
        return await result.json() as unknown as Interview;
    }
    return null;
}

export async function getInterviewQuestions({interviewId}: {interviewId: string}) {

}
