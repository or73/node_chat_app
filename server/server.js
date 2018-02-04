const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io'); // web sockets IO

const { generateMessage, generateLocationMessage }   = require('./utils/message');
const { isRealString }  = require('./utils/validation');
const { Users }         = require('./utils/users');

const publicPath    = path.join(__dirname, '../public');
const app           = express();
const LOCAL_PORT    = 3000;
const __PORT        = process.env.PORT || LOCAL_PORT;
const server        = http.createServer(app);   // create an HTTP server

// configure the HTTP Server
const io    = socketIO(server); // listening events
const users = new Users();


console.log(`publicPath: ${ publicPath }`); // middleware

io.on('connection', // register an event listener
		(socket) => {
			console.log(`New user connected`);
			
			socket.on('join', (params, callback) => {
				if (!isRealString(params.name) || !isRealString(params.room)) {
					callback('User name and room name are required');
				}
				
				socket.join(params.room);
				users.removeUser(socket.id);    // remove the user from other rooms
				users.addUser(socket.id,  params.name,  params.room);    // add a new User
				
				io.to(params.room).emit('updateUserList', users.getUserList(params.room));
				
				//socket.leave('The Office Fans');
				// io.emit() ->io.to('The Office Fans').emit
				// socket.broadcast.emit() -> socket.broadcast.to('The Office Fans').emit
				socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
				socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${ params.name } has joined`));
				callback();
			});
			
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
						
						let user    = users.removeUser(socket.id);
						
						if (user) {
							io.to(user.room).emit('updateUserList', users.getUserList(user.room)); // update users list
							io.to(user.room).emit('newMessage', generateMessage('Admin', `${ user.name } has left the room`)); // printable message
						}
					});
		});


app.use(express.static(publicPath));

server.listen(__PORT, () => {
					console.log(`Server is UP and RUNNING on PORT: ${ __PORT }`)
				});

