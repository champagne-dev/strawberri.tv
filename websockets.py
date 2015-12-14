from flask_socketio import join_room, leave_room, emit, rooms
from flask import request
from werkzeug.contrib.cache import SimpleCache
cache = SimpleCache()

def websockets(socketio):
    @socketio.on('joinChannel')
    def handle_join(data):
        room = data['channel_name']
        print "CONNECT to " + room
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
        print "DISCONNECT from " + room
        leave_room(room)
        count = cache.get(room+":count")
        if count is not None:
            person_count = int(cache.get(room+":count"))
            cache.set(room+":count", int(person_count)-1)

        emit('userLeft', {"count": cache.get(room+":count")}, broadcast=True, room=room)

    @socketio.on('newmessage')
    def handle_new_message(data):
        room = cache.get(request.sid+"-room")
        print "NEW MESSAGE from " + room
        emit('newmessage', data, broadcast=True, room=room)
    @socketio.on_error()
    def error_handler(e):
        print e
