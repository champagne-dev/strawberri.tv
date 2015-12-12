import requests
import random
from urlparse import urlparse, parse_qs
from bs4 import BeautifulSoup
base_search_url = "http://www.google.com/search?tbm=vid&tbs=dur:s&q="

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
		r = requests.get(base_search_url+query_string+"&start="+str(start), headers={"Connection":"close", "User-Agent" : ua})
		body = r.text
	except Exception as e:
		print e
		return False

	document = BeautifulSoup(body)
	links = document.select("#search div ol h3 a")

	try:
		link = links[index]["href"]
		if link[0] == "/":
			qs = parse_qs(urlparse(link).query)
			if 'url' in qs:
				return qs["url"][0]
			elif 'q' in qs:
				return qs["q"][0]
		else:
			return link
	except Exception as e:
		print e
		return False
