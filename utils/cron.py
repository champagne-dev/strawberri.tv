import os
from plan import Plan
plan = Plan("scripts")
cwd = os.path.dirname(os.path.realpath(__file__))

def run(pushURL, pushTweets):
	plan.script(pushURL, every='5.minute', output=dict(stdout=cwd+'/stdout_pushURL.log', stderr=cwd+'/stderr_pushURL.log'))
	if pushTweets:
		plan.script(pushTweets, every='1.minute', output=dict(stdout=cwd+'/stdout_pushTweets.log', stderr=cwd+'/stderr_pushTweets.log'))
	plan.run('write')

def exit():
	plan.run("clear")