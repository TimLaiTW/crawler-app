import { Component } from '@angular/core';
import {PttService} from './services/ptt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crawlers';
  pttRawData:any;
  isPttRawDataButtonDisable = false;
  constructor(private PttService:PttService){}
  showPttRawData() {
    this.PttService.getRawData();
    this.isPttRawDataButtonDisable = true;
    setTimeout(() => {
      this.isPttRawDataButtonDisable = false;
    }, 5000);


    // this.PttService.getRawData()
    //   .subscribe((data: any) => {
    //     this.pttRawData = data;
    //   });
  }
}
