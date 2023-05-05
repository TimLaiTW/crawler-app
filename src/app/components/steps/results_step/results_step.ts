import { Component, Input, OnInit } from '@angular/core';
import { DcardService } from '../../../services/dcard.service';
import { PttService } from '../../../services/ptt.service';
import { SocialCommunity, DcardCommentParams, PttCommentParams } from 'src/app/types';
import { DcardPageHeader } from '../../../static_string';
import { exportToCsv } from '../../../utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'results-step',
  templateUrl: './results_step.html',
  styleUrls: ['./results_step.scss']
})
export class ResultsStep implements OnInit{
  @Input() socialCommunity: SocialCommunity = SocialCommunity.DCARD
  PageHeader = DcardPageHeader;
  commentList:string[] = [];
  linkList:string[] = [];
  selectedService!: DcardService | PttService;
  constructor(readonly dcardService: DcardService, readonly pttService: PttService){}

  ngOnInit(): void {
    if (this.socialCommunity === SocialCommunity.DCARD){
      this.selectedService = this.dcardService;
    }else if (this.socialCommunity === SocialCommunity.PTT){
      this.selectedService = this.pttService;
    }
    else {
      // TODO : error handle.
      this.selectedService = this.dcardService;
    }
    (this.selectedService.commentDataList as Observable<DcardCommentParams[] | PttCommentParams[]>).subscribe(dataList => {
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
