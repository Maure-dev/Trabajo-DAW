import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-discard-form-dialog',
  imports: [],
  templateUrl: './discard-form-dialog.component.html',
  styleUrl: './discard-form-dialog.component.css'
})
export class DiscardFormDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DiscardFormDialogComponent>);

  handleCloseDialog(confirm: boolean = false) {
    this.dialogRef.close(confirm);
  }
}
