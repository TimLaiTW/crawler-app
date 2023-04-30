import { Component, OnInit } from '@angular/core';
import { PttService } from 'src/app/services/ptt.service';
import { UrlResponse } from 'src/app/types';

@Component({
  selector: 'ptt-results-step',
  templateUrl: './ptt_results_step.html',
  styleUrls: ['./ptt_results_step.scss']
})
export class PttResultsStep implements OnInit{
  constructor(private pttService:PttService){}

  ngOnInit(){
		this.pttService.rawData.subscribe(data => {
      console.log(data.rawData)
    });
	}
}
