const navBarHeight = 46;
let bgColour;
let canvasWidth;
let canvasHeight;
let physicsMode = false;

function setup() {
	canvasWidth = windowWidth;
	canvasHeight = windowHeight - navBarHeight;
	createCanvas(windowWidth, windowHeight - navBarHeight);

	bgColour = color(228, 27, 90);
	background(bgColour);

	//noStroke();
	ball = new Ball (canvasWidth/2, canvasHeight/4, 15);
}

function draw() {
	stroke(27, 255*(ball.pos.x/canvasWidth), 255*(ball.pos.y/canvasHeight));

	if (keyIsPressed) {
		background(bgColour);
	}

	mouseInteraction();
	ball.draw(canvasWidth, canvasHeight, physicsMode);
}

function mouseInteraction () {
	if (mouseIsPressed && mouseY > 0) {
		ball.pos.x = mouseX;
		ball.pos.y = mouseY;
		ball.vel.x = 0.5*(mouseX-pmouseX);
		ball.vel.y = 0.5*(mouseY-pmouseY);
	}
}

function windowResized() {
	canvasWidth = windowWidth;
	canvasHeight = windowHeight - navBarHeight;
	resizeCanvas(windowWidth, windowHeight - navBarHeight);
	background(bgColour);
}

function togglePhysicsMode(checked) {
    physicsMode = checked;
}