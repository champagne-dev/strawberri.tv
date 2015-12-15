import time, sys
from pymongo import MongoClient
from configs import config
from utils import video

host = config.db["host"]
port = config.db["port"]

mongo_url = 'mongodb://'+host+':'+port+'/'
database_name = config.db["dbname"]

client = MongoClient(mongo_url)
db = client[database_name]

def getHashtag(channel_name):
	hashtag = ""
	upper_channel_name = channel_name.title()
	channel_name_array = upper_channel_name.split(" ")
	for ch in channel_name_array:
		hashtag += ch

	return hashtag

def channel_count():
	return db.channels.count()

def find_all_channels():
	return db.channels.find({})

def find_channel_by_hashtag(channel_hashtag):
	return db.channels.find_one({"hashtag": channel_hashtag})

def channel_exists(channel_name):
	count = db.channels.find({'channel_name': channel_name}).count()
	if count > 0:
		return True
	else:
		return False

def create_channel(channel_name):
	ch_count = channel_count()

	channel = {
		"channel_name": channel_name,
		"hashtag": getHashtag(channel_name),
		"query_string": video.build_query_string(channel_name),
		"urls": ['','','','','','','','','','','','','','','','','','','',''],
		"created_date": int(round(time.time() * 1000)),
		"index": ch_count,
		"video_start": 0,
		"page": 1,
		"pageIndex": 0,
		"latest_tweets": [],
		"url_timestamps": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	}

	try:
		t = int(round(time.time() * 1000))
		url = video.get_url(channel["query_string"], 1, 0)
		if url == False:
			return False
		channel["url_timestamps"].pop()
		channel["url_timestamps"].append(t)
		channel["urls"].pop()
		channel["urls"].append(url[0])
		channel["video_start"] = t
		if url[1] == True:
			channel["pageIndex"] = 1
		channel_id = db.channels.insert_one(channel).inserted_id

		print str(channel_id)+" created"
		return channel
	except Exception as e:
		print e
		return False

	sys.stdout.flush()

def channel_push_url(channel_name, url, new_page, google_next):
	t = int(round(time.time() * 1000))
	print url

	query = {
		'$push': {
			'urls': url,
			'url_timestamps': t
		},
		'$set': {
			'video_start': t
		}
	}

	try:
		if new_page and google_next:
			query["$inc"] = {
				"page": 1
			}
			query["$set"]["pageIndex"] = 0

		elif google_next == True:
			query["$inc"] = {
				"pageIndex": 1
			}

		db.channels.update_one({
			'channel_name': channel_name
		}, 
		{
			'$pop': { 
				'urls' : -1,
				"url_timestamps" : -1 
			}
		}, upsert=False)
		db.channels.update_one({
			'channel_name': channel_name
		}, query, upsert=False)
		return True
	except Exception as e:
		print e
		return False	

def init_channels():
	create_channel("cats")
	create_channel("star wars")
	create_channel("dj khaled")
	create_channel("top news")
	create_channel("DIY")

def channel_push_tweet(channel_name, tweet_object):
	tweet_string = json.dumps(tweet_object)
	try:
		db.channels.update_one({
			'channel_name': channel_name
		}, {
			'$push': {
				'latest_tweets': tweet_string
			}
		}, upsert=False)
	except Exception as e:
		print e
		return False

def channel_set_tweets(channel_name, tweets):
	try:
		db.channels.update_one({
			'channel_name': channel_name
		}, {
			'$set': {
				'latest_tweets': tweets
			}
		}, upsert=False)
	except Exception as e:
		print e
		return False