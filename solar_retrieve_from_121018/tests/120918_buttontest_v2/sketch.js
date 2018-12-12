let serial;
let portName = '/dev/cu.usbmodem1411';
let button1;
let button2;
let button3;
let button4;


function setup() {
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

  createCanvas(500, 500);
  background(255, 255, 0);

}

function draw() {
  background(0); // black background
  console.log("button 1:", button1);
  console.log("button 2:",button2);
  console.log("button 3:",button3);
  console.log("button 4:",button4);
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
    // button1 = map(sensors[0], 0, 410, 0,width);
  }
}
