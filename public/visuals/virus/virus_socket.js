var socket = io.connect('http://localhost:2046');

var cando = false;

socket.on('connect', function(){
  console.log('virus socket connected!');
});

socket.on('please-do', function(data){
  cando = !cando;
})
