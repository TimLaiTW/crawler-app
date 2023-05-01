import { Component, OnInit } from '@angular/core';
import { PttService } from 'src/app/services/ptt.service';
import { UrlResponse } from 'src/app/types';
import { PttPageHeader } from 'src/app/static_string';
import { exportToCsv } from '../../../utils';
import { SocialCommunity } from 'src/app/types';

@Component({
  selector: 'ptt-results-step',
  templateUrl: './ptt_results_step.html',
  styleUrls: ['./ptt_results_step.scss']
})
export class PttResultsStep implements OnInit{
  PageHeader = PttPageHeader;
  commentList:string[] = [];
  linkList:string[] = [];

  constructor(readonly pttService:PttService){}

  ngOnInit(){
		this.pttService.commentDataList.subscribe(dataList => {
      this.commentList = dataList.map(comments => comments.comment).filter(Boolean)
      this.linkList = dataList.flatMap(comments => comments.link ?? [])
    });
	}
  
  exportToCsv(){
    exportToCsv(this.commentList, this.linkList, SocialCommunity.PTT);
  }
}
