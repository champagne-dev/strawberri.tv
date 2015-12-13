import requests
import random
from urlparse import urlparse, parse_qs
from bs4 import BeautifulSoup
base_url = {
	"yahoo": {
		"search": "http://video.search.yahoo.com/search/video?fr2=sb-top-video.search.yahoo.com&ei=UTF-8&iscqry=&fr=sfp&vsite=youtube&p=",
	},
	"google": {
		"search": "http://www.google.com/search?tbm=vid&tbs=dur:s&tbs=srcf:H4sIAAAAAAAAACWLQQqAMAwEf5OL0IsvSmOohZqVNkH6e6XeBmZmmwiPrElwUZt28KJn7zoQXX4xwHfUhF6I8zdI9ZlMndjYnV3lNDSUqmP1L5g3i0JWAAAA&q=",
	},
	"youtube": {
		"search": "https://www.youtube.com/results?search_query=",
	}
}

class FetchURL():
	def __init__(self, engine, i, document):
		self.engine = engine
		self.document = document
		link = getattr(self, engine)(document, i)
		self.link = self.get_youtube_link(link)

	def yahoo(self, document, i):
		links = document.select(".vres > a")
		link = random.choice(links)
		link = link["data-rurl"]
		return link

	def google(self, document, i):
		links = document.select("#search div ol h3 a")
		link = links[i+1]["href"]
		try: 
			if link[0] == "/":
				qs = parse_qs(urlparse(link).query)
				if 'url' in qs:
					return qs["url"][0]
				elif 'q' in qs:
					return qs["q"][0]
			else:
				return link
		except Exception as e:
			return False
	def youtube(self, document, i):
		links = document.select(".yt-lockup-title > a")
		link = random.choice(links)
		return link["href"]

	def get_youtube_link(self, url):
		parsed = urlparse(url)
		v = parse_qs(parsed.query)['v'][0]
		print "v"+v
		embed = "http://www.youtube.com/embed/"+v
		return embed

	def get_url(self):
		return self.link

def LoadUserAgents(uafile):
    uas = []
    with open(uafile, 'rb') as uaf:
        for ua in uaf.readlines():
            if ua:
                uas.append(ua.strip()[1:-1-1])
    random.shuffle(uas)
    return uas

def build_query_string(channel_name):
		query = ""
		seperator = "+"
		split_channel_name = channel_name.split(" ")
		for i, word in enumerate(split_channel_name):
			if i == len(split_channel_name)-1:
				query+=word
			else:
				query+=word+seperator
		
		if len(query) > 0:
			return query
		else:
			return None

def get_url(query_string, page, index):
	user_agents = LoadUserAgents(uafile="user_agents.txt")
	ua = random.choice(user_agents)
	start = (page-1) * 10

	try:
		randomEngine = random.choice(base_url.keys())
		if randomEngine == "google":
			google = True
			additional = "&start="+str(start)
		else:
			google = False
			additional = ""

		r = requests.get(base_url[randomEngine]["search"]+query_string+additional, headers={"Connection":"close", "User-Agent" : ua})
		body = r.text
	except Exception as e:
		print e
		return False

	document = BeautifulSoup(body)

	try:
		print randomEngine
		f = FetchURL(randomEngine, index, document)
		url = f.get_url()
		print url
		return [url, google]
	except Exception as e:
		print e
		return False
