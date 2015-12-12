import sys, os
from utils import twitter

def setTweets():
	return

def run():
	try:
		all_channels = db.find_all_channels()
		if all_channels.count() <= 0:
			print "No Channels Exist"
		for channel in all_channels:
			query_string = channel["query_string"]
			url = video.get_url(query_string, channel["page"], channel["pageIndex"])
			print channel["channel_name"]+" "+str(url)
			sys.stdout.flush()
			if channel["pageIndex"] == 9:
				new_page = True
			else:
				new_page = False

			if url:
				db.channel_push_url(channel["channel_name"], url, new_page)
	except Exception as e:
		print e
		sys.stdout.flush()

if __name__ == "__main__":
	from utils import db
	from utils import video
	run()
else:
	from utils import db
	from utils import video
