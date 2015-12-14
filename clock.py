import pushURL
from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()

@sched.scheduled_job('interval', minutes=1)
def timed_job():
	try: 
		pushURL.run()
	except Exception as e:
		print e

def run():
	print "Running scheduler"
	sched.start()

if __name__ == "__main__":
	run()