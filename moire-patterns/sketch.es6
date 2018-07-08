/*
Based off of Zachary Williams' work here
https://medium.com/front-end-hacking/learning-the-p5-canvas-drawing-library-in-es6-and-webpack-bf514a679544
*/
function setup() {
	let gfx = createGraphics(window.innerWidth, window.innerHeight);
	let gfx2;

	createCanvas(window.innerWidth, window.innerHeight);
	angleMode(DEGREES);
	imageMode(CENTER);
	translate(window.innerWidth/4, window.innerHeight/2);
	
	background(40);
	gfx.stroke(200);
	gfx.strokeWeight(3);
	for (let i = 0; i < 1000; i++) {
		gfx.point(
			Math.random() *
			window.innerWidth, 
			Math.random() *
			window.innerHeight
		);
	}

	gfx2 =  gfx;

	image(gfx, 0, 0);
	rotate(2.5);
	image(gfx2, 2, 2);
}

function draw(){
	

}