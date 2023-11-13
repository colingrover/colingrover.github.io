let canvasWidth = 0;
let canvasHeight = 0;

class Ball {
  constructor (x, y, width) {
    this.x = x;
    this.px = x;
    this.y = y;
    this.py = y;
    this.width = width;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.mass = 3.14159 * (this.width**2);
  }

  collisions() {
    if (this.x + this.width + this.xVelocity > canvasWidth || this.x - this.width + this.xVelocity < 0) {
      this.xVelocity = -this.xVelocity;
    }

    if (this.y + this.width + this.yVelocity > canvasHeight) {
      this.yVelocity = -this.yVelocity;
    }

    if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
    }

    if (this.x + this.width < 0) {
      this.x = canvasWidth + this.width;
    }

    if (this.y + this.width > canvasHeight) {
      this.y = canvasHeight - this.width;
    }
  }

  drag() {
    let dragCoefficient = 1;
    if (this.xVelocity>0) {
      this.xVelocity -= (dragCoefficient*(ball.xVelocity**2))/this.mass;
    }
    if (this.xVelocity<0) {
      this.xVelocity += (dragCoefficient*(ball.xVelocity**2))/this.mass;
    }

    if (this.yVelocity>0) {
      this.yVelocity -= (dragCoefficient*(ball.yVelocity**2))/this.mass;
    }
    if (this.yVelocity<0) {
      this.yVelocity += (dragCoefficient*(ball.yVelocity**2))/this.mass;
    }

  }

  draw() {
    this.drag();
    this.collisions();
    this.yVelocity += 0.5 // basically gravity
    this.y += this.yVelocity;
    this.x += this.xVelocity;
    strokeWeight(this.width);
    line(this.x, this.y, this.px, this.py);
    this.px = this.x;
    this.py = this.y;
    //ellipse(this.x, this.y, this.width);
  }
}
