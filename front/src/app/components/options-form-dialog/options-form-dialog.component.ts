import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-options-form-dialog',
  imports: [CommonModule],
  templateUrl: './options-form-dialog.component.html',
  styleUrl: './options-form-dialog.component.css'
})
export class OptionsFormDialogComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  public optionQuestions: WritableSignal<{ description: string }[]> = signal([{ description: "" }]);
  readonly dialogRef = inject(MatDialogRef<OptionsFormDialogComponent>);

  ngAfterViewInit() {
    // Optional: any initialization after view init if needed
  }

  handleCloseDialog() {
    this.dialogRef.close();
  }

  handleAddOptionQuestion() {
    this.optionQuestions.update(questions => [...questions, { description: "" }]);
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
      questions[index].description = input.value;
      return [...questions];
    });
  }

  handleDeleteOptionQuestion(index: number) {
    this.optionQuestions.update(questions => {
      questions.splice(index, 1);
      return [...questions];
    })
  }

}
