import {InterviewType} from "@/lib/shared/models/interview.models";

export interface CreateInterviewPayload {
    type: InterviewType;
    userId?: string; // for back-end use only
}
