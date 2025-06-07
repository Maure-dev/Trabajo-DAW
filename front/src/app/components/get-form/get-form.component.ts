import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SurveysService } from '../../services/surveys.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-get-form',
  imports: [RouterModule],
  templateUrl: './get-form.component.html',
  styleUrl: './get-form.component.css'
})
export class GetFormComponent {
  private surveysService: SurveysService = inject(SurveysService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);
  public linkForm: WritableSignal<string> = signal("");

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
    this.surveysService.getSurveyById(this.linkForm().split('/')[4]).subscribe({
      next: (res) => {
        if (res.status !== 'PUBLISHED') {
          this.handleOpenSnackBar('La encuesta ingresada no se encuentra publicada, intente nuevamente.', 'ERROR');
        } else {
          this.router.navigateByUrl('/create-form', {
            state: { res }
          });
        }

      }, error: (error) => {
        console.error("Error: ", error);
        this.handleOpenSnackBar('Ocurrió un error al buscar la encuesta, intente nuevamente.', 'ERROR');
      }
    });
  }
}
