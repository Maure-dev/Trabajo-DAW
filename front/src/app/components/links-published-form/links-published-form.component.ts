import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-links-published-form',
  imports: [MatTooltipModule, RouterModule],
  templateUrl: './links-published-form.component.html',
  styleUrl: './links-published-form.component.css'
})
export class LinksPublishedFormComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);
  public linkParticipation: WritableSignal<string> = signal("");
  public linkResults: WritableSignal<string> = signal("");
  public titleForm: WritableSignal<string> = signal("");
  public API_URL: string = 'http://localhost:3000';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.titleForm.set(params['surveyTitle'] || '');
      this.linkParticipation.set((`${this.API_URL}/surveys/` + params['linkParticipation']) || '');
      this.linkResults.set((`${this.API_URL}/surveys/` + params['linkResults']) || '');
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

  copyToClipboard(inputId: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) {
      inputElement.select();
      inputElement.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(inputElement.value).then(() => {
        this.handleOpenSnackBar('Éxito al copiar el link de ' + (inputId === 'linkParticipation' ? 'participación' : 'consulta'), 'SUCCESS');
      });
    }
  }
}
