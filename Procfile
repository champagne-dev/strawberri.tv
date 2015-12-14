web: gunicorn --worker-class socketio.sgunicorn.GeventSocketIOWorker app:app -b 0.0.0.0:$PORT -w 1 --log-file=-
clock: python clock.py
