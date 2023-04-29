import { Component } from '@angular/core';
import { PttPageHeader } from 'src/app/static_string';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PttService } from 'src/app/services/ptt.service';
import { urlRegEx } from '../../../utils';
import { UrlResponse } from 'src/app/types';

@Component({
  selector: 'ptt-config-step',
  templateUrl: './ptt_config_step.html',
  styleUrls: ['./ptt_config_step.scss']
})
export class PttConfigStep {
  PageHeader = PttPageHeader;
  urlFormGroup!: FormGroup;
  disableButton = true;
  // rawData: UrlResponse = {'status':'', 'rawData':''};
  constructor(
    private formBuilder: FormBuilder,
    private pttService: PttService){
      this.urlFormGroup = this.formBuilder.group({
        urlCtrl: ['', [
          Validators.pattern(urlRegEx),
        ]],
      });

      this.urlFormGroup.get('urlCtrl')?.valueChanges.subscribe((value: string) => {
        this.pttService.setUrl(value);
        this.disableButton = this.urlCtrl?.value == '' || this.urlCtrl?.invalid ? true : false;
      });
    }

  get urlCtrl() { return this.urlFormGroup.get('urlCtrl');}

  getRawData(){
    this.disableButton = true;
    this.pttService.getRawData().subscribe(data => this.pttService.setRawData(data));
    setTimeout(() => {}, 5000);
  }
}
