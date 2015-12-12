import datetime, sys
from pymongo import MongoClient
from configs import config
from utils import video
host = config.db["host"]
port = config.db["port"]
database_name = config.db["dbname"]

client = MongoClient('mongodb://'+host+':'+port+'/')

db = client[database_name]

def channel_count():
	return db.channels.count()

def find_all_channels():
	return db.channels.find({})

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
		"hashtag": channel_name,
		"query_string": video.build_query_string(channel_name),
		"urls": [],
		"created_date": datetime.datetime.utcnow(),
		"index": ch_count,
		"video_start": 0,
		"page": 1,
		"pageIndex": 0
	}

	try:
		channel_id = db.channels.insert_one(channel).inserted_id
		print str(channel_id)+" created"
		return True
	except Exception as e:
		print e
		return False

	sys.stdout.flush()

def channel_push_url(channel_name, url, new_page):
	query = {
		'$push': {
			'urls': url
		},
		'$set': {
			'video_start': datetime.datetime.utcnow()
		}
	}

	try:
		if new_page:
			query["$inc"] = {
				"page": 1
			}
			query["$set"]["pageIndex"] = 0

		else:
			query["$inc"] = {
				"pageIndex": 1
			}

		db.channels.update_one({
			'channel_name': channel_name
		}, query, upsert=False)
		
		return True
	except Exception as e:
		print e
		return False	