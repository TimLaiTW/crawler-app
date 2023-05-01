import { AbstractControl, ValidationErrors } from '@angular/forms';
import { DcardRawDataType, TableColumnType, CommentParamsType, SocialCommunity } from './types';
import { saveAs } from 'file-saver';

export const urlRegEx = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
export const numRegEx = "^[0-9]*$";

interface MediaMeta {
  id: string,
  url: string
}

export function jsonValidator(control: AbstractControl): ValidationErrors | null {
  try {
    const json: [object] = JSON.parse(control.value);
    let typeCheck = json.length > 0;

    // Due to comments could be deleted and results in no content property.
    // We're not including content for initial validation in dcard type.
    const dcardType = [
      DcardRawDataType.HOST,
      DcardRawDataType.SUBCOMMENTCOUNT,
      DcardRawDataType.MEDIAMETA,
    ];

    json.forEach(element => {
      typeCheck = dcardType.every( prop => Object.keys(element).includes(prop));
    });

    if (!typeCheck) { throw "Invalid format" }
  } catch (e) {
    return { jsonInvalid: true };
  }

  return null;
};

export function getMsgFromRawData(rawString: string): string {
  const regex = /https?:\/\/[^\s]+/gi;
  return rawString.replaceAll(regex, '').replaceAll('\n', ' ').trim();
}

export function getLinkFromRawData(mediaMeta:MediaMeta[]):string[]{
  const uniqueIds = new Set<string>;
  const mediaData = mediaMeta.slice().reverse().filter(media => {
    if(uniqueIds.has(media.id)){
      return false;
    }
    uniqueIds.add(media.id);
    return true;
  });
  
  return mediaData.map(media => media['url']);
}

function exportFile(data:any, fileType:string, platform: SocialCommunity){
  const blob = new Blob([data], {type: fileType});
  const fileName = platform + '_comments.csv';
  saveAs(blob, fileName);
}

export function exportToCsv(commentList: string[], linkList: string[], platform: SocialCommunity): void {
  const commentHeader: TableColumnType = TableColumnType.COMMENT;
  const linkHeader: TableColumnType = TableColumnType.LINK;

  const data = [
    [commentHeader, ...commentList],
    ['', ''],
    [linkHeader, ...linkList]
  ];

  const csvContent = data.map(row => row.join('\n')).join('\n');
  exportFile(csvContent, 'text/csv', platform);
}
