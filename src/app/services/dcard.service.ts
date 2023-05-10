import { Injectable } from '@angular/core';
import { DcardCommentParams, ArticleMeta } from '../types';
import { BehaviorSubject } from 'rxjs';
import { DCARD_URL } from '../constants';
import { articleMetaTemplate } from '../templates';

@Injectable({
  providedIn: 'root'
})
export class DcardService {
  private readonly commentDataListChange = new BehaviorSubject<DcardCommentParams[]>([]);
  private readonly articleIDChange = new BehaviorSubject<string>('');
  private readonly rawDataChange = new BehaviorSubject<string>('');
  private readonly requestTimesChange = new BehaviorSubject<number>(0);
  private articleMetaChange = new BehaviorSubject<ArticleMeta>(articleMetaTemplate);
  commentDataList = this.commentDataListChange.asObservable();
  articleMeta = this.articleMetaChange.asObservable();
	setCommentDataList(commentsData: DcardCommentParams[]){
		this.commentDataListChange.next(commentsData);
	}

	setMetaData(articleID: string){
    console.log('callign dcard set metadata');
    this.articleIDChange.next(articleID);
	}

  setRawData(rawData: string){
    this.rawDataChange.next(rawData);
  }

  increaseRequestTimes(){
    const count = this.requestTimesChange.getValue();
    this.requestTimesChange.next(count+1);
  }
  
  getUrl(){
    const baseUrl = `${DCARD_URL}${this.articleIDChange.getValue()}/comments`;
    const requestTimes = this.requestTimesChange.getValue();
    return requestTimes ? `${baseUrl}?after=${requestTimes * 30}` : baseUrl;
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
