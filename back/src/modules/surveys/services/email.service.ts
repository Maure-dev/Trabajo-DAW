import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { join } from 'path';


@Injectable()
export class EmailService {
  private readonly transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.hbs',
          layoutsDir: join(__dirname, '..', 'templates'),
          defaultLayout: false,
        },
        viewPath: join(__dirname, '..', 'templates'),
        extName: '.hbs',
      }),
    );
  }


  async sendSurveyConfirmation (
    to: string,
    data: {
      titleSurvey: string;
      questions: { text: string; answer: string }[];
      dateUpdate: string;
    },
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        to,
        from: `"Encuestas App" <${process.env.EMAIL_USER}>`,
        subject: `Encuesta "${data.titleSurvey}" contestada`,
        template: 'survey-submitted',
        context: data,
      });
      this.logger.log(`Correo enviado a ${to}`);
    } catch (error) {
      this.logger.error(`Error enviando email a ${to}`, error.stack);
    }
  }
}
