import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DCARD_URL } from '../../../constants';
import { DcardService } from 'src/app/services/dcard.service';

@Component({
  selector: 'dcard-config-step',
  templateUrl: './dcard_config_step.html',
  styleUrls: ['./dcard_config_step.scss']
})
export class DcardConfigStep {
  articleIDFormGroup!: FormGroup;
  requestTime = 0;

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
      });
    }

  get idCtrl() { return this.articleIDFormGroup.get('idCtrl');}

  openDcardRawData() {
    const id = this.idCtrl!.value;
    let url = DCARD_URL + id + '/comments';
    if (this.requestTime){
      url += '?after=' + this.requestTime * 30;
    }
    this.requestTime += 1;
    window.open(url, "_blank");
  }
}
