import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-header-section',
  templateUrl: './page_header_section.html',
  styleUrls: ['./page_header_section.scss']
})
export class PageHeaderSection {
@Input() header:string = '';
@Input() descrp?:string = '';
@Input() hints?:string[] = [];
}
