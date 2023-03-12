import {ApiRequestService} from "@/lib/client/services/apiRequest.service";
import {CreateInterviewPayload} from "@/lib/shared/dtos/createInterview.payload";
import {Interview, InterviewQuestion, InterviewType} from "@/lib/shared/models/interview.models";
import {AssessAllInterviewQuestionsPayload, InterviewQuestionSubmissionPayload} from "@/lib/shared/dtos";

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

export async function getInterviewById({ interviewUUID }: { interviewUUID: string}) {
    const response = await ApiRequestService.get({
        url: `/api/interview/${interviewUUID}`,
        shouldAuth: true,
    });

    if (response.status === 200) {
        return await response.json() as unknown as Interview;
    }

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

// the return response COULD be ignored. It's just a stream of the feedback.
export async function submitOneQuestion(payload: InterviewQuestionSubmissionPayload) {
    const response = await ApiRequestService.post({
        url: '/api/interview/mock/introductory/submitQuestion',
        params: payload,
        shouldAuth: true,
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    // This data is a ReadableStream
    // const data = response.body;
    // if (!data) return;
    //
    // return data;

    return response.json();
}

export async function getOverallAnswer(payload: AssessAllInterviewQuestionsPayload) {
    const response = await ApiRequestService.post({
        url: '/api/interview/mock/introductory/done',
        params: payload,
        shouldAuth: true,
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) return;

    return data;
}

export async function getAllInterviewQuestionResults({interviewUUID}: {interviewUUID: string}) {
    const result = await ApiRequestService.get({
        url: `/api/interview/getAllAnswers/${interviewUUID}`,
        shouldAuth: true,
    });

    if (result.status === 200) {
        return await result.json() as unknown as InterviewQuestion[];
    }
    console.log(result, await result.json());
    return null;
}
