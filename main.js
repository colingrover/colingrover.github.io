function setup() {
	canvasWidth = windowWidth;
	canvasHeight = windowHeight;
	createCanvas(windowWidth, windowHeight);
	background(228, 27, 90);
	//noStroke();
	ball = new Ball (canvasWidth/2, canvasHeight/4, 30);
	ball.xVelocity = canvasWidth/100;
}

function draw() {
	redoSetup();
	mouseInteraction();
	ball.draw();
}

function redoSetup () {
	canvasWidth = windowWidth;
	canvasHeight = windowHeight;
	//resizeCanvas(windowWidth, windowHeight);
	//background(228, 27, 90);
	//fill(27, 228, 165);
	//fill(27, 255*(ball.x/canvasWidth), 255*(ball.y/canvasHeight));
	stroke(27, 255*(ball.x/canvasWidth), 255*(ball.y/canvasHeight));

	if (keyIsPressed) {
		resizeCanvas(windowWidth, windowHeight);
		background(228, 27, 90);
	}
}

function mouseInteraction () {
	if (mouseIsPressed) {
		ball.x = mouseX;
		ball.y = mouseY;
		ball.xVelocity = 0.5*(mouseX-pmouseX);
		ball.yVelocity = 0.5*(mouseY-pmouseY);

	}
}
