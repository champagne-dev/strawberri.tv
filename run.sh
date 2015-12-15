gunicorn --worker-class eventlet --bind 127.0.0.1:8000 __init__:app --log-file=/var/log/gunicorn-strawberri.log &
tail -f /var/log/gunicorn-strawberri.log
