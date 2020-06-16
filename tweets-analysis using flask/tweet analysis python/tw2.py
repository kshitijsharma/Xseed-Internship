import tweepy
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import json
import pandas as pd
import csv
from datetime import date
from datetime import datetime
import time

# Twitter credentials for the app
api_key = ''
api_secret_key = ''
access_token = ''
access_token_secret = ''

# pass twitter credentials to tweepy
auth = tweepy.OAuthHandler(api_key, api_secret_key)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

search_terms = ('coronavirus OR COVID OR Corona')

search_hashtag = tweepy.Cursor(api.search, q=search_terms).items(11000000)



outtweets = [[tweet.id_str, tweet.created_at, tweet.text, tweet.favorite_count, tweet.in_reply_to_screen_name,
                  tweet.retweeted] for tweet in search_hashtag]


with open('tweets.csv', 'w') as f:
	writer = csv.writer(f)
	writer.writerow(["id", "created_at", "text", "likes", "in reply to", "retweeted"])
	writer.writerows(outtweets)
pass

df = pd.read_csv("tweets.csv")
df["date"]=df["created_at"].astype('datetime64[ns]')
var=df["date"][0]-pd.Timedelta(minutes=30)
x = df[df["date"]>var]
x.to_csv("final.csv", index = False)

