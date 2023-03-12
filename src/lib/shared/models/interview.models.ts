export interface Interview {
    uuid: string;
    userUUID: string;
    createdAt: Date;
}

export interface InterviewQuestion {
    userId: string;
    interviewId: string;
    question: string;
    userAnswer: string;
    systemAnswer: string;
}

export type InterviewType = 'personalQuestions' | 'technicalQuestions';
