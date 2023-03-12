import questions from '@/data/questions.json';
import {InterviewType} from "@/lib/shared/models/interview.models";

export const QuestionService = {
    // fetchs random questions from questions.json file
    async fetchQuestions({interviewType, length}: {interviewType: InterviewType, length: number}){
        const questionSet = questions[interviewType];
        const shuffledQuestions = questionSet.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, length);
        return selectedQuestions;
    }
}
