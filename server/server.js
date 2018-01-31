const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io'); // web sockets IO


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
			
			socket.emit('newMessage',
						{
							from: 'OR',
							text: 'My first message in this chat',
							createAt: new Date().toISOString()
						});
					
			socket.on('createMessage',
						(message) => {
							console.log(`createMessage:\t [${ message.createAt }] From: ${ message.from }:\t ${ message.text } `);
						});
			
			socket.on('disconnect',
					() => {
						console.log(`User was disconnected`);
					});
		});


app.use(express.static(publicPath));

server.listen(__PORT,
				() => {
					console.log(`Server is UP and RUNNING on PORT: ${ __PORT }`)
				});

