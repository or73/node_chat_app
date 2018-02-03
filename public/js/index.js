const socket    = io(); // creates a connection - listen/send data from/to Server


socket.on('connect',
	function () {
		console.log(`Connected to Server`);
	});



socket.on('disconnect',
		function () {
			console.log(`Disconnected from Server`);
		});



socket.on('newMessage', function (message) {
			console.log('New Message:\t',message);
	
			let formattedTime   = moment(message.createdAt).format('H:mm a');
			let template    = jQuery('#message-template').html();
			let html        = Mustache.render(template, {
				text: message.text,
				from: message.from,
				createdAt: formattedTime
			});
			
			jQuery('#messages').append(html);
		});



socket.on('newLocationMessage', function (message) {
	let formattedTime   = moment(message.createdAt).format('H:mm a');
	let template        = jQuery('#location-message-template').html();
	let html            = Mustache.render(template,  {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});
	
	jQuery('#messages').append(html);
	
	
	// let li  = jQuery('<li></li>');
	// let a   = jQuery('<a target="_blank">My Current Location</a>');
	//
	// li.text(`${message.from} [${ formattedTime }]:`);
	// a.attr('href', message.url);
	//
	// li.append(a);
	// jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function (event) {
	event.preventDefault(); // prevent page reloading
	let messageTextBox  = jQuery('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function () {
		messageTextBox.val('');
	});
});



let locationButton  = jQuery('#send-location');

locationButton.on('click', function () {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}
	
	locationButton.attr('disabled', 'disabled').text('Sending Location...');
	
	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send Location');
		socket.emit('createLocationMessage', {
			lat: position.coords.latitude,
			lon: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Send Location');
		alert('Unable to fetch location');
	});
});


