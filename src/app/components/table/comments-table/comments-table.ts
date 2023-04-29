import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { CommentTableColumn, TableColumnType } from '../../../types';

@Component({
  selector: 'comments-table',
  templateUrl: './comments-table.html',
  styleUrls: ['./comments-table.scss']
})
export class CommentsTable implements OnChanges{
  @Input() comments:string[] = [];
  TableColumnType = TableColumnType;
  displayedColumns: string[] = [TableColumnType.COMMENT];
  dataSource = new MatTableDataSource<CommentTableColumn>([]);

  ngOnChanges(): void {
    const commentsList = this.comments.map(comment => ({comment: comment}));
    this.dataSource = new MatTableDataSource<CommentTableColumn>(commentsList)
  }
}
