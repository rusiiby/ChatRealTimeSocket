const socketclient = io();
let message =  document.getElementById('message');
let username =  document.getElementById('username');
let btn =  document.getElementById('send');
let output =  document.getElementById('output');
let action =  document.getElementById('action');
let date = new Date(); 
btn.addEventListener('click',function(){
	var objetomensaje = {
		username: username.value,
		message: message.value,
		time: date
	}
	socketclient.emit('chat', objetomensaje);
	
});
message.addEventListener('keypress',function(){
  socketclient.emit('typing', username.value)
});
socketclient.on('repetidor',function(data){
	// console.log(data);
	action.innerHTML = '';
	output.innerHTML +=  `<p>
		<strong>${data.username}:</strong>
		${data.message} <br> <small>${data.time}</small>
	 </p>`;
});

socketclient.on('chat-typing',function(data){
	action.innerHTML = `<p><em>${data} esta escribiendo...</em></p>`;
	setTimeout(()=>{
		action.innerHTML = '';
	},800);
})