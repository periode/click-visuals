var socket = io.connect('http://localhost:2046');

var virus = false;
var posture = false;

socket.on('connect', function(){
  console.log('visuals socket connected!');
});

socket.on('switch-scene', function(data){
  state = data;
  console.log('switching scene to',state);

  switch(state){
    case 'virus':
      setup_virus();
      break;
    case 'posture':
      setup_posture();
      break;
    case 'expression':
      setup_expression();
      break;
    case 'flicker':
      setup_flicker();
      break;
    default:
      console.log('no state selected');
      break;
  }
});


//FLICKER CONTROL
socket.on('flicker-update-columns', function(data){
  f_updateColumns(data);
});

socket.on('flicker-update-rows', function(data){
  f_updateRows(data);
});

socket.on('flicker-update-frequency', function(data){
  f_updateFrequency(data);
});

socket.on('flicker-update-offset', function(data){
  f_updateOffset(data);
});

//VIRUS CONTROL
socket.on('virus-add-individual', function(data){
  add_virus();
});

socket.on('virus-update-speed', function(data){
  update_virus_speed(data);
});
