import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyResponse, SurveyResponseStatus } from '../entities/survey';

@Injectable({ providedIn: 'root' })
export class SurveysService {
    private httpClient = inject(HttpClient);
    private API_URL: string = 'http://localhost:3000';


    getSurveyById(surveyId: string): Observable<SurveyResponse> {
        return this.httpClient.get<SurveyResponse>(`${this.API_URL}/surveys/${surveyId}`);
    }

    getSurveyByResultLink(surveyId: string): Observable<SurveyResponse> {
        return this.httpClient.get<SurveyResponse>(`${this.API_URL}/surveys/results/${surveyId}`);
    }

    getSurveyByParticipationLink(surveyId: string): Observable<SurveyResponse> {
        return this.httpClient.get<SurveyResponse>(`${this.API_URL}/surveys/participate/${surveyId}`);
    }

    createSurvey(survey: {
        title: string;
        questions: {
            text: string;
            type: string;
            options?: { text: string }[];
        }[],
        duration: string;
    }): Observable<SurveyResponse> {
        return this.httpClient.post<SurveyResponse>(`${this.API_URL}/surveys`, survey);
    }

    updateSurvey(survey: {
        title: string;
        questions: {
            text: string;
            type: string;
            options?: { text: string }[];
        }[],
        duration: string;
    }, surveyId: string): Observable<SurveyResponse> {
        return this.httpClient.put<SurveyResponse>(`${this.API_URL}/surveys/${surveyId}`, survey);
    }

    sendSurveyAnswers(survey: {
        title: string;
        email: string;
        questions: {
            text: string;
            answer: string | string[];
        }[],
    }, surveyId: string): Observable<{ success: boolean; message: string; }> {
        return this.httpClient.post<{ success: boolean; message: string; }>(`${this.API_URL}/surveys/answers/${surveyId}`, survey);
    }

    updateStatusSurvey(surveyId: string): Observable<SurveyResponseStatus> {
        return this.httpClient.patch<SurveyResponseStatus>(`${this.API_URL}/surveys/${surveyId}/status`, {}, { responseType: 'json' });
    }

    getSurveysByStatus(status: string): Observable<SurveyResponse[]> {
        return this.httpClient.get<SurveyResponse[]>(`${this.API_URL}/surveys?status=${status}`);
    }

    deleteSurveyById(surveyId: string): Observable<SurveyResponse> {
        return this.httpClient.delete<SurveyResponse>(`${this.API_URL}/surveys/${surveyId}`);
    }

}