const substeps = 4;
const substepLength = 1.0 / substeps;

class Ball {
  static DRAG_COEFFICIENT = 0.5;
  static GRAVITY = 0.5;
  static RESTITUTION_COEFFICIENT = 0.8;

  constructor (x, y, radius) {
    this.pos = createVector(x, y);
    this.prevPos = this.pos.copy();
    this.vel = createVector(0, 0);
    this.radius = radius;
    this.mass = PI * (this.radius**2);
  }

  // Oversimplified collision detection (especially boundary handling)
  collisions(canvasWidth, canvasHeight) {
    const xMin = this.radius;
    const xMax = canvasWidth - this.radius;
    const yMax = canvasHeight - this.radius;

    // Wall collision
    if (this.pos.x + this.vel.x > xMax || this.pos.x + this.vel.x < xMin) {
      // Flip x velocity
      this.vel.x *= -Ball.RESTITUTION_COEFFICIENT;
    }

    // Floor collision
    if (this.pos.y + this.vel.y > yMax) {
      this.vel.y *= -Ball.RESTITUTION_COEFFICIENT;
    }

    // Lazy boundary handling
    if (this.pos.x > xMax) {
      this.pos.x = xMax;
    } else if (this.pos.x < xMin) {
      this.pos.x = xMin;
    }

    if (this.pos.y > yMax) {
      this.pos.y = yMax;
    }
  }

  // Drag & gravity
  applyForces(dt = 1) {
    const speed = this.vel.mag();

    // Instead of speed^2 here and then multiplying by a unit vector to get back a direction, 
    // we multiply it by our actual velocity which inherently squares speed and keeps direction
    // included throughout
    const dragAcceleration = this.vel.copy().mult((-0.5 * Ball.DRAG_COEFFICIENT * speed)/this.mass);

    // We don't want drag to be so strong that it can invert our direction, so we'll just limit it here
    const maxDragAcceleration = speed / dt;
    if (dragAcceleration.mag() > maxDragAcceleration) {
      dragAcceleration.setMag(maxDragAcceleration);
    }

    const gravityAcceleration = createVector(0, Ball.GRAVITY);

    const netAcceleration = p5.Vector.add(dragAcceleration, gravityAcceleration).mult(dt);
    
    this.vel.add(netAcceleration);
  }

  draw(canvasWidth, canvasHeight) {
    for (let i=0; i<substeps; i++) {
      this.applyForces(substepLength);
      this.collisions(canvasWidth, canvasHeight);
      this.pos.add(p5.Vector.mult(this.vel, substepLength));
    }

    strokeWeight(this.radius*2);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.prevPos.set(this.pos);
  }
}
