const socket  = io(); // creates a connection - listen/send data from/to Server



socket.on('connect',
	function () {
		console.log(`Connected to Server`);
		
		// socket.emit('createEmail',
		// 			{
		// 				to: 'oreyesc@gmail.com',
		// 				text: 'Hey, this is an answer for testing'
		// 			});
		
		// socket.emit('createMessage',
		// 			{
		// 				from: 'oarc',
		// 				text: 'Answering the received chat message',
		// 				createAt: new Date().getTime()
		// 			});
	});



socket.on('disconnect',
		function () {
			console.log(`Disconnected from Server`);
		});



socket.on('newMessage',
		function (message) {
			console.log('New Message:\t',message);
		});


// socket.on('newEmail',
// 	function (email) {
// 		console.log(`New email: ${ JSON.stringify(email, undefined, 2) }`);
// 	});

