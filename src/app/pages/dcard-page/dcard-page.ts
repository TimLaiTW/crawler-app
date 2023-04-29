import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DcardCommentParams } from '../../types';
import { DcardService } from 'src/app/services/dcard.service';
import { DcardPageHeader } from '../../static_string';

@Component({
  selector: 'dcard-page',
  templateUrl: './dcard-page.html',
  styleUrls: ['./dcard-page.scss']
})
export class DcardPage implements OnInit{
  PageHeader = DcardPageHeader;
  commentsData:DcardCommentParams[] = [];
  comments:string[] = [];
  urls:string[] = [];
  constructor(private dcardService: DcardService){}
  
  ngOnInit(): void {
    this.dcardService.commentDataList.subscribe(dataList => 
      {
        this.commentsData = dataList
      }
      );
  }
}
