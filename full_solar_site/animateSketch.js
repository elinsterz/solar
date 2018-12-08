let cnv;
let cell;
let photons = []; // declare the array
let sun;
let loop;
let slider;
let loopTimer;

// let numPhotons = 13;
let phStartX = 0;
let phStartY = [];
let phVarStart = -175;
let phVarX = 293;
let lowerRow = 409;
let upperRow = 385;
let phStopX = [];
let phStopY = [];



function setup() {

  loopTimer = millis();
  //here we make the arrays for photon stopping positions

  for (let n = 0; n <= 12; n++) {
    append(phStartY, phVarStart);
    phVarStart -= 30;
  }

  for (let i = 0; i <= 12; i++) {
    append(phStopX, phVarX);
    phVarX += 30;
  }

  for (let j = 0; j <= 12; j++) {

    if (j == 0) {
      append(phStopY, upperRow);
    }

    if (phStopY[j - 1] == 409) {
      append(phStopY, upperRow);
    }
    if (phStopY[j - 1] == 385) {
      append(phStopY, lowerRow);
    }
}

  cnv = createCanvas(1024, 768);
  centerCanvas();
  cell = new Cell(0, 0);
  sun = new Sun(0, 0);

  slider = createSlider(1, 13, 3);
  slider.position(250, 50);
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function draw() {
  background(255,255, 0);
  let sliderPhoton = slider.value();
  cell.show();

// This is the function that goes through the whole loop of photon, e-h gen, tweening and circuit

  if(millis() - loopTimer > 10000){
    loopTimer = millis()

    for (let l = 0; l < sliderPhoton; l++) {
      let rndPh = floor(random(13));
      photons.push(new Loop(phStopX[rndPh], phStopY[rndPh], phStartX, phStartY[rndPh]));
    }
    }
    for (num of photons) {
      num.animate();
      console.log(num.loopState);
      if (num.loopState == false) {
        photons.splice(photons.indexOf(num),1);
      }
  }


sun.show()
}
