# Comment Crawlers for social media

This web app helps to collect comments and images from a given article in social media. Currently supports [Dcard](https://www.dcard.tw/f) and [PTT](https://term.ptt.cc/).

## For [Dcard Configuration Page](https://paste.pics/3331ce8f0187999e96986cc05408d88b)
Steps for usage:
1. Enter the Dcard article URL.
2. Click "Open raw data page", this will open a new tab in browser with plain JSON of comments.
3. Copy the JSON and paste it in the textarea, it'll validate the format of the JSON.
4. Click "Collect data" button to process the raw data.
5. Once everything is done, click "Next: process raw data" to direct to the comment result page.

Dcard's API only allows 30 comments/per request. If there are more than 30 comments in the article, the user has to repeat **Step 2.** - **Step 4.** until the new opening tab shows empty.

## For [PTT Configuration Page](https://paste.pics/ea073147ad409132884e19c95595a656)
Steps for usage:
1. Enter the PTT article url or Paste the HTML of it.
2. Click "Collect comments data" to process the comments and images.
3. Once everything is done, click "Next: see results" to direct to the comment result page.

## [Comment Result Page](https://paste.pics/e928adb60adf90785731e9da45e6e465)
- Both Dcard result page and Ptt result page look alike, it generates a comments table and a image table with a download button.

## Tech side
This web app is built with **Angular** framework and **Python flask**. The frontend handles the UI, data presentation and data manipulation while the backend takes care of API requests and responses. 
