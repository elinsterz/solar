let serial;
let portName = '/dev/cu.usbmodem1411';
let inData;  // for incoming serial data
let xPos = 0;

function setup() {
  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.open(portName);              // open a serial port

  createCanvas(500,500);
  background(255,255,0);
}

function draw() {
  // fill(255);
  // textSize(60);
  // text("sensor value: " + inData, 20,100);
  graphData(inData);
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

function serialEvent() {
 inData = Number(serial.read());
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

function graphData(newData) {
  // map the range of the input to the window height:
  let yPos = map(newData, 120, 255, 0, height);
  // draw the line in a pretty color:
  stroke(0, 100, 255);
  strokeWeight(5);
  strokeCap(SQUARE);
  line(xPos, height, xPos, height - yPos);

  // at the edge of the screen, go back to the beginning:
  if (xPos >= width) {
    xPos = 0;
    // clear the screen by resetting the background:
    background(255, 255, 0);
  } else {
    // increment the horizontal position for the next reading:
    xPos= xPos + 2;
  }
}
