var socket = io('localhost:5000');
socket.on('connect', function (data) {
    socket.emit('joinChannel', { channel_name: STRAWBERRI.data.current_channel.channel_name });
});
socket.on('userJoined', function(data){
	console.log("userjoin " + data.count)
});
socket.on('userLeft', function(data){
	console.log("userleft" + data.count)
});