import { Component } from '@angular/core';
import { PttPageHeader } from 'src/app/static_string';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PttService } from 'src/app/services/ptt.service';
import { urlRegEx } from '../../../utils';
import { TIMEOUT_IN_MILLID } from '../../../constants';

@Component({
  selector: 'ptt-config-step',
  templateUrl: './ptt_config_step.html',
  styleUrls: ['./ptt_config_step.scss']
})
export class PttConfigStep {
  PageHeader = PttPageHeader;
  urlFormGroup!: FormGroup;
  disableCollectBtn = true;
  // rawData: UrlResponse = {'status':'', 'rawData':''};
  constructor(
    private formBuilder: FormBuilder,
    readonly pttService: PttService){
      this.urlFormGroup = this.formBuilder.group({
        urlCtrl: ['', [
          Validators.pattern(urlRegEx),
        ]],
      });

      this.urlFormGroup.get('urlCtrl')?.valueChanges.subscribe((value: string) => {
        this.pttService.setUrl(value);
        this.disableCollectBtn = this.urlCtrl?.value == '' || this.urlCtrl?.invalid ? true : false;
      });
    }

  get urlCtrl() { return this.urlFormGroup.get('urlCtrl');}

  collectCommentsData(){
    this.disableCollectBtn = true;
    this.pttService.sendRequest().subscribe(data => {
      this.pttService.setRawData(data.rawData);
      this.pttService.formatRawData();
    });
    setTimeout(() => {
      this.disableCollectBtn = false;
    }, TIMEOUT_IN_MILLID);
  }
}
