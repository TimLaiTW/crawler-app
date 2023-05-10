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
  private readonly articleURLChange = new BehaviorSubject<string>('');
  private readonly rawDataChange = new BehaviorSubject<string>('');
  private readonly requestTimesChange = new BehaviorSubject<number>(0);
  private articleMetaChange = new BehaviorSubject<ArticleMeta>(articleMetaTemplate);
  commentDataList = this.commentDataListChange.asObservable();
  articleMeta = this.articleMetaChange.asObservable();

	setCommentDataList(commentsData: DcardCommentParams[]){
		this.commentDataListChange.next(commentsData);
	}

	setMetaData(articleURL: string){
    this.articleURLChange.next(articleURL);
    const article = articleURL.split('/');
    console.log(article);
    const metalines: ArticleMeta = articleMetaTemplate;
    metalines.board = article[4];
    metalines.title = article[6];
    this.articleMetaChange.next(metalines);
	}

  setRawData(rawData: string){
    this.rawDataChange.next(rawData);
  }

  increaseRequestTimes(){
    const count = this.requestTimesChange.getValue();
    this.requestTimesChange.next(count+1);
  }
  
  getUrl(){
    const baseUrl = `${DCARD_URL}${this.articleMetaChange.getValue().title}/comments`;
    const requestTimes = this.requestTimesChange.getValue();
    return requestTimes ? `${baseUrl}?after=${requestTimes * 30}` : baseUrl;
  }

  resetAll(){
    this.commentDataListChange.next([]);
    this.articleURLChange.next('');
    this.rawDataChange.next('');
  }

  arePropsEmpty(){
    return (
      !this.commentDataListChange.value.length && 
      !this.articleURLChange.getValue() && 
      !this.rawDataChange.getValue()
    );
  }

  isSameRawData(rawData: string): boolean{
    return rawData == this.rawDataChange.getValue();
  }
}
