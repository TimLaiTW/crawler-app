import { Component } from '@angular/core';
import { PttPageHeader } from 'src/app/static_string';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'ptt-config-step',
  templateUrl: './ptt_config_step.html',
  styleUrls: ['./ptt_config_step.scss']
})
export class PttConfigStep {
  PageHeader = PttPageHeader;
}
