import { Injectable } from '@angular/core';
import { PTT_API } from '../constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlResponse } from '../types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  sendPttRequest(url:string): Observable<UrlResponse>{
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
}
