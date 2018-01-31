const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io'); // web sockets IO

const { generateMessage }   = require('./utils/message');


const publicPath    = path.join(__dirname, '../public');
const app           = express();
const LOCAL_PORT    = 3000;
const __PORT        = process.env.PORT || LOCAL_PORT;
const server        = http.createServer(app);   // create an HTTP server

// configure the HTTP Server
const io    = socketIO(server); // listening events


console.log(`publicPath: ${ publicPath }`); // middleware

io.on('connection', // register an event listener
		(socket) => {
			console.log(`New user connected`);
			
			// socket.emit('newEmail',
			// 			{
			// 				from: 'oarc@gmail.com',
			// 				text: 'This a test',
			// 				createAt: 123
			// 			});
			// socket.on('createEmail',
			// 			(newEmail) => {
			// 				console.log(`createEmail: ${ JSON.stringify(newEmail,  undefined, 2) }`)
			// 			});
			
			// socket.emit('newMessage',
			// 			{
			// 				from: 'OR',
			// 				text: 'My first message in this chat',
			// 				createAt: new Date().getTime()
			// 			});
			
			
			// socket.emit('newMessage',   // socket.emit from Admin text Welcome to the chat app
			// 	{
			// 		from: 'Admin',
			// 		text: 'Welcome to Chat App'
			// 	});
			socket.emit('newMessage',
						generateMessage('Admin', 'Welcome to the chat app'));
			
			
			// socket.broadcast    // socket.broadcast.emit from Admin text New user joined
			// 	.emit('newMessage',
			// 		{
			// 			from: 'Admin',
			// 			text: 'New user joined',
			// 			createdAt: new Date().getTime()
			// 		});
			socket.broadcast
				.emit('newMessage',
					  generateMessage('Admin', 'New user joined'));
			
			
			
			socket.on('createMessage',
						(message) => {
							console.log('createMessage:\t', message);
							// io.emit('newMessage',   // emits an event to every connection
							// 	{
							// 		from: message.from,
							// 		text: message.text,
							// 		createdAt: new Date().getTime()
							// 	});
							io.emit('newMessage',
									generateMessage(message.from, message.text));
							// socket.broadcast
							// 	.emit('newMessage',   // broadcast message
							// 		{
							// 			from: message.from,
							// 			text: message.text,
							// 			createdAt: new Date().getTime()
							// 		});
							
						});
			
			socket.on('disconnect',
					() => {
						console.log('User was disconnected');
					});
		});


app.use(express.static(publicPath));

server.listen(__PORT,
				() => {
					console.log(`Server is UP and RUNNING on PORT: ${ __PORT }`)
				});

