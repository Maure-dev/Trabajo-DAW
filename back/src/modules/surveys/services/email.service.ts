import { Injectable} from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendSurveyConfirmation (email: string, surveyTitle: string): Promise<void> {
    console.log(`[MOCK EMAIL] Enviando confirmación a ${email} por encuesta "${surveyTitle}"`);
    // en el futuro, implementar envío real
  }
}
