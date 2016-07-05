var timer = 1000;
var start_time;
var date = new Date();
var time = date.getTime();

var shannon = new Profile('shannon', '25', 'dancing');
var mike = new Profile('mike', '26', 'dancer');
var brian = new Profile('brian', '27', 'danced');
var ayla = new Profile('shannon', '24', 'dance');

var dancers = [shannon, mike, brian, ayla];

var profile_name = [];
var age = [];
var character = [];

var prefix_name = 'reference name: ';
var prefix_age = 'approximate age: ';
var prefix_character = 'assumed behaviour: ';


var total_faces = 0;


function resetText(){

  shuffle(dancers);

  for(var i = 0; i < profile_name.length; i++){
    profile_name[i].innerText = prefix_name+'unknown';
  }


  for(var i = 0; i < age.length; i++){
    age[i].innerText = prefix_age+'unknown';
  }

  for(var i = 0; i < character.length; i++){
    character[i].innerText = prefix_character+'unknown';
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var tracker = new tracking.ObjectTracker('face');

  profile_name = document.getElementsByClassName('profile_name');
  age = document.getElementsByClassName('profile_age');
  character = document.getElementsByClassName('profile_character');

  start_time = date.getTime();

  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  //so i need to figure out a way to only update when i get a new tracker
  //so i can compare array lengths
  //if the array changes lengths, then i pull from a profile
  //and display the information on the screen

  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {

    context.clearRect(0, 0, canvas.width, canvas.height);

    if(event.data.length != total_faces){//this is where i update all this bullshit
      if(event.data.length == 0)
        resetText();

      total_faces = event.data.length;
    }

    event.data.forEach(function(rect, index, array) {
      if(index < dancers.length){
        profile_name[index].innerText = prefix_name+dancers[index].name;
        age[index].innerText = prefix_age+dancers[index].age;
        character[index].innerText = prefix_character+dancers[index].character;
      }


      context.strokeStyle = '#00FF00FF';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('attendant #' + (index+1), rect.x + 5, rect.y + 11);
      // context.fillText('attendant #' + rect.y, rect.x + 5, rect.y + 22);
    });
  });
};
