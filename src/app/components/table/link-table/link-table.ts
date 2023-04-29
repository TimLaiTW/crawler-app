import { Component, Input } from '@angular/core';
import { LinkTableColumn, TableColumnType } from '../../../types';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'link-table',
  templateUrl: './link-table.html',
  styleUrls: ['./link-table.scss']
})
export class LinkTable {
  @Input() links:string[] = [];
  TableColumnType = TableColumnType;
  displayedColumns: string[] = [TableColumnType.LINK];
  dataSource = new MatTableDataSource<LinkTableColumn>([]);

  ngOnChanges(): void {
    const linksList = this.links.map(link => ({link: link}));
    this.dataSource = new MatTableDataSource<LinkTableColumn>(linksList)
  }
}
