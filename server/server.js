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

