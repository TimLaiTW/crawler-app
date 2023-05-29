import { Component } from '@angular/core';
import { SocialCommunity } from './types';
import { FormControl } from '@angular/forms';
import { DcardService } from './services/dcard.service';
import { PttService } from './services/ptt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  SocialCommunity = SocialCommunity;
  socialCommunity = new FormControl(SocialCommunity.DCARD);
  constructor(readonly dcardService: DcardService, readonly pttService: PttService){}
}
