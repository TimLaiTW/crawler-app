import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PttService {
  // @Input() pttUrl:string = '';
  pttUrl:string = 'http://localhost:5000/api/v1/ptt_url';
  constructor(private http: HttpClient) { }

  getRawData() {
    console.log('calling ptt api');
    const data = {
      article_url: 'https://www.pttweb.cc/bbs/Gossiping/M.1682073230.A.2C7'
    };
    this.http.post(this.pttUrl, data).subscribe(
      response => console.log(response)
    );
    // return this.http.get<any>(this.pttUrl);
    console.log(this.http.get<any>(this.pttUrl))
  }
}
