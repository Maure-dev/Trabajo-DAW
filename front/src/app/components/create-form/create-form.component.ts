import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptionsFormDialogComponent } from '../options-form-dialog/options-form-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-form',
  imports: [CommonModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {
  public titleForm: WritableSignal<string> = signal("");
  public timeForm: WritableSignal<number> = signal(1);
  public titleQuestion: WritableSignal<string> = signal("");
  public typeQuestion: WritableSignal<string> = signal("multiple");

  readonly dialog = inject(MatDialog);


  handleSetTitleForm(e: Event) {
    const input = e.target as HTMLInputElement;
    this.titleForm.set(input.value);
  }

  handleSetTimeForm(e: Event) {
    const input = e.target as HTMLInputElement;
    this.timeForm.set(Number(input.value));
  }

  handleSetTitleQuestionForm(e: Event) {
    const input = e.target as HTMLInputElement;
    this.titleQuestion.set(input.value);
  }

  handleSetTypeQuestionForm(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.typeQuestion.set(select.value);
  }

  handleOpenDialog() {
    const dialogRef = this.dialog.open(OptionsFormDialogComponent, {
      width: "50vw"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      }
    });
  }

}
