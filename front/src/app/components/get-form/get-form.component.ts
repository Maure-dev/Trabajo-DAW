import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SurveysService } from '../../services/surveys.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-get-form',
  imports: [RouterModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './get-form.component.html',
  styleUrl: './get-form.component.css'
})
export class GetFormComponent {
  private surveysService: SurveysService = inject(SurveysService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);
  public linkForm: WritableSignal<string> = signal("");
  public loading: WritableSignal<boolean> = signal(false);

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
    if (this.loading()) return;
    this.loading.set(true);
    this.surveysService.getSurveyByParticipationLink(this.linkForm().split('/')[4]).subscribe({
      next: (res) => {
        if (res.status !== 'PUBLISHED') {
          this.handleOpenSnackBar('La encuesta ingresada no se encuentra publicada, intente nuevamente.', 'ERROR');
          this.loading.set(false);
          return;
        } else {
          const currentDate = new Date();
          const expirationDate = new Date(res.expiresAt);

          if (currentDate <= expirationDate) {
            this.loading.set(false);
            this.router.navigateByUrl('/create-form', {
              state: { survey: res }
            });
          } else {
            this.surveysService.updateStatusSurvey(res.id).subscribe({
              next: (res) => {
                this.loading.set(false);
              }, error: (error) => {
                this.loading.set(false);
                console.error("Error: ", error);
              }
            })
            this.handleOpenSnackBar('La encuesta ha expirado. Consulte e intente nuevamente.', 'ERROR');
          }
        }
      }, error: (error) => {
        console.error("Error: ", error);
        this.loading.set(false);
        this.handleOpenSnackBar('Ocurrió un error al buscar la encuesta, intente nuevamente.', 'ERROR');
      }
    });
  }
}
