web: gunicorn --worker-class eventlet app:app -b 0.0.0.0:$PORT -w 1 --log-file=- 
clock: python clock.py
