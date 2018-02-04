const socket    = io(); // creates a connection - listen/send data from/to Server



function scrollToBottom () {    // append a new message at the Bottom of window
	// Selectors
	let messages            = jQuery('#messages'); // select message container
	let newMessage          = messages.children('li:last-child');
	
	// Heights
	let clientHeight        = messages.prop('clientHeight');  // Heights
	let scrollTop           = messages.prop('scrollTop');
	let scrollHeight        = messages.prop('scrollHeight');
	let newMessageHeight    = newMessage.innerHeight();
	let lastMessageHeight   = newMessage.prev().innerHeight();
	
	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);   // go to bottom fo window
	}
}



socket.on('connect', function () {
		console.log(`Connected to Server`);
		
		let params  = jQuery.deparam(window.location.search);
		
		socket.emit('join', params, function (err) {
			if (err) {
				alert(err);
				window.location.href    = '/';
			} else {
				console.log('No error');
			}
		});
	});



socket.on('disconnect', function () {
	console.log(`Disconnected from Server`);
});



socket.on('updateUserList', function (users) {
	console.log('Users list', users);
	let ol  = jQuery('<ol></ol>');
	
	users.forEach(function (user) {
		ol.append(jQuery('<li></li>').text(user));
	});
	
	jQuery('#users').html(ol);  // add to the DOM
});



socket.on('newMessage', function (message) {
			console.log('New Message:\t',message);
	
			let formattedTime   = moment(message.createdAt).format('H:mm a');
			let template        = jQuery('#message-template').html();
			let html            = Mustache.render(template, {
				text: message.text,
				from: message.from,
				createdAt: formattedTime
			});
			
			jQuery('#messages').append(html);
			scrollToBottom();
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
	scrollToBottom();
});



jQuery('#message-form').on('submit', function (event) {
	event.preventDefault(); // prevent page reloading
	let messageTextBox  = jQuery('[name=message]');
	socket.emit('createMessage', {
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


