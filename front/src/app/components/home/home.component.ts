import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SurveysService } from '../../services/surveys.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private surveysService: SurveysService = inject(SurveysService);
  private router = inject(Router);
  public loading: WritableSignal<boolean> = signal(false);
  private _snackBar = inject(MatSnackBar);

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

  handleGetSurveysByStatus() {
    if (this.loading()) return;
    this.loading.set(true);
    this.surveysService.getSurveysByStatus('PUBLISHED').subscribe({
      next: (res) => {
        if (res.length === 0) {
          this.handleOpenSnackBar('No se encuentran encuestas publicadas actualmente, intente nuevamente.', 'ERROR');
          return;
        } else {
          const surveyRandom = res[Math.floor(Math.random() * res.length)];

          const currentDate = new Date();
          const expirationDate = new Date(surveyRandom.expiresAt);

          if (currentDate <= expirationDate) {
            this.loading.set(false);
            this.router.navigateByUrl('/create-form', {
              state: { survey: surveyRandom }
            });
          } else {
            this.surveysService.updateStatusSurvey(surveyRandom.id).subscribe({
              next: (res) => {
                this.loading.set(false);
                this.handleGetSurveysByStatus();
              }, error: (error) => {
                this.loading.set(false);
                console.error("Error: ", error);
              }
            })
          }
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error("Error: ", error);
        this.handleOpenSnackBar('Ocurrió un error al buscar la encuesta, intente nuevamente.', 'ERROR');
        this.loading.set(false);
      },
    });
  }

}
