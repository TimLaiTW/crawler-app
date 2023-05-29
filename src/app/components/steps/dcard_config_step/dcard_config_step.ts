import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DcardService } from 'src/app/services/dcard.service';
import { jsonValidator, getMsgFromRawData, getLinkFromRawData, dcardUrlRegEx } from '../../../utils';
import { TIMEOUT_IN_MILLID } from '../../../constants';
import { MatDialog } from '@angular/material/dialog';
import { DcardCommentParams, DcardRawDataType } from '../../../types';
import { commentDataTemplate } from '../../../templates';
import { PreviewCommentsDialog } from '../../dialogs/preview_comments_dialog/preview_comments_dialog';
import { DuplicateCommentsDialog } from '../../dialogs/duplicate_comments_dialog/duplicate_comments_dialog';
@Component({
  selector: 'dcard-config-step',
  templateUrl: './dcard_config_step.html',
  styleUrls: ['./dcard_config_step.scss']
})
export class DcardConfigStep implements OnInit{
  dcardDataFormGroup!: FormGroup;
  requestTime = 0;
  disableOpenPageBtn = true;
  previewCommentList:string[] = [];
  url = '';


  urlCtrl = new FormControl('',[Validators.pattern(dcardUrlRegEx)]);
  jsonCtrl = new FormControl('',[jsonValidator]);

  constructor(
    readonly formBuilder: FormBuilder,
    readonly dcardService: DcardService,
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.dcardService.commentDataList.subscribe(dataList => {
      this.previewCommentList = dataList.map(
        comments => comments.comment).filter(comment => comment.length);
    });

    this.dcardDataFormGroup = this.formBuilder.group({
      urlCtrl: this.urlCtrl,
      jsonCtrl: this.jsonCtrl
    })

    this.urlCtrl.valueChanges.subscribe((value: string | null) => {
      if (value !== null && value !== ''){
        this.dcardService.setMetaData(value);
      }
      this.disableOpenPageBtn = this.urlCtrl?.value == '' || this.urlCtrl?.invalid ? true : false;
    });
  }

  openDcardRawData() {
    this.disableOpenPageBtn = true;
    this.url = this.dcardService.getUrl()
    window.open(this.url, "_blank");
    setTimeout(()=>{
      this.dcardService.increaseRequestTimes()
    },TIMEOUT_IN_MILLID);
  }

  collectRawData() {
    if (!this.jsonCtrl || !this.jsonCtrl.value){
      return;
    }
    
    if (this.urlCtrl.value){
      this.disableOpenPageBtn = false;
    }

    const json = this.jsonCtrl.value;
    if (!this.dcardService.isSameRawData(json)){
      this.unmarshal(json);
    }
    else {
      this.dialog.open(DuplicateCommentsDialog);
    }
  }

  unmarshal(json: string){
    this.dcardService.setRawData(json);
    const jsonParse = JSON.parse(json)
    const rawDataArray = Object.keys(jsonParse).map(key => jsonParse[key]);
    const commentRaws : DcardCommentParams[] = rawDataArray.flatMap(rawData => {
      if (rawData[DcardRawDataType.CONTENT]){
        const commentData:DcardCommentParams = {
          comment: getMsgFromRawData(rawData[DcardRawDataType.CONTENT]),
          link: getLinkFromRawData(rawData[DcardRawDataType.MEDIAMETA]),
          host: rawData[DcardRawDataType.HOST],
          subCommentCount: rawData[DcardRawDataType.SUBCOMMENTCOUNT]
        }
        const emptyCommentRaws:DcardCommentParams[] = Array(commentData.subCommentCount).fill(commentDataTemplate);
        return [commentData, ...emptyCommentRaws];
      }
      return [];
    });
    
    this.dcardService.setCommentDataList(commentRaws);
    this.jsonCtrl.setValue('');
  }

  previewComments(){
    this.dialog.open(PreviewCommentsDialog, {
      data: {
        comments: this.previewCommentList
      },
      width: '50rem',
    });
  }
}
