var STRAWBERRI = STRAWBERRI || {};
STRAWBERRI.ajax = {
	createChannel: function(name, success) {

		var data = {
			channel_name: channel_name
		};

		$.ajax({
			type: "POST",
			url: "/createChannel",
            data: data,
            success: function(data) {
            	success(data);
            },
            error: function(e) {

            }
		});
	},
}