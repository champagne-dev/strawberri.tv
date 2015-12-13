from flask_socketio import join_room, leave_room, emit
from werkzeug.contrib.cache import SimpleCache
cache = SimpleCache()

def websockets(socketio):
    @socketio.on('joinChannel')
    def handle_join(data):
        room = data['channel_name']
        join_room(room)
        count = cache.get(room+":count")
        if count is None:
            person_count = 0
        else:
            person_count = int(count)

        cache.set(room+":count", person_count+1)

        emit('userJoined', {"count": person_count+1}, broadcast=True)

    @socketio.on('leaveChannel')
    def handle_leave(data):
        room = data['channel_name']
        leave_room(room)
        count = cache.get(room+":count")
        if count is not None:
            person_count = int(cache.get(room+":count"))
            cache.set(room+":count", int(person_count)-1)

        emit('userLeft', broadcast=True)

    @socketio.on_error()
    def error_handler(e):
        print e
