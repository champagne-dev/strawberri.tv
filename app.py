import json, os, atexit, sys, random, argparse, eventlet 
from flask import Flask, render_template, jsonify, request, redirect, send_from_directory
from bson.json_util import dumps
from configs import config
from utils import cron as c
from utils import db
from utils import video
from flask_socketio import SocketIO, join_room, leave_room, emit, rooms
from werkzeug.contrib.cache import SimpleCache
cache = SimpleCache()

parser = argparse.ArgumentParser(description='strawberri server')
parser.add_argument('-c', '--cron', action='store_true', help='runs cron')

app = Flask(__name__, static_url_path='/static/')
socketio = SocketIO(app)

success = [
    {
        "error": False,
        "data": "Request completed"
    }
]

# @app.before_request
# def before_request():
#     if request.method == "GET":
#         print "GET REQUEST"
    
@app.route("/", methods=["GET"])
def indexView():
    channels = db.find_all_channels()
    mapped_channels = dict()

    for channel in channels:
        mapped_channels[channel["index"]] = {
            "channel_name": channel["channel_name"],
            "hashtag": channel["hashtag"]
        }  

    if not mapped_channels:
        return render_template("error.html", error_message="No Channels Created")

    channel_hashtag = request.args.get('c')

    if channel_hashtag is None:
        random_channel = random.choice(mapped_channels)
        random_channel_hashtag = random_channel["hashtag"]
        return redirect("/?c="+random_channel_hashtag)
    else:
        current_url_index = 0

        current_channel = db.find_channel_by_hashtag(channel_hashtag)

        for i, timestamp in enumerate(current_channel["url_timestamps"]):
            if timestamp == current_channel["video_start"]:
                current_url_index = i 

        # print mapped_channels
        return render_template("index.html", channels=json.dumps(mapped_channels), current_channel=dumps(current_channel), current_url_index=current_url_index)

@app.route("/createChannel", methods=["POST"])
def createChannel():
    error = [
        {
            "error": True,
            "data": "Could not create channel (try a better channel name)"
        }
    ]
    channel_name = request.form.get('channel_name')

    try:
        if db.channel_exists(channel_name):
            error = [
                {
                    "error": True,
                    "data": "Channel already exists"
                }
            ]
            return jsonify(results=error)            
            
        if len(channel_name) <= 1:
            error = [
                {
                    "error": True,
                    "data": "Channel must be more than 1 character"
                }
            ]
            return jsonify(results=error)

        results = db.create_channel(channel_name)
        if results:
            success[0]["hashtag"] = results["hashtag"]
            return jsonify(results=success)
        else:
            return jsonify(results=error)

    except Exception as e:
        print e
        return jsonify(results=error)


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.errorhandler(Exception)
def all_exception_handler(error):
    print error
    return render_template("error.html", error_message="Wrong page boi")



@socketio.on('joinChannel')
def handle_join(data):
    room = data['channel_name']
    # print "CONNECT to " + room
    join_room(room)
    cache.set(request.sid+"-room", room)
    count = cache.get(room+":count")
    if count is None:
        person_count = 0
    else:
        person_count = int(count)

    cache.set(room+":count", person_count+1)

    emit('userJoined', {"count": cache.get(room+":count")}, broadcast=True, room=room)

@socketio.on('disconnect')
def handle_leave():
    room = cache.get(request.sid+"-room")
    # print "DISCONNECT from " + room
    leave_room(room)
    count = cache.get(room+":count")
    if count is not None:
        person_count = int(cache.get(room+":count"))
        cache.set(room+":count", int(person_count)-1)

    emit('userLeft', {"count": cache.get(room+":count")}, broadcast=True, room=room)

@socketio.on('newmessage')
def handle_new_message(data):
    room = cache.get(request.sid+"-room")
    # print "NEW MESSAGE from " + room
    emit('newmessage', data, broadcast=True, room=room)

@socketio.on_error()
def error_handler(e):
    print e
    sys.stdout.flush()
    
if db.find_all_channels().count() < 1:
    db.init_channels()

if __name__ == "__main__":
    args = parser.parse_args()
    if args.cron:
        def close_handler():
            c.exit()

        atexit.register(close_handler)
        cwd = os.path.dirname(os.path.realpath(__file__))
        c.run(cwd+"/pushURL.py", False)

    socketio.run(app, debug=config.server["debug"], host=config.server["host"], port=config.server["port"])    
else:
    socketio.run(app, debug=config.server["debug"])

# else:
#     cwd = os.path.dirname(os.path.realpath(__file__))
#     c.run(cwd+"/pushURL.py", False)



