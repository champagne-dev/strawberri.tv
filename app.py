import json, os
from flask import Flask, render_template, jsonify, request, send_from_directory
from flask_socketio import SocketIO, join_room, leave_room
from configs import config
from utils import cron as c
from utils import db
from utils import video

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
    mapped_channels = list(map(lambda x: {
        "channel_name": x["channel_name"],
        "hashtag": x["hashtag"],
        "urls": x["urls"],
        "index": x["index"],
        "video_start": x["video_start"]
    }, channels))
    
    return render_template("index.html", channels=mapped_channels)

@app.route("/createChannel", methods=["POST"])
def createChannel():
    error = [
        {
            "error": True,
            "data": "Could not create channel"
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

        if db.create_channel(channel_name):
            return jsonify(results=success)
        else:
            return jsonify(results=error)
    except:
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
    join_room(room)
    emit('joinedUser', broadcast=True)

@socketio.on('leaveChannel')
def handle_leave(data):
    room = data['channel_name']
    leave_room(room)
    emit('joinedUser', broadcast=True)

if __name__ == "__main__":
    cwd = os.path.dirname(os.path.realpath(__file__))
    c.run(cwd+"/pushURL.py")
    socketio.run(app, debug=config.server["debug"], host=config.server["host"], port=config.server["port"])
