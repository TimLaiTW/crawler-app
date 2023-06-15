from flask import Flask, request
from ptt_crawler import PttCrawler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "<h1>Welcome to the Ptt Crawler API!</h1>"

@app.route('/api/v1/ptt_url', methods=['POST'])
def get_ptt_raw_data():
    data = request.get_json()
    pc = PttCrawler()
    response = pc.get_html_raw_data(data['article_url'])
    return response

if __name__ == '__main__':
    app.run(debug=True)