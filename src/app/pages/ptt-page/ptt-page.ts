import { Component } from '@angular/core';
import { PttPageHeader } from '../../static_string';
@Component({
  selector: 'ptt-page',
  templateUrl: './ptt-page.html',
  styleUrls: ['./ptt-page.scss']
})
export class PttPage {
  PageHeader = PttPageHeader;
}
