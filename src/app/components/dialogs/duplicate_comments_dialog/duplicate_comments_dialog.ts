import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'duplicate-comments-dialog',
  templateUrl: './duplicate_comments_dialog.html',
  styleUrls: ['./duplicate_comments_dialog.scss']
})
export class DuplicateCommentsDialog {
  constructor(public dialogRef: MatDialogRef<DuplicateCommentsDialog>){}
}
