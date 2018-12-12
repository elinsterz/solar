//SUN control
const int transistorPin = 7;    // connected to the base of the transistor
const int leftBar = A4; // connected to the left switch for SUN
const int rightBar = A5; // connected to the right switch for SUN

//button pins
const int button1 = 13;
const int button2 = 12;
const int button3 = 11;
const int button4 = 10;

//house & solar cell pins
const int houseLED1 = 3;
const int houseLED2 = 5;
const int scPin1 = A0;
const int scPin2 = A1;

const int numReadings = 10;
int solareadings[numReadings];      // the readings from the analog input from solar cells
int readIndex = 0;              // the index of the current reading
int solarTotal = 0;                  // the running total
int solarSmooth = 0;                // the average smoothed by 10 measurements

//battery parameters

int batBar1 = 2;
int batBar2 = 4;
int batBar3 = 6;
int batBar4 = 8;
int batBars[4] = {batBar1,batBar2,batBar3,batBar4};
unsigned long previousTime = 0;
long interval1 = 2000;
long interval2 = 1000;
int k=0;
int j=4;


//


void setup() {
  //configure the digital input:
  pinMode(button1, INPUT);
  pinMode(button2, INPUT);
  pinMode(button3, INPUT);
  pinMode(button4, INPUT);
  pinMode(transistorPin, OUTPUT);
  pinMode(houseLED1,OUTPUT);
  pinMode(houseLED2,OUTPUT);
  pinMode(batBar1, OUTPUT);
  pinMode(batBar2, OUTPUT);
  pinMode(batBar3, OUTPUT);
  pinMode(batBar4, OUTPUT);
  
  Serial.begin(9600);

  for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    solareadings[thisReading] = 0;
  }
}


void loop() {

unsigned long currentTime = millis();

 //SUN control with the left and right switches + battery charge/discharge
        int leftSW = analogRead(leftBar);
        int rightSW = analogRead(rightBar);
          
        
        if (leftSW > 600){
          digitalWrite(transistorPin, LOW);
          for (int n=0; n < 4; n++){
              digitalWrite(batBars[n],LOW);
          }
          //switch to starting page and turn on light and charge battery
          k=0;
          } else if (rightSW > 600){
            digitalWrite(transistorPin, LOW);
              if  (currentTime - previousTime > interval2) {
                 previousTime = currentTime;
                 if (k <= 4){
                    for (int n=0; n < 4; n++){
                    digitalWrite(batBars[n],HIGH);
                    k=5;
                    }
                 }
               digitalWrite(batBars[j],LOW);
                  if (j >= 1){
                  j--;
                  } else {
                  j=4;
                  k=0;
                  }
                 }
                 

          //switch to battery pg and turn off light and discharge battery
          } else{
            digitalWrite(transistorPin, HIGH);
            if  (currentTime - previousTime > interval1) {
              previousTime = currentTime;
              digitalWrite(batBars[k],HIGH);
              if (k <= 3){
                  k++;
                } else if(k = 4){
                  k=0;
                  for (int n=0; n < 4; n++){
                      digitalWrite(batBars[n],LOW);
                  }
                }
                }
                j=4;
             }

        Serial.print(currentTime);
        Serial.print(",");
        Serial.println(previousTime);
        Serial.print(k);
        Serial.print(",");
        Serial.println(j);
    
//        //  read the right switch location
//        Serial.print(rightSW);
//        Serial.print(",");
//        
//        //  read the left switch location
//        Serial.print(leftSW);
//        Serial.print(",");

}
