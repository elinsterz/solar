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

//for serial communication
let serial;
let portName = '/dev/cu.usbmodem1411';

//for button switches
let button1;
let button2;
let button3;
let button4;
let rightBar;
let leftBar;
let solarRead;

function setup() {
  /////////////////serial communication code/////////////////////
  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.list(); // lists the serial ports
  serial.open(portName); // open a serial port

  serial.list();

  /////////////////animation code/////////////////////
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

  // slider = createSlider(1, 13, 3);
  // slider.position(700, 50);

  h1 = createElement('h1', 'Solar Cell Diagram');
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
  background(255, 255, 0);
  h1.position(40, 20);
  // let sliderPhoton = slider.value();
  let sliderPhoton = map(solarRead,60,255,1,13);
  cell.show();

  // This is the function that goes through the whole loop of photon, e-h gen, tweening and circuit

  if (millis() - loopTimer > 7000) {
    loopTimer = millis()

    for (let l = 0; l < sliderPhoton; l++) {
      // let rndPh = floor(random(13));
      // photons.push(new Loop(phStopX[rndPh], phStopY[rndPh], phStartX, phStartY[rndPh]));
      photons.push(new Loop(phStopX[l], phStopY[l], phStartX, phStartY[l]));
    }
  }
  for (num of photons) {
    num.animate();
    console.log(num.loopState);
    if (num.loopState == false) {
      photons.splice(photons.indexOf(num), 1);
    }
  }
  sun.show()

  ////////// controlling pages with switches /////////////
  console.log("button 1:", button1);
  console.log("button 2:", button2);
  console.log("button 3:", button3);
  console.log("button 4:", button4);

  if (button1 == 1) {
    window.location.href = "../index.html";
  }
  if (button2 == 1) {
    window.location.href = "animate.html";
  }
  if (button3 == 1) {
    window.location.href = "voltGen.html";
  }
  if (button4 == 1) {
    window.location.href = "battery2.html";
  }
  if (rightBar == 1) {
    window.location.href = "battery.html";
  }
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (let i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}


function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

function serialEvent() {
  // inData = Number(serial.read());
  let inString = serial.readStringUntil('\r\n');

  if (inString.length > 0) {
    let sensors = split(inString, ','); // split the string on the commas
    button1 = sensors[0];
    button2 = sensors[1];
    button3 = sensors[2];
    button4 = sensors[3];
    leftBar = sensors[4];
    rightBar = sensors[5];
    solarRead = sensors[6];
    // rightBar = sensors[4]; //be sure to write the code in Arduino
  }
}
