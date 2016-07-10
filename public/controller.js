var socket = io.connect('http://localhost:2046');

socket.on('connect', function(){
  console.log('socket connected!');
});


function switchScene(scene){
  console.log('activating',scene);
  socket.emit('switch-scene', scene);
}


//FLICKER CONTROL
function flicker_updateColumns(val){
  console.log('columns: ', val);
  socket.emit('flicker-update-columns', val);
}

function flicker_updateRows(val){
  socket.emit('flicker-update-rows', val);
}

function flicker_updateFrequency(val){
  socket.emit('flicker-update-frequency', val);
}

function flicker_updateOffset(val){
  socket.emit('flicker-update-offset', val);
}

//VIRUS CONTROL
function virus_addVirus(){
  socket.emit('virus-add-individual', 1);
}

function virus_updateSpeed(val){
  socket.emit('virus-update-speed');
}
