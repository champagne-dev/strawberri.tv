import pushURL
from apscheduler.schedulers.background import BackgroundScheduler

sched = BackgroundScheduler()

@sched.scheduled_job('interval', minutes=5)
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