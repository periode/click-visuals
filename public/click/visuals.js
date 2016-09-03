function setup(){
  var cnv = createCanvas(windowWidth, windowHeight);

  background(255);

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

}

function draw(){

    switch(state){
      case 'virus':
        draw_virus();
        break;
      case 'posture':
        draw_posture();
        break;
      case 'expression':
        draw_expression();
        break;
      case 'flicker':
        draw_flicker();
        break;
      case 'transition':
        draw_transition();
        break;
      default:
        console.log('no state selected');
        break;
    }
}
