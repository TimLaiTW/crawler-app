import { Component, Input, OnInit } from '@angular/core';
import { DcardService } from '../../../services/dcard.service';
import { PttService } from '../../../services/ptt.service';
import { SocialCommunity } from 'src/app/types';
import { DcardPageHeader } from '../../../static_string';
import { exportToCsv } from '../../../utils';

@Component({
  selector: 'results-step',
  templateUrl: './results_step.html',
  styleUrls: ['./results_step.scss']
})
export class ResultsStep implements OnInit{
  @Input() socialCommunity: SocialCommunity = SocialCommunity.PTT
  PageHeader = DcardPageHeader;
  commentList:string[] = [];
  linkList:string[] = [];
  constructor(readonly dcardService: DcardService, readonly pttService: PttService){}

  ngOnInit(): void {
    this.dcardService.commentDataList.subscribe(dataList => {
      if (dataList){
        this.commentList = dataList.map(comments => comments.comment).filter(Boolean)
        this.linkList = dataList.flatMap(comments => comments.link ?? [])
      }
    });
    this.pttService.commentDataList.subscribe(dataList => {
      if (dataList){
        this.commentList = dataList.map(comments => comments.comment).filter(Boolean)
        this.linkList = dataList.flatMap(comments => comments.link ?? [])
      }
    });
  }
  
  exportToCsv(){
    exportToCsv(this.commentList, this.linkList, this.socialCommunity);
  }
}
