import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'preview-comments-dialog',
  templateUrl: './preview-comments-dialog.html',
  styleUrls: ['./preview-comments-dialog.scss']
})
export class PreviewCommentsDialog {
  constructor(public dialogRef: MatDialogRef<PreviewCommentsDialog>){}
}
