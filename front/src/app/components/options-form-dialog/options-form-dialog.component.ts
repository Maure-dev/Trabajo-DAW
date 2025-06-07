import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal, ViewChild, ElementRef, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-options-form-dialog',
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './options-form-dialog.component.html',
  styleUrl: './options-form-dialog.component.css'
})
export class OptionsFormDialogComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  public optionQuestions: WritableSignal<{ text: string }[]> = signal([{ text: "" }]);
  public isSubmitDisabled: WritableSignal<boolean> = signal(true);
  public title: WritableSignal<string> = signal("");

  readonly dialogRef = inject(MatDialogRef<OptionsFormDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA, { optional: true }) as { optionQuestions: { text: string }[], title: string; };

  ngOnInit(): void {
    if (this.data?.optionQuestions?.length) {
      this.optionQuestions.set(this.data.optionQuestions);
      const hasValidOption = this.data.optionQuestions.some(q => q.text.trim() !== "");
      this.isSubmitDisabled.set(!hasValidOption);
    }
    this.title.set(this.data?.title || "Configuración de opciones");
  }

  handleCloseDialog() {
    this.dialogRef.close();
  }

  handleAddOptionQuestion() {
    this.optionQuestions.update(questions => [...questions, { text: "" }]);
    const hasValidOption = this.optionQuestions().some(q => q.text.trim() !== "");
    this.isSubmitDisabled.set(!hasValidOption);
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }

  private scrollToBottom() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  handleSetOptionQuestion(e: Event, index: number) {
    const input = e.target as HTMLInputElement;
    this.optionQuestions.update(questions => {
      questions[index].text = input.value;
      return [...questions];
    });
    const hasValidOption = this.optionQuestions().some(q => q.text.trim() !== "");
    this.isSubmitDisabled.set(!hasValidOption);
  }

  handleDeleteOptionQuestion(index: number) {
    this.optionQuestions.update(questions => {
      questions.splice(index, 1);
      return [...questions];
    })
    const hasValidOption = this.optionQuestions().some(q => q.text.trim() !== "");
    this.isSubmitDisabled.set(!hasValidOption);
  }

  handleSubmit() {
    const completedOptions = this.optionQuestions().filter(q => q.text.trim() !== "");
    this.dialogRef.close(completedOptions);
  }

}
