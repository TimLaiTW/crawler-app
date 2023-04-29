import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { PTT_API } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PttService {
  // public commentDataListChange = new BehaviorSubject<PttCommentParams[]>([]);
  private urlChange = new BehaviorSubject<string>('');
  private rawDataChange = new BehaviorSubject<Object>('');
  url = this.urlChange.asObservable();
  rawData = this.rawDataChange.asObservable();
  constructor(private http: HttpClient) { }

  setUrl(url:string){
    this.urlChange.next(url);
  }

  setRawData(rawData: Object){
    this.rawDataChange.next(rawData);
  }

  getRawData() {
    const data = {
      article_url: this.urlChange.value
    };
    this.http.post(PTT_API, data).subscribe(
      response => this.setRawData(response)
    );
  }
}
