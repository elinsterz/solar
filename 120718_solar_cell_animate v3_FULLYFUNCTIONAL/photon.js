class Photon {
  constructor(x, y, z) {
    this.showStopY = x;
    this.showStartX = y;
    this.showStartY = z;
    this.xspacing = 1; // Distance between each horizontal location
    this.amplitude = 2; // Height of wave
    this.w = 150; // Width of entire wave
    this.theta = 0.0; // Start angle at 0
    this.period = 20.0; // How many pixels before the wave repeats
    this.dx = 0; // Value for incrementing x
    this.yvalues = 0; // Using an array to store height values for the wave
    this.phase_shift = 0; // phase shift function
    this.xPos = 0;
  }

    show(stop,startX, startY) {
      push();

      let width = 1024;
      let height = 768;
      translate(width / 2, 0);
      rotate(PI/2);

      translate(this.showStartX, this.showStartY);

      if (this.xPos >= this.showStopY-150) {
        this.xPos = 0;
      }

      strokeWeight(2.25);
      fill(0);
      triangle(this.xPos + this.w + 6, height / 2, (this.xPos + this.w) - 6, (height / 2) - 6, (this.xPos + this.w) - 6, (height / 2) + 6);

      // // A simple way to draw the wave with an ellipse at each location
      strokeWeight(1.75);
      this.level = 0;
      for (var x = 20; x < this.yvalues.length; x++) {
        fill(0);
        ellipse((x * this.xspacing) + this.xPos, height / 2 + this.yvalues[x], 1, 1);
      }
      this.xPos += 6;

      pop();
    }

    calcWave() {

      this.dx = (TWO_PI / this.period) * this.xspacing;
      this.yvalues = new Array(floor(this.w / this.xspacing));

      // Increment theta (try different values for
      // 'angular velocity' here)
      this.theta += 1;

      // For every x value, calculate a y value with sine function
      var x = this.theta;
      for (var i = 0; i < this.yvalues.length; i++) {
        this.yvalues[i] = sin(x) * this.amplitude;
        x += this.dx;
      }
    }
  }
