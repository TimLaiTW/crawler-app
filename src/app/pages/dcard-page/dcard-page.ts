import { Component, OnInit } from '@angular/core';
import { DcardService } from 'src/app/services/dcard.service';
import { DcardPageHeader } from '../../static_string';
import { DcardCommentParams } from 'src/app/types';

@Component({
  selector: 'dcard-page',
  templateUrl: './dcard-page.html',
  styleUrls: ['./dcard-page.scss']
})
export class DcardPage implements OnInit{
  PageHeader = DcardPageHeader;
  commentDataList:DcardCommentParams[] = [];
  constructor(readonly dcardService: DcardService){}

  ngOnInit(): void {
    this.dcardService.commentDataList.subscribe(dataList => this.commentDataList = dataList);
  }
}
