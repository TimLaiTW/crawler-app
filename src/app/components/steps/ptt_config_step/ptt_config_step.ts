import { Component, OnInit } from '@angular/core';
import { PttPageHeader } from 'src/app/static_string';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PttService } from 'src/app/services/ptt.service';
import { pttUrlRegEx } from '../../../utils';
import { TIMEOUT_IN_MILLID } from '../../../constants';

@Component({
  selector: 'ptt-config-step',
  templateUrl: './ptt_config_step.html',
  styleUrls: ['./ptt_config_step.scss']
})
export class PttConfigStep implements OnInit{
  PageHeader = PttPageHeader;
  urlFormGroup!: FormGroup;
  htmlFormGroup!: FormGroup;
  pttDataFormGroup!: FormGroup;
  disableCollectBtn = true;

  urlCtrl = new FormControl('', [Validators.pattern(pttUrlRegEx)]);
  htmlCtrl = new FormControl('', []);

  constructor(
    private formBuilder: FormBuilder,
    readonly pttService: PttService){}

    ngOnInit(): void {
      this.pttDataFormGroup = this.formBuilder.group({
        urlCtrl: this.urlCtrl,
        htmlCtrl: this.htmlCtrl
      });

      this.urlCtrl.valueChanges.subscribe((value: string | null) => {
        this.disableCollectBtn = value == null || value == '' || this.urlCtrl?.invalid ? true : false;
      });

      this.htmlCtrl.valueChanges.subscribe((value: string | null) => {
        this.disableCollectBtn = value == null || value == '' || this.urlCtrl?.invalid ? true : false;
      });
    }

  collectCommentsData(){
    this.disableCollectBtn = true;
    if (this.htmlCtrl.value){
      this.pttService.generateDataViaHTML(this.htmlCtrl?.value);
    } else if (this.urlCtrl.value){
      this.pttService.generateDataViaURL(this.urlCtrl.value);
    }
    setTimeout(() => {
      this.disableCollectBtn = false;
    }, TIMEOUT_IN_MILLID);
  }
}
