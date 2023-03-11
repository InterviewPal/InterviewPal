export interface InterviewQuestionSubmissionPayload {
    tmpUserUUID: string;
    interviewUUID: string;
    promptNumber: number;
    question: string;
    userAnswerContent: string;
}
