import { Component, OnInit } from '@angular/core';
import { DcardService } from '../../../services/dcard.service';
import { DcardCommentParams } from 'src/app/types';

@Component({
  selector: 'dcard-results-step',
  templateUrl: './dcard_results_step.html',
  styleUrls: ['./dcard_results_step.scss']
})
export class DcardResultsStep implements OnInit{
  commentDataList: DcardCommentParams[] = [];
  constructor(private dcardService: DcardService){}

  ngOnInit(){
		this.dcardService.commentDataList.subscribe(dataList => this.commentDataList = dataList);
	}

  getComments(): string[] {
    return this.commentDataList.map(comments => comments.comment);
  }

  getLinks(): string[] {
    return this.commentDataList.flatMap(
      comments => comments.link ?? []);
  }
}
