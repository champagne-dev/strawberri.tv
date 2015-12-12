import sys
from TwitterSearch import *

def get_new_tweet_object(hashtag):
    try:
        print hashtag
        sys.stdout.flush()
        tso = TwitterSearchOrder() 
        tso.set_keywords([hashtag])
        tso.set_language('en')
        tso.set_include_entities(False) 

        ts = TwitterSearch(
            consumer_key = 'ahCdniNp3IHSePmH2agWvYLWr',
            consumer_secret = 'hRCKvYtvLTAfRZ1870mDH4qyJTvxIr7RrzOJkNZPMTJ8NLSpjo',
            access_token = '51838522-Af4E0aXsgIh8vE8YYzMkF7Rhd4Yr27FyJfvFyUXJe',
            access_token_secret = 'sZapDHCDN9DqELgePX9SAkEIW7YRRXkarHWB58KLOZHXp'
         )

        return ts.search_tweets_iterable(tso)
    except TwitterSearchException as e: 
        print e
        return False

def diff_tweets(old_tweets, new_tweets):
    new_tweets = set(new_tweets)
    return [tweet for tweet in old_tweets if tweet not in new_tweets]