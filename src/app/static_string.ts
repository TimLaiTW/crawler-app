export const DcardPageHeader = {
    Config: {
        Title: "Enter Dcard URL",
        Descrip: "You must enter the article url to get the comments raw data.",
        Hints: [
            "1. The article url format should be : https://www.dcard.tw/f/\<category>/p/\<article ID>.",
            "2. Clicking the 'Open Comments Data' to open the webpage containing the comments raw data.",
            "3. By clicking the button again to show the next 30 comments data.",
            "4. You'll have to wait for 5 seconds to click the button again which preventing you from being blacklisted."
        ]
    },
    Execution: {
        Title: "Paste article content",
        Descrip: "Copy the raw data from the opening webpage and paste it at the below text area.",
        Hints: [
            "1. You must click the 'Collect data' button to collect the raw data.",
            "2. After collecting the data, please go back to previous step for the next 30 comments data.",
            "3. If there is no content in the opening webpage, please go to the next step for results."
        ]
    },
    Results: {
        Title: "Comment results",
        Descrip: "",
        Hints: [
            "1. You may notice there are some empty rows between comments, those are the subcomments of comments.",
            "2. Due to the subcomments are not included in the raw data, you have to manually fill those out."
        ]
    }
}

export const PttPageHeader = {
    Config: {
        Title: "Enter Ptt URL",
        Descrip: "You must enter the url to get the comments list.",
        Hints: [
            "1. Please find the article in https://www.ptt.cc/bbs/<article board>/<article ID>.html.",
            "2. Paste the url of the article to the below input field.",
            "3. Or copy the html from the url to the textarea below."
        ]
    },
    Results: {
        Title: "Comment results",
        Descrip: "",
        Hints: [
            "1. You may notice there are some empty rows between comments, those are the subcomments of comments.",
            "2. Due to the subcomments are not included in the raw data, you have to manually fill those out."
        ]
    }
}