import { Injectable } from '@angular/core';
import { DcardCommentParams } from '../types';
import { BehaviorSubject } from 'rxjs';
import { DCARD_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class DcardService {
  public commentDataListChange = new BehaviorSubject<DcardCommentParams[]>([]);
  private articleIDChange = new BehaviorSubject<string>('');
  private rawDataChange = new BehaviorSubject<string>('');
  private url = '';
  
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
    this.rawDataChange.next(rawData);
  }

  getUrl(count: number){
    this.url = DCARD_URL + this.articleIDChange.value + '/comments';
    let requestUrl = this.url;
    if (count){
      requestUrl += '?after=' + count * 30;
    }
    return requestUrl;
  }

  isSameRawData(rawData: string): boolean{
    return rawData == this.rawDataChange.value;
  }
}
