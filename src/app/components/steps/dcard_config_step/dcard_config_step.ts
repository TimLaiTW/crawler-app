import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DCARD_URL } from '../../../constants';
import { DcardService } from 'src/app/services/dcard.service';
import { PageHeader } from '../../../static_string';

@Component({
  selector: 'dcard-config-step',
  templateUrl: './dcard_config_step.html',
  styleUrls: ['./dcard_config_step.scss']
})
export class DcardConfigStep {
  PageHeader = PageHeader;
  articleIDFormGroup!: FormGroup;
  requestTime = 0;
  disableButton = true;
  url = 'https://www.dcard.tw/service/api/v2/posts/241886721/comments';

  constructor(
    private formBuilder: FormBuilder,
    private dcardService: DcardService){
      this.articleIDFormGroup = this.formBuilder.group({
        idCtrl: ['', [
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(9),
          Validators.maxLength(9)
        ]],
      });

      this.articleIDFormGroup.get('idCtrl')?.valueChanges.subscribe((value: string) => {
        this.dcardService.setArticleId(value);
        this.disableButton = this.idCtrl?.value == '' || this.idCtrl?.invalid ? true : false;
      });
    }

  get idCtrl() { return this.articleIDFormGroup.get('idCtrl');}

  async openDcardRawData() {
    this.disableButton = true;
    const id = this.idCtrl!.value;
    this.url = DCARD_URL + id + '/comments';
    if (this.requestTime){
      this.url += '?after=' + this.requestTime * 30;
    }
    this.requestTime += 1;
    window.open(this.url, "_blank");
    setTimeout(()=>{this.disableButton = false;},5000);
  }
}
