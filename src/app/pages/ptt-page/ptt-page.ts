import { Component, ViewChild } from '@angular/core';
import { PttPageHeader } from '../../static_string';
import { PttService } from 'src/app/services/ptt.service';
import { PttCommentParams, SocialCommunity } from '../../types';
import { MatStepper } from '@angular/material/stepper';
import { resetStepper } from '../../utils';

@Component({
  selector: 'ptt-page',
  templateUrl: './ptt-page.html',
  styleUrls: ['./ptt-page.scss']
})
export class PttPage {
  @ViewChild('stepper') stepper!: MatStepper;

  PageHeader = PttPageHeader;
  SocialCommunity = SocialCommunity;
  commentDataList:PttCommentParams[] = [];
  constructor(readonly pttService: PttService){}

  ngOnInit(): void {
    this.pttService.commentDataList.subscribe(dataList => this.commentDataList = dataList);
  }

  done(){
    resetStepper(this.stepper, this.pttService);
  }
}
