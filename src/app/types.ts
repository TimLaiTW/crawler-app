import { DcardService } from "./services/dcard.service";
import { PttService } from "./services/ptt.service";

export enum SocialCommunity {
    DCARD = 'dcard',
    PTT = 'ptt',
}

export enum TableColumnType {
    COMMENT = 'comment',
    LINK = 'link',
    HOST = 'host',
}

export interface ArticleMeta {
    author: string,
    board: string,
    title: string,
    timeStamp: string
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

export type CommentParamsType = DcardCommentParams | PttCommentParams;

export type ServiceType = DcardService | PttService;

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

export interface UrlResponse {
    status: string, 
    rawData: string
}

export interface PageOverview {
    Title: string,
    Descrip?: string,
    Hints?: string[]
}
