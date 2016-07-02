var socket = io.connect('http://localhost:2046');

var virus = false;
var posture = false;

socket.on('connect', function(){
  console.log('visuals socket connected!');
});

socket.on('switch-scene', function(data){
  state = data;
  console.log('switching scene to',state);
  if(state == 'virus'){
    setup_virus();
  }else if(state == 'posture'){
    setup_posture();
  }else if(state == 'expression'){
    setup_expression();
  }
});
