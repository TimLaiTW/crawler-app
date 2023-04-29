import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { jsonValidator, getMsgFromRawData, getLinkFromRawData } from '../../../utils';
import { DcardCommentParams, DcardRawDataType } from '../../../types';
import { emptyCommentData } from '../../../templates';
import { MatDialog } from '@angular/material/dialog';
import { PreviewCommentsDialog } from '../../../components/dialogs/preview-comments-dialog/preview-comments-dialog';
import { DcardService } from 'src/app/services/dcard.service';
import { PageHeader } from '../../../static_string';

@Component({
  selector: 'dcard-execution-step',
  templateUrl: './dcard_execution_step.html',
  styleUrls: ['./dcard_execution_step.scss']
})
export class DcardExecutionStep {
  PageHeader = PageHeader;
  articleJSONFormGroup!: FormGroup;
  commentsData:DcardCommentParams[] = [];
  
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dcardService: DcardService
  ){
    this.articleJSONFormGroup = this.formBuilder.group({
      jsonCtrl: ['', [jsonValidator]],
    });
  }

  get jsonCtrl() { return this.articleJSONFormGroup.get('jsonCtrl');}

  previewComments(){
    const commentList = this.commentsData.map(comments => comments.comment).filter(comment => comment.length);
    this.dialog.open(PreviewCommentsDialog, {
      data: {
        comments: commentList || []
      },
      width: '50rem',
    });
  }

  collectRawData() {
    if (!this.jsonCtrl || !this.jsonCtrl?.value){
      return;
    }
    
    let continueUnmarshal: boolean = false;
    if (!this.dcardService.isSameRawData(this.jsonCtrl.value)){
      continueUnmarshal = true;
      this.dcardService.setRawData(this.jsonCtrl.value);
    }
    else {
      // TODO: pop up dialog for confirmming if same data is intended.
      // If dialog return yes!
      // continueUnmarshal = true;
    }

    if (continueUnmarshal){
      const jsonParse = JSON.parse(this.jsonCtrl.value)
      const rawDataArray = Object.keys(jsonParse).map(key => jsonParse[key]);
      const commentRaw = rawDataArray.flatMap(rawData => {
        if (rawData[DcardRawDataType.CONTENT]){
          const commentData:DcardCommentParams = {
            comment: getMsgFromRawData(rawData[DcardRawDataType.CONTENT]),
            link: getLinkFromRawData(rawData[DcardRawDataType.MEDIAMETA]),
            host: rawData[DcardRawDataType.HOST],
            subCommentCount: rawData[DcardRawDataType.SUBCOMMENTCOUNT]
          }
          const emptyCommentRaws:DcardCommentParams[] = Array(commentData.subCommentCount).fill(emptyCommentData);
          return [commentData, ...emptyCommentRaws];
        }
        return [];
      });
      
      this.commentsData.push(...commentRaw);
      this.dcardService.setCommentDataList(this.commentsData);
      this.jsonCtrl.setValue('');
    }
  }
}
