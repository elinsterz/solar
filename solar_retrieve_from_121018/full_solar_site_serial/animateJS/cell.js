class Cell {
  constructor(x, y) {


    this.show = function() {

      this.x = 0;
      this.y = 0;

      translate(0, 0);

      strokeWeight(2.5);
      strokeJoin(BEVEL);

      // top of cell
      fill(53, 138, 255);
      quad(this.x + 275, this.y + 350, this.x + 395, this.y + 284, this.x + 807, this.y + 284, this.x + 687, this.y + 350);

      //Front Contact - Blue
      fill(53, 138, 255);
      rect(this.x + 275, this.y + 350, 412, 25);

      //Side of Front Contact - Blue
      fill(53, 138, 255);
      quad(this.x + 687, this.y + 350, this.x + 807, this.y + 284, this.x + 807, this.y + 306, this.x + 687, this.y + 373);

      //Left top of front contact - Blue
      fill(200, 235, 255);
      rect(275, 327, 48, 23); //Front
      quad(this.x + 323, this.y + 327, this.x + 443, this.y + 261, this.x + 443, this.y + 284, this.x + 323, this.y + 350); // side
      quad(this.x + 275, this.y + 327, this.x + 395, this.y + 261, this.x + 443, this.y + 261, this.x + 323, this.y + 327); //top

      //Right top of front contact - Blue
      fill(200, 235, 255);
      rect(this.x + 639, this.y + 327, 48, 23); //Front
      quad(this.x + 687, this.y + 327, this.x + 807, this.y + 261, this.x + 807, this.y + 284, this.x + 687, this.y + 350); // side
      quad(this.x + 639, this.y + 327, this.x + 759, this.y + 261, this.x + 807, this.y + 261, this.x + 687, this.y + 327); //top

      //N - light yellow
      fill(255, 255, 192);
      rect(this.x + 275, this.y + 372, 412, 79);

      //Side of N - light yellow
      fill(255, 255, 192);
      quad(this.x + 687, this.y + 373, this.x + 807, this.y + 306, this.x + 807, this.y + 386, this.x + 687, this.y + 452);

      //P - yellow
      fill(255, 255, 99);
      rect(this.x + 275, this.y + 451, 412, 110);

      //Side of P - yellow
      fill(255, 255, 99);
      quad(this.x + 687, this.y + 451, this.x + 807, this.y + 386, this.x + 807, this.y + 493, this.x + 687, this.y + 560);

      //Rear Contact - Light Blue
      fill(200, 235, 255);
      rect(this.x + 275, this.y + 560, 412, 25);

      //Side of Rear Contact - Light Blue
      fill(200, 235, 255);
      quad(this.x + 687, this.y + 560, this.x + 807, this.y + 493, this.x + 807, this.y + 518, this.x + 687, this.y + 585);

      //bottom line
      line(this.x + 275, this.y + 585, this.x + 687, this.y + 585);
      line(this.x + 687, this.y + 585, this.x + 807, this.y + 518);

      //circuit
      line(this.x + 395, this.y + 261, this.x + 395, this.y + 210); //top to bottom, top
      line(this.x + 206, this.y + 210, this.x + 395, this.y + 210); //left to right, top
      line(this.x + 206, this.y + 210, this.x + 206, this.y + 420); // top half to middle, side
      line(this.x + 206, this.y + 430, this.x + 206, this.y + 640); // middle to bottom, side
      line(this.x + 206, this.y + 640, this.x + 395, this.y + 640); // bottom left to right, bottom
      line(this.x + 395, this.y + 640, this.x + 395, this.y + 585); // bottom right to top

      //lightbulb
      fill(255);
      line(this.x + 206, this.y + 420, this.x + 196, this.y + 420);
      line(this.x + 206, this.y + 430, this.x + 196, this.y + 430);
      ellipseMode(CENTER);
      ellipse(this.x + 155, this.y + 425, 50);
      rect(this.x + 178, this.y + 416, 20, 18);
      line(this.x + 188, this.y + 416, this.x + 188, this.y + 434);

    }
  }
}
