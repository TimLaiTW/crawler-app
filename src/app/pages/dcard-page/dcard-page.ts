import { Component, Host, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DCARD_URL } from '../../constants';
import { jsonValidator, getMsgFromRawData, getLinkFromRawData } from '../../utils';
import { DcardCommentParams } from '../../types';
import { DcardService } from 'src/app/services/dcard.service';

@Component({
  selector: 'dcard-page',
  templateUrl: './dcard-page.html',
  styleUrls: ['./dcard-page.scss']
})
export class DcardPage implements OnInit, OnChanges{
  commentsData:DcardCommentParams[] = [];
  comments:string[] = [];
  urls:string[] = [];
  constructor(private dcardService: DcardService){}
  
  ngOnInit(): void {
    this.dcardService.commentDataList.subscribe(dataList => 
      {
        this.commentsData = dataList
        console.log(this.commentsData.length);
      }
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changeeee')
  }
}
