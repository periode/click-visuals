var socket = io.connect('http://localhost:2046');

socket.on('connect', function(){
  console.log('socket connected!');
});


function switchScene(scene){
  console.log('activating',scene);
  socket.emit('switch-scene', scene);

  var ctrl = document.getElementsByClassName('control');
  for(var i = 0; i < ctrl.length; i++){
    ctrl[i].style.display = 'none';
  }

  document.getElementById(scene).style.display = 'block';
}


//FLICKER CONTROL
function flicker_updateColumns(val){
  document.getElementById('flicker_columns').innerHTML = val;
  socket.emit('flicker-update-columns', val);
}

function flicker_updateRows(val){
  document.getElementById('flicker_rows').innerHTML = val;
  socket.emit('flicker-update-rows', val);
}

function flicker_updateFrequency(val){
  document.getElementById('flicker_frequency').innerHTML = val;
  socket.emit('flicker-update-frequency', val);
}

function flicker_updateOffset(val){
  document.getElementById('flicker_offset').innerHTML = val;
  socket.emit('flicker-update-offset', val);
}

//VIRUS CONTROL
var total_viruses = 0;
function virus_addVirus(){
  total_viruses++;
  document.getElementById('total_viruses').innerHTML = total_viruses;
  socket.emit('virus-add-individual', 1);
}

function virus_updateSpeed(val){
  document.getElementById('virus_speed').innerHTML = total_viruses;
  socket.emit('virus-update-speed');
}


//POSTURE CONTROL
function posture_set(val){
  document.getElementById('posture_state').innerHTML = val;
  socket.emit('posture-set', val);
}


//EXPRESSION CONTROL
function ex_updateSpeed(val){
  document.getElementById('expression_speed').innerHTML = val;
  socket.emit('expression-update-speed', val);
}

function ex_set(val){
  document.getElementById('expression_state').innerHTML = val;
  socket.emit('expression-set', val);
}
