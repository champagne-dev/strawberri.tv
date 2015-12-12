import json, os
from bin import cron as c
from flask import Flask, render_template, jsonify, request, send_from_directory
from configs import config
from utils import db

app = Flask(__name__, static_url_path='')
success = [
    {
        "error": False,
        "data": "Request completed"
    }
]

@app.before_request
def before_request():
    if request.method == "GET":
        print "GET REQUEST"
    
@app.route("/", methods=["GET"])
def indexView():
    channels = db.find_all_channels()
    return render_template("index.html", channels=json.dumps(channels))

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

if __name__ == "__main__":
    cwd = os.path.dirname(os.path.realpath(__file__))
    c.run(cwd+"/bin/pushURL.py")
    app.run(debug=config.server["debug"], host=config.server["host"], port=config.server["port"])

