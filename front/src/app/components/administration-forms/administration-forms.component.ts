import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SurveysService } from '../../services/surveys.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SurveyResponse } from '../../entities/survey';
import { Router, RouterModule } from '@angular/router';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DiscardFormDialogComponent } from '../discard-form-dialog/discard-form-dialog.component';

@Component({
  selector: 'app-administration-forms',
  imports: [CommonModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './administration-forms.component.html',
  styleUrl: './administration-forms.component.css'
})
export class AdministrationFormsComponent implements OnInit {
  private surveysService: SurveysService = inject(SurveysService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);
  public loading: WritableSignal<boolean> = signal(true);
  public surveys: WritableSignal<SurveyResponse[]> = signal([]);
  public linkForm: WritableSignal<string> = signal("");

  ngOnInit(): void {
    this.handleGetSurveysByStatus();
  }

  handleGetSurveysByStatus() {
    this.loading.set(true);
    this.surveysService.getSurveysByStatus('DRAFT').subscribe({
      next: (res) => {
        this.surveys.set(res);
        this.loading.set(false);
      },
      error: (error) => {
        console.error("Error: ", error);
        this.loading.set(false);
      },
    });
  }

  handleSetLinkForm(e: Event) {
    const input = e.target as HTMLInputElement;
    this.linkForm.set(input.value);
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

  handleSearchPublishedForm() {
    this.surveysService.getSurveyByResultLink(this.linkForm().split('/')[4]).subscribe({
      next: (res) => {
        if (res.status !== 'PUBLISHED') {
          this.handleOpenSnackBar('La encuesta ingresada no se encuentra publicada, intente nuevamente.', 'ERROR');
        } else {
          this.router.navigateByUrl('/create-form', {
            state: { survey: res, resultsMode: true }
          });
        }

      }, error: (error) => {
        console.error("Error: ", error);
        this.handleOpenSnackBar('Ocurrió un error al buscar la encuesta, intente nuevamente.', 'ERROR');
      }
    });
  }

  handleEditSurvey(survey: SurveyResponse) {
    this.router.navigateByUrl('/create-form', {
      state: { survey: survey }
    });
  }

  handleDeleteSurvey(survey: SurveyResponse) {
    const dialogRef = this.dialog.open(DiscardFormDialogComponent, {
      width: "50vw",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.surveysService.deleteSurveyById(survey.id).subscribe({
          next: (res) => {
            this.handleOpenSnackBar('Éxito al eliminar la encuesta', 'SUCCESS');
            this.handleGetSurveysByStatus();
          }, error: (error) => {
            console.error("Error: ", error);
            this.handleOpenSnackBar('Ocurrió un error al eliminar la encuesta, intente nuevamente.', 'ERROR');
          }
        });
      }
    });
  }
}
