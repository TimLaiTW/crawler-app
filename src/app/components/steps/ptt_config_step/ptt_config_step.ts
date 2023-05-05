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
  htmlFormGroup!: FormGroup;
  disableCollectBtn = true;

  constructor(
    private formBuilder: FormBuilder,
    readonly pttService: PttService){
      this.urlFormGroup = this.formBuilder.group({
        urlCtrl: ['', [
          Validators.pattern(urlRegEx),
        ]],
      });

      this.urlFormGroup.get('urlCtrl')?.valueChanges.subscribe((value: string) => {
        this.disableCollectBtn = this.urlCtrl?.value == '' || this.urlCtrl?.invalid ? true : false;
      });

      // TODO : Add validator for verifying html elements.
      this.htmlFormGroup = this.formBuilder.group({
        htmlCtrl: [''],
      });

      this.htmlFormGroup.get('htmlCtrl')?.valueChanges.subscribe((value: string) => {
        this.disableCollectBtn = this.htmlCtrl?.value == '' || this.htmlCtrl?.invalid ? true : false;
      });
    }

  get urlCtrl() { return this.urlFormGroup.get('urlCtrl');}
  get htmlCtrl() { return this.htmlFormGroup.get('htmlCtrl');}

  collectCommentsData(){
    this.disableCollectBtn = true;
    this.pttService.generateDataViaURL(this.urlCtrl?.value);
    setTimeout(() => {
      this.disableCollectBtn = false;
    }, TIMEOUT_IN_MILLID);
  }

  collectHTML(){
    this.pttService.generateDataViaHTML(this.htmlCtrl?.value);
  }
}
