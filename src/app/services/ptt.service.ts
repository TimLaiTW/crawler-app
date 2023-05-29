import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PttCommentParams, ArticleMeta } from '../types';
import { getMsgFromRawData, imageRegEx } from '../utils';
import { articleMetaTemplate } from '../templates';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PttService {
  private commentDataListChange = new BehaviorSubject<PttCommentParams[]>([]);
  private readonly articleURLChange = new BehaviorSubject<string>('');
  private rawDataChange = new BehaviorSubject<string>('');
  private articleMetaChange = new BehaviorSubject<ArticleMeta>(articleMetaTemplate);
  commentDataList = this.commentDataListChange.asObservable();
  articleMeta = this.articleMetaChange.asObservable();
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

  // private getArticleAuthor(doc:Document){
  //   this.articleAuthor = doc.querySelector('[itemprop="author"] [itemprop="name"]')?.textContent || '';
  // }

  private getArticleMetaline(doc:Document){
    const articleMetaValues = doc.querySelectorAll('.article-meta-value');
    console.log(articleMetaValues);
    const metalines:ArticleMeta = articleMetaTemplate;
    for (let i = 0; i < articleMetaValues.length; i++){
      switch (i) {
        case 0: {
          metalines.author = articleMetaValues[i]?.textContent || '';
          break;
        }
        case 1: {
          metalines.board = articleMetaValues[i]?.textContent || '';
          break;
        }
        case 2: {
          metalines.title = articleMetaValues[i]?.textContent || '';
          break;
        }
        case 3: {
          metalines.timeStamp = articleMetaValues[i]?.textContent || '';
          break;
        }
        default: {
          break;
        }
      } 
    }

    this.articleMetaChange.next(metalines);
  }

  private formatRawData() {
    const htmlString = this.rawDataChange.getValue();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    this.getArticleMetaline(doc);
    const currentDataList:PttCommentParams[] = [];

    const comments = doc.querySelectorAll('div.push');
    for (let i = 0; i < comments.length; i++){
      const comment = comments[i];
      const textProp = comment.querySelector('span.push-content');
      if (!textProp || !textProp.textContent){  continue; }

      let commentText = textProp.textContent;
      const author = comment.querySelector('span.push-userid')?.textContent || '';
      let msg = getMsgFromRawData(commentText);
      if (this.isSameAuthor(author, currentDataList)){
        currentDataList[currentDataList.length - 1].comment += msg;
      } else {
        const links = commentText.match(imageRegEx)?.map(link => link);
        const commentData:PttCommentParams = {
          comment: msg,
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
