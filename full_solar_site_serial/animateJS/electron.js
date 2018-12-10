class Electron {
  constructor(x, y) {
    //variables for circuit
    this.cirStartX = 395;
    this.cirStartY = 261;
    this.holeSizeCircuit = 14;
    this.cirStroke=0;
    this.cirEndX = 395
    this.cirEndY = 572;

    //variables for tween
    this.electronX = 0 ; // current x coordinate
    this.electronY = 0; // current y coordinate
    this.holeX = 0 ; // current x coordinate
    this.holeY = 0; // current y coordinate
    this.stepElectron = 0.0047; // createCanvas of each step (0.0 to 1.0)
    this.stepHole = 0.03; // createCanvas of each step (0.0 to 1.0)
    this.pctElectron = 0.0; // percentage traveled (0.0 to 1.0)
    this.pctHole = 0.0; // percentage traveled (0.0 to 1.0)
    this.holeSize = 0; // size of tween Hole
    this.electronSize = 0; // size of electron hole

    //variables for generate
    this.time = 0;
    this.lifetime = 25;
    this.genX;
    this.genY;
}

    generate(startX,startY,genTime) {
      this.time = genTime;
      this.genX = startX;
      this.genY = startY;

      strokeWeight(2.25);
      ellipseMode(CENTER);

      if (this.time < this.lifetime) {
        fill(0, 22, 255); // blue
        ellipse(startX, startY+15, 14);
        fill(255, 0, 241); //magenta
        ellipse(startX, startY, 14);
      } else{
        strokeWeight(0);
        fill(0, 22, 255, 0); // blue
        ellipse(startX, startY+15, 0);
        fill(255, 0, 241,0); //magenta
        ellipse(startX, startY, 0);
      }
      //this.time++;
    }

    tweenHole(tweenStartX, tweenStartY, pctHole) {
      this.pctHole = pctHole;
      if (this.pctHole < 1.0) {
        this.holeX = tweenStartX + ((this.cirStartX - tweenStartX) * this.pctHole);
        this.holeY = tweenStartY + ((this.cirStartY - tweenStartY) * this.pctHole);
        this.holeSize = 14;
        strokeWeight(2.25);
      } else {
        strokeWeight(0);
        this.holeSize = 0;
      }
      // this.pctHole += this.stepHole;
      fill(255, 0, 241); //magenta
      ellipse(this.holeX, this.holeY, this.holeSize);
    }

    tweenElectron(tweenStartX, tweenStartY, pctElectron) {
      this.pctElectron = pctElectron;
      if (this.pctElectron < 1.0) {
        this.electronX = tweenStartX + ((this.cirEndX - tweenStartX) * this.pctElectron);
        this.electronY = tweenStartY + ((this.cirEndY - tweenStartY) * this.pctElectron);
        this.electronSize = 14;
        strokeWeight(2.25);
      } else {
        strokeWeight(0);
        this.electronSize = 0;
      }
      // this.pctElectron += this.stepElectron;
      fill(0, 22, 255); // blue
      ellipse(this.electronX, this.electronY, this.electronSize);
    }

    // function for moving electron through circuit
    circuit(cirX,cirY) {

      this.cirX = cirX;
      this.cirY = cirY;

      //stop at rear contact
      if (this.cirX >= 395 && this.cirY <= 573 && this.cirY >= 568) {
        this.cirStroke = 0;
        this.holeSizeCircuit = 0;
      } else {
        this.cirStroke= 2.25;
        this.holeSizeCircuit = 14;
        }
            ellipseMode(CENTER);
            strokeWeight(this.cirStroke);
            fill(255, 0, 241); //magenta
            ellipse(this.cirX, this.cirY, this.holeSizeCircuit);



      this.cirX += this.xspeed;
      this.cirY += this.yspeed;

      // up
      if(this.cirY == 261){
        this.yspeed = -this.speedVar;
      }

      // left
      if (this.cirY <= 211 && this.cirX <= 395) {
        this.yspeed = this.yspeed * 0;
        this.xspeed = -this.speedVar;
      }

      // down
      if (this.cirX <= 206) {
        this.xspeed = this.xspeed * 0;
        this.yspeed = this.speedVar;
      }

      //right
      if (this.cirY >= 640) {
        this.yspeed = this.yspeed * 0;
        this.xspeed = this.speedVar;
      }

      //up
      if (this.cirX >= 395 && this.cirY >= 640) {
        this.xspeed = this.xspeed * 0;
        this.yspeed = -this.speedVar;
      }

      //stop at rear contact
      if (this.cirX >= 395 && this.cirY <= 573 && this.cirY >= 568) {
        this.yspeed = this.yspeed * 0;
        this.xspeed = this.xspeed * 0;
        this.cirStroke = 0;
        this.holeSizeCircuit = 0;

      }

    }
}
