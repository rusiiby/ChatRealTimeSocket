console.log('Server init..');
const path  = require('path');
const express = require('express');
const app =  express();


app.set('port',process.env.PORT || 3200);
app.use(express.static(path.join(__dirname,'public')));

const server = app.listen(app.get('port'),()=>{
	console.log('server on port ' , app.get('port'));
});

const socket = require('socket.io');
const io = socket(server);

io.on('connection',(socketclient)=>{
	console.log('new connection',socketclient.id)
	socketclient.on('chat',(data)=>{
		console.log("esta es la data en el servidor",data);
		io.sockets.emit('repetidor',data);
	});

	socketclient.on('typing',(data)=>{
		socketclient.broadcast.emit('chat-typing',data);
	})
	
});
