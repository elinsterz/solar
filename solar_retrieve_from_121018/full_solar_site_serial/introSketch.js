let cnv;
let canvas;

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(1024, 768);
  canvas.position(50,100);
  centerCanvas();
  clear();
}

function windowResized() {
  centerCanvas();
}


function draw() {
}
