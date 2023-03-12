export interface Interview {
    uuid: string;
    type: InterviewType;
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

export enum InterviewType {
    personalQuestions = 'personalQuestions',
    technicalQuestions = 'technicalQuestions',
}
