let serial;
let portName = '/dev/cu.usbmodem1411';
let inData; // for incoming serial data
let xPos = 0;

//var for button switches
let button1;
let button2;
let button3;
let button4;
let rightBar;
let leftBar;
let solarRead;

function setup() {
  serial = new p5.SerialPort("10.17.61.21");
  serial.on('list', printList);
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.open(portName); // open a serial port

  createCanvas(1024, 728);
  // background(11, 87, 255);
  background(53, 138, 255);
  h1 = createElement('h1', 'Voltage Generated from Solar Cell')
}

function draw() {
  h1.position(40, 20);
  graphData(solarRead);

  ////////// controlling pages with switches /////////////
  // console.log("button 1:", button1);
  // console.log("button 2:", button2);
  // console.log("button 3:", button3);
  // console.log("button 4:", button4);

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
  // if (leftBar == 1) {
  //   window.location.href = "../index.html";
  // }
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
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

function serialEvent() {
  // inData = Number(serial.read());

  ///////// for controlling button switches /////////
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

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

function graphData(newData) {
  // map the range of the input to the window height:
  var yPos = map(newData, 50, 255, 0, height);

  ////////////////DRAW LINE/////////////////
  // draw the line in a pretty color:
  stroke(255, 255, 0);
  strokeWeight(5);
  strokeCap(SQUARE);
  line(xPos, height, xPos, height - yPos);

  ////////////////DRAW RECTANGLE/////////////////
  // stroke(0, 100, 255);
  // strokeWeight(2.5);
  // strokeCap(SQUARE);
  // rect(xPos, height, xPos, height - yPos);

  // at the edge of the screen, go back to the beginning:
  if (xPos >= width) {
    xPos = 0;
    // clear the screen by resetting the background:
    // background(11, 87, 255);
    background(53, 138, 255);
  } else {
    // increment the horizontal position for the next reading:
    xPos = xPos + 2;
  }
}
