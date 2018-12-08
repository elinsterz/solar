class Loop {
  constructor(sx, sy, x, y) {

    //photon variables
    this.phStartX = x;
    this.phStartY = y;
    this.phStopX = sx;
    this.phStopY = sy;
    this.photon; // declare the array
    this.photonPosY = 0;
    this.photonPosX = 0;
    this.photonState = true;
    this.loopState;

    //electron variables
    this.electron;
    this.lifetime = 0;
    this.pctHole = 0;
    this.stepHole = 0.045; //? read stephole from electron class
    this.pctElectron = 0;
    this.stepElectron = 0.0048;

    this.cirX = 395;
    this.xspeed = 0;
    this.cirY = 261;
    this.yspeed = 0;
    this.speedVar = 5;

    this.electron = new Electron(); // specific locations needed
    this.photon = new Photon(this.phStopY, this.phStartX, this.phStartY);
}

    animate() {
      this.loopState = true;
      if (this.photonState == true) {

        this.photon.calcWave();
        this.photon.show();
        this.photonPosX += 6;
      }

      if (this.photonPosX >= this.phStopY-151) {

        this.photonState = false;
        this.electron.generate(this.phStopX, this.phStopY, this.lifetime);
        this.lifetime++;
        if (this.lifetime >= 25) {
          //change the numbers to variables
          this.electron.tweenHole(this.phStopX, this.phStopY, this.pctHole);
          this.electron.tweenElectron(this.phStopX, this.phStopY+14, this.pctElectron);
          if (this.pctHole < 1 && this.pctElectron <1) {
            this.pctHole += this.stepHole;
            this.pctElectron += this.stepElectron;
          } else {
              this.electron.circuit(this.cirX, this.cirY);
              this.cirX += this.xspeed;
              this.cirY += this.yspeed;

              // up
              if (this.cirY == 261) {
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

              }
              if (this.pctElectron < 1) {
                this.pctElectron += this.stepElectron;
            } else if (this.pctElectron >= 1 && this.cirY <= 573 && this.cirY >= 568) {
              this.loopState = false;
            }
          }
        }
      }
    }

}
