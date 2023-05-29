import { Component, OnInit, ViewChild } from '@angular/core';
import { DcardService } from 'src/app/services/dcard.service';
import { DcardCommentParams, SocialCommunity } from 'src/app/types';
import { MatStepper } from '@angular/material/stepper';
import { resetStepper } from 'src/app/utils';

@Component({
  selector: 'dcard-page',
  templateUrl: './dcard-page.html',
  styleUrls: ['./dcard-page.scss']
})
export class DcardPage implements OnInit{
  @ViewChild('stepper') stepper!: MatStepper;
  SocialCommunity = SocialCommunity;
  commentDataList:DcardCommentParams[] = [];
  constructor(readonly dcardService: DcardService){}

  ngOnInit(): void {
    this.dcardService.commentDataList.subscribe(dataList => this.commentDataList = dataList);
  }
  
  done(){
    resetStepper(this.stepper, this.dcardService);
  }
}
