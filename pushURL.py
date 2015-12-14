import sys, os
from utils import video

def get_url_jawn(query_string, channel, channel_push_url):
	url = video.get_url(query_string, channel["page"], channel["pageIndex"])

	if url:
		if channel["pageIndex"] == 8 and url[1] == True:
			new_page = True
		else:
			new_page = False

		# print url
		print channel["channel_name"]+" "+str(url[0])
		try: 
			if url[1]:
				google_next = True
			else:
				google_next = False
			
			channel_push_url(channel["channel_name"], url[0], new_page, google_next)
		except:
			return False
def run():
	try:
		all_channels = db.find_all_channels()
		if all_channels.count() <= 0:
			print "No Channels Exist"
		for channel in all_channels:
			query_string = channel["query_string"]

			url = get_url_jawn(query_string, channel, db.channel_push_url)
			if url == False:
				channel["pageIndex"] += 1
				get_url_jawn(query_string, channel, db.channel_push_url)

	except Exception as e:
		print e
		sys.stdout.flush()

if __name__ == "__main__":
	from utils import db
	run()
