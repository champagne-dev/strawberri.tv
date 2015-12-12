import sys, os
from utils import db
from utils import twitter

def setTweets(channel_name, hashtag):
	tweets = twitter.get_new_tweet_object(hashtag)
	print tweets
	#db.channel_set_tweets(channel_name, tweets)
	return tweets

def run():
	try:
		all_channels = db.find_all_channels()
		if all_channels.count() <= 0:
			print "No Channels Exist"
		for channel in all_channels:
			setTweets(channel["channel_name"], channel["hashtag"])
	except Exception as e:
		print e
		sys.stdout.flush()

if __name__ == "__main__":
	run()
