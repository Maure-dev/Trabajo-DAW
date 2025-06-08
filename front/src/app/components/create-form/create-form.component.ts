import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptionsFormDialogComponent } from '../options-form-dialog/options-form-dialog.component';
import { CommonModule } from '@angular/common';
import { SurveysService } from '../../services/surveys.service';
import { Router } from '@angular/router';
import { SurveyResponse } from '../../entities/survey';
import { DiscardFormDialogComponent } from '../discard-form-dialog/discard-form-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-form',
  imports: [CommonModule, MatTooltipModule, MatProgressSpinnerModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent implements OnInit {
  private router = inject(Router);
  public titleForm: WritableSignal<string> = signal("");
  public emailForm: WritableSignal<string> = signal("");
  public statusForm: WritableSignal<string> = signal("NEW");
  public timeForm: WritableSignal<number> = signal(1);
  public loading: WritableSignal<boolean> = signal(false);
  public resultsMode: WritableSignal<boolean> = signal(false);
  public surveyData: WritableSignal<SurveyResponse> = signal({
    id: '',
    title: '',
    linkParticipation: null,
    linkResults: null,
    status: 'DRAFT',
    expiresAt: '',
    questions: []
  });

  public questions: WritableSignal<{
    text: string;
    type: string;
    options: { text: string }[];
    answer: string | string[];
    status: string;
  }[]> = signal([{
    text: '',
    type: 'MULTIPLE_CHOICE',
    options: [],
    answer: "",
    status: 'EDIT'
  }]);

  readonly dialog = inject(MatDialog);

  private surveysService: SurveysService = inject(SurveysService);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    const survey: SurveyResponse = this.router.getCurrentNavigation()?.extras?.state?.['survey']
      ?? history.state['survey'];

    const resultsMode: boolean = this.router.getCurrentNavigation()?.extras?.state?.['resultsMode']
      ?? history.state['resultsMode'];

    if (resultsMode) {
      this.resultsMode.set(resultsMode);
    }

    if (survey) {
      const expiresAtDate = new Date(survey.expiresAt);
      const now = new Date();
      const diffMs = expiresAtDate.getTime() - now.getTime();
      let diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 1) {
        diffDays = 1;
      }

      this.surveyData.set(survey);
      this.titleForm.set(survey.title);
      this.timeForm.set(diffDays);
      this.statusForm.set(survey.status);
      this.questions.set(survey.questions.map(q => ({
        ...q,
        answer: '',
        status: 'SAVE'
      })));
    }
  }

  addNewQuestion() {
    this.questions.set([
      ...this.questions(),
      {
        text: '',
        type: 'MULTIPLE_CHOICE',
        options: [],
        answer: "",
        status: 'EDIT'
      }
    ]);
  }

  handleSetTitleForm(e: Event) {
    const input = e.target as HTMLInputElement;
    this.titleForm.set(input.value);
  }

  handleSetEmailForm(e: Event) {
    const input = e.target as HTMLInputElement;
    this.emailForm.set(input.value);
  }

  handleSetTimeForm(e: Event) {
    const input = e.target as HTMLInputElement;
    this.timeForm.set(Number(input.value));
  }

  handleOpenDialogDynamic(idx: number) {
    const dialogRef = this.dialog.open(OptionsFormDialogComponent, {
      width: "50vw",
      data: {
        optionQuestions: this.questions()[idx].options,
        title: "Configuración de opciones - Pregunta " + (idx + 1)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const copy = [...this.questions()];
        copy[idx].options = result;
        this.questions.set(copy);
      }
    });
  }

  handleUpdateQuestionTitle(idx: number, e: Event) {
    const copy = [...this.questions()];
    const input = e.target as HTMLInputElement;
    copy[idx].text = input.value;
    this.questions.set(copy);
  }

  handleUpdateQuestionAnswer(idx: number, e: Event, type: string) {
    const copy = [...this.questions()];

    if (type === 'OPEN' || type === 'SINGLE_CHOICE') {
      const input = e.target as HTMLInputElement | HTMLTextAreaElement;
      copy[idx].answer = input.value;
    } else if (type === 'MULTIPLE_CHOICE') {
      const input = e.target as HTMLInputElement;
      const optionValue = input.value;

      const currentAnswers = Array.isArray(copy[idx].answer)
        ? [...copy[idx].answer]
        : [];

      if (input.checked) {
        if (!currentAnswers.includes(optionValue)) {
          currentAnswers.push(optionValue);
        }
      } else {
        const index = currentAnswers.indexOf(optionValue);
        if (index > -1) {
          currentAnswers.splice(index, 1);
        }
      }

      copy[idx].answer = currentAnswers;
    }

    this.questions.set(copy);
  }

  handleUpdateQuestionType(idx: number, e: Event) {
    const copy = [...this.questions()];
    const input = e.target as HTMLSelectElement;
    copy[idx].type = input.value;
    this.questions.set(copy);
  }

  handleSaveQuestion(idx: number) {
    const copy = [...this.questions()];
    copy[idx].status = 'SAVE';
    this.questions.set(copy);
  }

  handleEditQuestion(idx: number) {
    const copy = [...this.questions()];
    copy[idx].status = 'EDIT';
    this.questions.set(copy);
  }

  handleDeleteQuestion(idx: number) {
    this.questions.update(questions => {
      questions.splice(idx, 1);
      return [...questions];
    })
  }

  handleDiscardForm() {
    if (this.resultsMode()) {
      this.router.navigateByUrl('/');
      return;
    }
    const dialogRef = this.dialog.open(DiscardFormDialogComponent, {
      width: "50vw",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/');
      }
    });
  }

  handleOpenSnackBar(message: string, type: 'ERROR' | 'SUCCESS') {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: message,
        type: type
      },
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  handleSaveForm(publish: boolean = false) {
    if (this.loading()) return;
    this.loading.set(true);
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    expirationDate.setDate(currentDate.getDate() + this.timeForm());
    const questionsData = this.questions().map(q => {
      const { answer, status, ...rest } = q;
      if (q.type === 'OPEN') {
        const { options, ...restWithoutOptions } = rest;
        return restWithoutOptions;
      }
      return rest;
    })

    const data = {
      title: this.titleForm(),
      questions: questionsData,
      duration: expirationDate.toISOString()
    }

    if (this.statusForm() === 'NEW') {
      this.surveysService.createSurvey(data).subscribe({
        next: (res) => {
          this.statusForm.set("DRAFT");
          this.surveyData.set(res);
          if (publish) {
            this.surveysService.updateStatusSurvey(res.id).subscribe({
              next: (res) => {
                this.loading.set(false);
                this.router.navigateByUrl(
                  '/links-published-form?surveyTitle=' +
                  res.title +
                  '&linkParticipation=' +
                  res.linkParticipation +
                  '&linkResults=' +
                  res.linkResults
                );
              }, error: (error) => {
                this.handleOpenSnackBar('Ocurrió un error al publicar la encuesta, intente nuevamente.', 'ERROR');
                this.loading.set(false);
                console.error("Error: ", error);
              }
            })
          } else {
            this.loading.set(false);
            this.handleOpenSnackBar('Éxito al guardar la encuesta como borrador', 'SUCCESS');
          }
        },
        error: (error) => {
          this.loading.set(false);
          this.handleOpenSnackBar('Ocurrió un error al guardar la encuesta como borrador, intente nuevamente.', 'ERROR');
          console.error("Error: ", error);
        },
      });
    } else if (this.statusForm() === 'DRAFT') {
      this.surveysService.updateSurvey(data, this.surveyData().id).subscribe({
        next: (res) => {
          if (publish) {
            this.surveysService.updateStatusSurvey(res.id).subscribe({
              next: (res) => {
                this.loading.set(false);
                this.router.navigateByUrl(
                  '/links-published-form?surveyTitle=' +
                  res.title +
                  '&linkParticipation=' +
                  res.linkParticipation +
                  '&linkResults=' +
                  res.linkResults
                );

              }, error: (error) => {
                this.loading.set(false);
                this.handleOpenSnackBar('Ocurrió un error al publicar la encuesta, intente nuevamente.', 'ERROR');
                console.error("Error: ", error);
              }
            })
          } else {
            this.loading.set(false);
            this.handleOpenSnackBar('Éxito al guardar la encuesta como borrador', 'SUCCESS');
          }
        },
        error: (error) => {
          this.loading.set(false);
          this.handleOpenSnackBar('Ocurrió un error al actualizar la encuesta, intente nuevamente.', 'ERROR');
          console.error("Error: ", error);
        },
      });
    }
  }

  handleSendAnswers() {
    if (this.loading()) return;
    this.loading.set(true);
    const questionsData = this.questions().map(q => {
      const { status, options, type, ...rest } = q;
      return rest;
    })
    const data = {
      title: this.titleForm(),
      email: this.emailForm(),
      questions: questionsData
    }
    this.surveysService.sendSurveyAnswers(data, this.surveyData().id).subscribe({
      next: (res) => {
        if (res.success) {
          this.loading.set(false);
          this.handleOpenSnackBar('Éxito al enviar sus respuestas', 'SUCCESS');
          this.router.navigateByUrl('/');
        } else {
          this.loading.set(false);
          console.error("Error: ", res.message);
          this.handleOpenSnackBar(res.message, 'ERROR');
        }

      },
      error: (error) => {
        this.loading.set(false);
        this.handleOpenSnackBar('Ocurrió un error al enviar sus respuestas, intente nuevamente.', 'ERROR');
        console.error("Error: ", error);
      },
    });
  }


  hasQuestionsInEditStatus(): boolean {
    return this.questions().some(q => q.status === 'EDIT');
  }

  hasTitleFormEmpty(): boolean {
    return this.titleForm() === '';
  }

  hasTimeFormEmpty(): boolean {
    return this.timeForm() < 1;
  }

  hasQuestionsWhitoutAnswer(): boolean {
    return this.questions().some(q => q.answer === '' || q.answer.length === 0);
  }
}
