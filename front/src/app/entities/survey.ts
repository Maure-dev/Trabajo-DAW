export interface SurveyOption {
    id: string;
    text: string;
}

export interface SurveyQuestion {
    id: string;
    text: string;
    type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'OPEN';
    options: SurveyOption[];
}

export interface SurveyResponse {
    id: string;
    title: string;
    linkParticipation: string | null;
    linkResults: string | null;
    status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
    expiresAt: string;
    questions: SurveyQuestion[];
}

export interface SurveyResponseStatus {
    id: string;
    title: string;
    status: string;
    linkParticipation: string;
    linkResults: string;
}