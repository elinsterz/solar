let cnv;
let canvas;

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

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(1024, 768);
  cnv.position(50,100);
  centerCanvas();
  clear();

  // serial communictaion codes
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
}

function windowResized() {
  centerCanvas();
}


function draw() {
  fill(0);
  strokeWeight(2.5);
  line(0,795, width,795);

  ////////// controlling pages with switches /////////////
  console.log("button 1:", button1);
  console.log("button 2:",button2);
  console.log("button 3:",button3);
  console.log("button 4:",button4);

  if (button1 == 1) {
    window.location.href="index.html";
  }
  if (button2 == 1) {
    window.location.href="view/animate.html";
  }
  if (button3 == 1) {
    window.location.href="view/voltGen.html";
  }
  if (button4 == 1) {
    window.location.href="view/battery2.html";
  }
  if (rightBar == 1) {
    window.location.href="view/battery.html";
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
    // rightBar = sensors[4]; //be sure to write the code in Arduino
  }
}
