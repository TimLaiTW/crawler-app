import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DcardService } from 'src/app/services/dcard.service';
import { DcardPageHeader } from '../../../static_string';
import { numRegEx } from '../../../utils';

@Component({
  selector: 'dcard-config-step',
  templateUrl: './dcard_config_step.html',
  styleUrls: ['./dcard_config_step.scss']
})
export class DcardConfigStep {
  PageHeader = DcardPageHeader;
  articleIDFormGroup!: FormGroup;
  requestTime = 0;
  disableCollectBtn = true;
  disableResettBtn = true;
  url = '';

  constructor(
    readonly formBuilder: FormBuilder,
    readonly dcardService: DcardService){
      this.articleIDFormGroup = this.formBuilder.group({
        idCtrl: ['', [
          Validators.pattern(numRegEx),
          Validators.minLength(9),
          Validators.maxLength(9)
        ]],
      });

      this.articleIDFormGroup.get('idCtrl')?.valueChanges.subscribe((value: string) => {
        this.dcardService.setArticleId(value);
        this.disableCollectBtn = this.idCtrl?.value == '' || this.idCtrl?.invalid ? true : false;
      });
    }

  get idCtrl() { return this.articleIDFormGroup.get('idCtrl');}

  openDcardRawData() {
    this.disableCollectBtn = true;
    this.url = this.dcardService.getUrl(this.requestTime)
    window.open(this.url, "_blank");
    setTimeout(()=>{
      this.disableCollectBtn = false;
      this.requestTime += 1;
    },5000);
  }
}
