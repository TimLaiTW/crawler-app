import { Injectable } from '@angular/core';
import { DcardCommentParams } from '../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DcardService {
  public commentDataListChange = new BehaviorSubject<DcardCommentParams[]>([]);
  private articleIDChange = new BehaviorSubject<string>('');
  private rawDataChange = new BehaviorSubject<string>('');
  
  commentDataList = this.commentDataListChange.asObservable();
  articleID = this.articleIDChange.asObservable();
  rawData = this.rawDataChange.asObservable();

	setCommentDataList(comments: DcardCommentParams[]){
		this.commentDataListChange.next(comments);
	}

	setArticleId(articleID: string){
    this.articleIDChange.next(articleID);
	}

  setRawData(rawData: string){
    console.log('set raw data')
    this.rawDataChange.next(rawData);
  }

  isSameRawData(rawData: string): boolean{
    console.log('old : ', this.rawDataChange.value);
    console.log('new : ', rawData);
    return rawData == this.rawDataChange.value;
  }
}
