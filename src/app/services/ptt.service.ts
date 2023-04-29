import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { PTT_API } from '../constants';
import { UrlResponse } from '../types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PttService {
  // public commentDataListChange = new BehaviorSubject<PttCommentParams[]>([]);
  private urlChange = new BehaviorSubject<string>('');
  private rawDataChange = new BehaviorSubject<UrlResponse>({'status': '', 'rawData': ''});
  url = this.urlChange.asObservable();
  rawData = this.rawDataChange.asObservable();
  constructor(private http: HttpClient) { }

  setUrl(url:string){
    this.urlChange.next(url);
  }

  setRawData(rawData: UrlResponse){
    this.rawDataChange.next(rawData);
  }

  getRawData(): Observable<UrlResponse>{
    const data = {
      article_url: this.urlChange.value
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
}
