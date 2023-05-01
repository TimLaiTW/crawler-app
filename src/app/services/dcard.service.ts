import { Injectable } from '@angular/core';
import { DcardCommentParams } from '../types';
import { BehaviorSubject } from 'rxjs';
import { DCARD_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class DcardService {
  private readonly commentDataListChange = new BehaviorSubject<DcardCommentParams[]>([]);
  private readonly articleIDChange = new BehaviorSubject<string>('');
  private readonly rawDataChange = new BehaviorSubject<string>('');

  commentDataList = this.commentDataListChange.asObservable();

	setCommentDataList(commentsData: DcardCommentParams[]){
		this.commentDataListChange.next(commentsData);
	}

	setArticleId(articleID: string){
    this.articleIDChange.next(articleID);
	}

  setRawData(rawData: string){
    this.rawDataChange.next(rawData);
  }

  getUrl(count: number){
    const baseUrl = `${DCARD_URL}${this.articleIDChange.getValue()}/comments`;
    return count ? `${baseUrl}?after=${count * 30}` : baseUrl;
  }

  resetAll(){
    this.commentDataListChange.next([]);
    this.articleIDChange.next('');
    this.rawDataChange.next('');
  }

  arePropsEmpty(){
    return (
      !this.commentDataListChange.value.length && 
      !this.articleIDChange.getValue() && 
      !this.rawDataChange.getValue()
    );
  }

  isSameRawData(rawData: string): boolean{
    return rawData == this.rawDataChange.getValue();
  }
}
