import datetime
import tweepy
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import json


import csv
from flask import Flask, render_template,  request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")




@app.route("/hello", methods=["POST"])
def hello():
	import pandas as pd
	
	search_terms = request.form.get("search_terms")
	#hours = request.form.get("hours")
	#minutes = request.form.get("minutes")
	#seconds = request.form.get("seconds")

	# Twitter credentials for the app
	api_key = 'G6ubzvugzkTH9LTNElk9VekNt'
	api_secret_key = 'UsaGUWdKe5jcEiqR3S6bWCJNZstcbsxpsNkBjQl3bs0tXcmhS0'
	access_token = '1062323182701559810-5vPYp5BQfcfZWdbN82yeUY5Fv3Besz'
	access_token_secret = '36OscsHrjMOPeTrUQNvTwLxMhlqnjioBvNfQ3em8QrEIj'

	# pass twitter credentials to tweepy
	auth = tweepy.OAuthHandler(api_key, api_secret_key)
	auth.set_access_token(access_token, access_token_secret)
	api = tweepy.API(auth)

	# time calculation
	#s = ((3600*int(hours))+(60*int(minutes))+(int(seconds)))

	#search_terms = ('coronavirus OR COVID OR Corona')

	search_hashtag = tweepy.Cursor(api.search, q=search_terms).items(100)



	outtweets = [[tweet.id_str, tweet.created_at, tweet.text, tweet.favorite_count, tweet.in_reply_to_screen_name,
		          tweet.retweeted] for tweet in search_hashtag]



	with open('tweets.csv', 'w') as f:
		writer = csv.writer(f)
		writer.writerow(["id", "created_at", "text", "likes", "in reply to", "retweeted"])
		writer.writerows(outtweets)
	pass
        
	
	x= pd.read_csv("tweets.csv")
	return x.to_html()

if __name__ == "__main__":
	app.run()


