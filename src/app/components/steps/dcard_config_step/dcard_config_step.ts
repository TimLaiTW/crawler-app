import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DcardService } from 'src/app/services/dcard.service';
import { DcardPageHeader } from '../../../static_string';
import { numRegEx, jsonValidator, getMsgFromRawData, getLinkFromRawData } from '../../../utils';
import { TIMEOUT_IN_MILLID } from '../../../constants';
import { MatDialog } from '@angular/material/dialog';
import { DcardCommentParams, DcardRawDataType } from '../../../types';
import { commentDataTemplate } from '../../../templates';
import { PreviewCommentsDialog } from '../../dialogs/preview-comments-dialog/preview-comments-dialog';

@Component({
  selector: 'dcard-config-step',
  templateUrl: './dcard_config_step.html',
  styleUrls: ['./dcard_config_step.scss']
})
export class DcardConfigStep implements OnInit{
  PageHeader = DcardPageHeader;
  dcardDataFormGroup!: FormGroup;
  requestTime = 0;
  disableOpenPageBtn = true;
  previewCommentList:string[] = [];
  url = '';


  idCtrl = new FormControl('',[
    Validators.pattern(numRegEx),
    Validators.minLength(9),
    Validators.maxLength(9)
  ]);
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
      idCtrl: this.idCtrl,
      jsonCtrl: this.jsonCtrl
    })

    this.idCtrl.valueChanges.subscribe((value: string | null) => {
      if (value !== null && value !== ''){
        this.dcardService.setMetaData(value);
      }
      this.disableOpenPageBtn = this.idCtrl?.value == '' || this.idCtrl?.invalid ? true : false;
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
    if (!this.jsonCtrl || !this.jsonCtrl?.value){
      return;
    }
    
    this.disableOpenPageBtn = false;
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
