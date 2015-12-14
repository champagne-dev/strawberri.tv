var socket = io('localhost:5000');
socket.on('connect', function (data) {
    socket.emit('joinChannel', { channel_name: STRAWBERRI.data.current_channel.channel_name });
});
socket.on('userJoined', function(data){
	STRAWBERRI.ws.peoplecounter.updateEventArr.forEach(function(func){
		func(data);
	});
});
socket.on('userLeft', function(data){
	STRAWBERRI.ws.peoplecounter.updateEventArr.forEach(function(func){
		func(data);
	});
});
socket.on('newmessage', function(data){
	STRAWBERRI.ws.messaging.newMessageEventArr.forEach(function(func){
		func(data);
	});
});
STRAWBERRI.ws = {
	peoplecounter: {
		updateEventArr: [],
		onUpdatePersonCount: function(func){
			STRAWBERRI.ws.peoplecounter.updateEventArr.push(func);
		},
	},
	messaging: {
		sendNewMessage: function(message, author){
			socket.emit('newmessage', {message: message, author: author})
		},
		newMessageEventArr: [],
		onNewMessage: function(func){
			STRAWBERRI.ws.messaging.newMessageEventArr.push(func)
		},
	}
};
setTimeout(function(){
	setTimeout(function(){
		STRAWBERRI.ws.messaging.sendNewMessage("Hey my name is carter", "cartthegob")
		setTimeout(function(){
			STRAWBERRI.ws.messaging.sendNewMessage("Hey my name is carter", "cartthegob")
			setTimeout(function(){
				STRAWBERRI.ws.messaging.sendNewMessage("Hey my name is carter", "cartthegob")
				setTimeout(function(){
					STRAWBERRI.ws.messaging.sendNewMessage("Hey my name is carter", "cartthegob")
				}, 500)
			}, 500)
		}, 500)
	}, 500)
}, 4000)