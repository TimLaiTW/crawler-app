import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PTT_API } from '../constants';
import { UrlResponse, PttCommentParams } from '../types';
import { map } from 'rxjs/operators';
import { getMsgFromRawData, imageRegEx } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class PttService {
  private commentDataListChange = new BehaviorSubject<PttCommentParams[]>([]);
  private rawDataChange = new BehaviorSubject<string>('');
  commentDataList = this.commentDataListChange.asObservable();
  rawData = this.rawDataChange.asObservable();

  articleAuthor:string = '';

  constructor(private http: HttpClient) {}

  setRawData(rawData: string){
    this.rawDataChange.next(rawData);
  }

  sendRequest(url:string): Observable<UrlResponse>{
    const data = {
      article_url: url
    };
    
    return this.http.post<UrlResponse>(PTT_API, data).pipe(
      map((response: UrlResponse) => {
        if (response && response.status && response.rawData){
          return response as UrlResponse;
        } else {
          throw new Error('Invalid url response format')
        }
      })
    );
  }

  private isSameAuthor(author:string, dataList:PttCommentParams[]):boolean{
    const listLength = dataList ? dataList.length : 0;
    return listLength > 0 && dataList[listLength - 1].author === author;
  }

  private getArticleAuthor(doc:Document){
    this.articleAuthor = doc.querySelector('[itemprop="author"] [itemprop="name"]')?.textContent || '';
  }

  formatRawData() {
    const htmlString = this.rawDataChange.getValue();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    this.getArticleAuthor(doc);
    const currentDataList:PttCommentParams[] = [];

    const comments = doc.querySelectorAll('[itemprop="comment"]');
    for (let i = 0; i < comments.length; i++){
      const comment = comments[i];
      const textProp = comment.querySelector('[itemprop="text"] span');
      if (!textProp || !textProp.textContent){  continue; }

      let commentText = textProp.textContent;
      const author = comment.querySelector('[itemprop="author"] [itemprop="name"] a span')?.textContent || '';

      if (this.isSameAuthor(author, currentDataList)){
        currentDataList[currentDataList.length - 1].comment += textProp.textContent;
      } else {
        const links = commentText.match(imageRegEx)?.map(link => link);
        const commentData:PttCommentParams = {
          comment: getMsgFromRawData(commentText),
          link: links || [],
          host:author === this.articleAuthor,
          author: author || '',
        };
  
        currentDataList.push(commentData);
      }
    }

    this.setCommentDataList(currentDataList);
  }

	setCommentDataList(commentsData: PttCommentParams[]){
		this.commentDataListChange.next(commentsData);
	}

  resetAll() {
    this.commentDataListChange.next([]);
    this.rawDataChange.next('');
    this.articleAuthor = '';    
  }
}
