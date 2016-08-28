var socket = io.connect('localhost');

socket.on('connect', function(){
  console.log('socket connected!');
});


function switchScene(scene, display){
  console.log('activating',scene,'on display #'+display);
  var data = {"scene":scene, "display":display};
  socket.emit('switch-scene', data);

  var cl = 'control-1';
  var ctrl = document.getElementsByClassName(cl);
  for(var i = 0; i < ctrl.length; i++){
    ctrl[i].style.display = 'none';
  }

  var cl = 'control-2';
  var ctrl = document.getElementsByClassName(cl);
  for(var i = 0; i < ctrl.length; i++){
    ctrl[i].style.display = 'none';
  }


  var id = scene+'-1';
  // console.log(id);
  document.getElementById(id).style.display = 'block';
  var id = scene+'-2';
  // console.log(id);
  document.getElementById(id).style.display = 'block';
}


//TRANSITION CONTROL
function swipe(val, display){
  var data = {"index":val, "display":display}
  socket.emit('swipe', data);
}


//FLICKER CONTROL
function flicker_updateColumns(val, display){
  var data = {"columns":val, "display":display};
  var id = 'flicker_columns_'+display.toString();

  document.getElementById(id).innerHTML = val;
  socket.emit('flicker-update-columns', data);
}

function flicker_updateRows(val, display){
  var data = {"rows":val, "display":display};
  var id = 'flicker_rows_'+display.toString();

  document.getElementById(id).innerHTML = val;
  socket.emit('flicker-update-rows', data);
}

function flicker_updateFrequency(val, display){
  var data = {"freq":val, "display":display};
  var id = 'flicker_frequency_'+display.toString();

  document.getElementById(id).innerHTML = val;
  socket.emit('flicker-update-frequency', data);
}

function flicker_updateSpeed(val, display){
  var data = {"speed":val, "display":display};
  var id = 'flicker_speed_'+display.toString();

  document.getElementById(id).innerHTML = val;
  socket.emit('flicker-update-speed', data);
}

function flicker_updateOffset(val, display){
  var data = {"offset":val, "display":display};
  var id = 'flicker_offset_'+display.toString();

  document.getElementById(id).innerHTML = val;
  socket.emit('flicker-update-offset', data);
}

function flicker_toggleChromatic(display){
  socket.emit('flicker-toggle-chromatic', display);
}

//VIRUS CONTROL
var total_viruses_1 = 0;
var total_viruses_2 = 0;
function virus_addVirus(display){
  if(display == 1){
    total_viruses_1++;
    var id = 'total_viruses_'+display.toString();
    document.getElementById(id).innerHTML = total_viruses_1;
  }

  if(display == 2){
    total_viruses_2++;
    var id = 'total_viruses_'+display.toString();
    document.getElementById(id).innerHTML = total_viruses_2;
  }

  socket.emit('virus-add-individual', display);
}

function virus_updateSpeed(val, display){
  var id = 'viruses_speed_'+display.toString();

  document.getElementById(id).innerHTML = val;

  var data = {"speed":val, "display":display};
  socket.emit('virus-update-speed', data);
}


//POSTURE CONTROL
function posture_set(val, display){
  var data = {"posture":val, "display":display};
  var id = 'posture_state_'+display.toString();

  document.getElementById(id).innerHTML = val;
  socket.emit('posture-set', data);
}

function posture_reset(display){
  socket.emit('posture-reset', display);
}

function posture_unshadow(display){
  socket.emit('posture-unshadow', display);
}

function posture_dance(display){
  socket.emit('posture-dance', display);
}

//EXPRESSION CONTROL
function ex_updateSpeed(val, display){
  var data = {"speed":val, "display":display};
  var id = 'expression_speed_'+display.toString();

  document.getElementById(id).innerHTML = val;
  socket.emit('expression-update-speed', data);
}

function ex_set(val, display){
  var data = {"expression":val, "display":display};
  var id = 'expression_state_'+display.toString();

  document.getElementById(id).innerHTML = val;
  socket.emit('expression-set', data);
}

function ex_toggle(display){
  socket.emit('expression-toggle', display);
}
