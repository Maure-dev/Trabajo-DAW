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
  public statusForm: WritableSignal<string> = signal("NEW");
  public timeForm: WritableSignal<number> = signal(1);

  public questions: WritableSignal<{
    text: string;
    type: string;
    options: { text: string }[];
    answer: string;
    status: string;
  }[]> = signal([{
    text: '',
    type: 'MULTIPLE_CHOICE',
    options: [],
    answer: "",
    status: 'EDIT'
  }]);

  readonly dialog = inject(MatDialog);

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

  handleUpdateQuestionAnswer(idx: number, e: Event) {
    const copy = [...this.questions()];
    const input = e.target as HTMLTextAreaElement;
    copy[idx].answer = input.value;
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

  handleSaveForm() {
    const data = {
      title: this.titleForm(),
      questions: this.questions(),
      duration: this.timeForm()
    }
    console.log("MAURE", data)
  }
}
