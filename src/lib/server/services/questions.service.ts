import questions from '@/data/questions.json';
import {InterviewType} from "@/lib/shared/models/interview.models";

export const QuestionService = {
    // fetchs random questions from questions.json file
    async fetchQuestions({interviewType, length}: {interviewType: InterviewType, length: number}){
        const questionSet = questions[interviewType];
        const spliceIndex = questionSet.indexOf("SEPARATOR");
        const personalQuestions = questionSet.slice(0, spliceIndex);
        const technicalQuestions = questionSet.slice(spliceIndex + 1);
        const shuffledPersonalQuestions = personalQuestions.sort(() => 0.5 - Math.random());
        const shuffledTechnicalQuestions = technicalQuestions.sort(() => 0.5 - Math.random());
        const selectedPersonalQuestions = shuffledPersonalQuestions.slice(0, length - 2);
        const selectedTechnicalQuestions = shuffledTechnicalQuestions.slice(0, 2);
        const selectedQuestions = [...selectedPersonalQuestions, ...selectedTechnicalQuestions];
        return selectedQuestions;
    }
}
