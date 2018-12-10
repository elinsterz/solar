class Sun {
  constructor(x, y) {

    this.show = function() {

      this.x = x;
      this.y = y;

      translate(0, 0);

      strokeWeight(2.5);
      strokeJoin(BEVEL);

      //sun
      fill(255);
      ellipseMode(CORNER);
      ellipse(this.x + 15, this.y - 960, 1075);
    }
  }
}
