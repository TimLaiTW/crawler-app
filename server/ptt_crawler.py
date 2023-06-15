import requests

class PttCrawler:
    def get_html_raw_data(self, url) -> None:
        """ Request html raw data and store it """
        print('sending request...')
        resp = requests.get(url)
        print('response received.')
        return {'status':'ok', 'rawData':resp.text}
        