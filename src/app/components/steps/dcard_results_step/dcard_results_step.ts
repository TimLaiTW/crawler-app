import { Component, OnInit } from '@angular/core';
import { DcardService } from '../../../services/dcard.service';
import { SocialCommunity } from 'src/app/types';
import { DcardPageHeader } from '../../../static_string';
import { exportToCsv } from '../../../utils';

@Component({
  selector: 'dcard-results-step',
  templateUrl: './dcard_results_step.html',
  styleUrls: ['./dcard_results_step.scss']
})
export class DcardResultsStep implements OnInit{
  PageHeader = DcardPageHeader;
  commentList:string[] = [];
  linkList:string[] = [];
  constructor(readonly dcardService: DcardService){}

  ngOnInit(): void {
    this.dcardService.commentDataList.subscribe(dataList => {
      this.commentList = dataList.map(comments => comments.comment)
      this.linkList = dataList.flatMap(comments => comments.link ?? [])
    });
  }
  
  exportToCsv(){
    exportToCsv(this.commentList, this.linkList, SocialCommunity.DCARD);
  }
}
