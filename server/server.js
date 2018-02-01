const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io'); // web sockets IO

const { generateMessage, generateLocationMessage }   = require('./utils/message');


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
			socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
			
			socket.broadcast
				.emit('newMessage', generateMessage('Admin', 'New user joined'));
			
			
			
			socket.on('createMessage', (message, callback) => {
							console.log('createMessage:\t', message);
							io.emit('newMessage', generateMessage(message.from, message.text));
							callback();
						});
			
			
			socket.on('createLocationMessage', (coords) => {
				io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lon));
			});
			
			socket.on('disconnect', () => {
						console.log('User was disconnected');
					});
		});


app.use(express.static(publicPath));

server.listen(__PORT, () => {
					console.log(`Server is UP and RUNNING on PORT: ${ __PORT }`)
				});

