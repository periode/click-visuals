var socket = io.connect('http://localhost:2046');

socket.on('connect', function(){
  console.log('socket connected!');
});


function switchScene(scene){
  console.log('activating',scene);
  socket.emit('switch-scene', scene);
}
