import sys, os
from utils import db
from utils import video

def run():
	try:
		all_channels = db.find_all_channels()
		if all_channels.count() <= 0:
			print "No Channels Exist"
		for channel in all_channels:
			query_string = channel["query_string"]
			url = video.get_url(query_string, channel["page"], channel["pageIndex"])
			

			sys.stdout.flush()
			

			if url:
				if channel["pageIndex"] == 9 and url[1] == True:
					new_page = True
				else:
					new_page = False

				print url
				print channel["channel_name"]+" "+str(url[0])
				if url[1]:
					google_next = True

				db.channel_push_url(channel["channel_name"], url[0], new_page, google_next)
				
	except Exception as e:
		print e
		sys.stdout.flush()

if __name__ == "__main__":
	run()
