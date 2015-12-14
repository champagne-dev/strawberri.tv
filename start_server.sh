heroku ps:scale web=1 worker=1
heroku ps:scale clock=1
heroku restart
heroku logs --tail