import os
from plan import Plan
plan = Plan("scripts")
cwd = os.path.dirname(os.path.realpath(__file__))

def run(DIR):
	#pushURL_run()
	plan.script(DIR, every='1.minute', output=dict(stdout=cwd+'/stdout.log', stderr=cwd+'/stderr.log'))
	plan.run('write')