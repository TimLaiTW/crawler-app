import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PttCommentParams } from '../types';
import { getMsgFromRawData, imageRegEx } from '../utils';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PttService {
  private commentDataListChange = new BehaviorSubject<PttCommentParams[]>([]);
  private readonly articleURLChange = new BehaviorSubject<string>('');
  private rawDataChange = new BehaviorSubject<string>('');
  commentDataList = this.commentDataListChange.asObservable();
  rawData = this.rawDataChange.asObservable();

  articleAuthor:string = '';

  constructor(private apiService: ApiService) {}

	setMetaData(articleURL: string){
    this.articleURLChange.next(articleURL);
	}

  setRawData(rawData: string){
    this.rawDataChange.next(rawData);
  }

  private isSameAuthor(author:string, dataList:PttCommentParams[]):boolean{
    const listLength = dataList ? dataList.length : 0;
    return listLength > 0 && dataList[listLength - 1].author === author;
  }

  private getArticleAuthor(doc:Document){
    this.articleAuthor = doc.querySelector('[itemprop="author"] [itemprop="name"]')?.textContent || '';
  }

  private formatRawData() {
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

  generateDataViaURL(url: string){
    this.apiService.sendPttRequest(url).subscribe(data => {
      this.setRawData(data.rawData);
      this.formatRawData();
    });
  }
  
  generateDataViaHTML(html: string){
    this.setRawData(html);
    this.formatRawData();
  }


  arePropsEmpty(){
    return (
      !this.commentDataListChange.value.length && 
      !this.articleURLChange.getValue() && 
      !this.rawDataChange.getValue()
    );
  }

  resetAll() {
    this.commentDataListChange.next([]);
    this.articleURLChange.next('');
    this.rawDataChange.next('');
    this.articleAuthor = '';    
  }
}
