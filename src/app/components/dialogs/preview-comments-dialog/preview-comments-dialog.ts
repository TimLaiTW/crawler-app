import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  comments: string[];
}
@Component({
  selector: 'preview-comments-dialog',
  templateUrl: './preview-comments-dialog.html',
  styleUrls: ['./preview-comments-dialog.scss']
})
export class PreviewCommentsDialog {
  constructor(public dialogRef: MatDialogRef<PreviewCommentsDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData){}
}
