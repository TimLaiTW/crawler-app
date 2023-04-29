export enum TableColumnType {
    COMMENT = 'comment',
    LINK = 'link',
    HOST = 'host',
}

export interface CommentParams {
    comment: string,
    link:string[],
    host:boolean,
}

export interface DcardCommentParams extends CommentParams {
    subCommentCount: number,
}

export interface PttCommentParams extends CommentParams {
    author: string,
}

export enum DcardRawDataType {
    CONTENT = 'content',
    HOST = 'host',
    URL = '',
    SUBCOMMENTCOUNT = 'subCommentCount',
    MEDIAMETA = 'mediaMeta',
}

export interface CommentTableColumn {
    comment: string;
}

export interface LinkTableColumn {
    link: string
}