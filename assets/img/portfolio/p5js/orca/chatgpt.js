//Q: is there any way for you to do the whale that follows mouse in p5js?
//R: Certainly! Here's an example of a simple p5.js sketch that creates a whale that follows the mouse:

let whale;

function setup() {
  createCanvas(400, 400);
  whale = new Whale();
}

function draw() {
  background(220);
  whale.update();
  whale.display();
}

class Whale {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 50;
    this.eyeSize = 10;
  }

  update() {
    // Move the whale towards the mouse
    let targetX = mouseX;
    let targetY = mouseY;

    // Adjust the position gradually for a smoother movement
    this.x = lerp(this.x, targetX, 0.1);
    this.y = lerp(this.y, targetY, 0.1);
  }

  display() {
    // Body
    fill(100, 149, 237); // Dodger Blue
    ellipse(this.x, this.y, this.size, this.size / 2);

    // Tail
    triangle(
      this.x - this.size / 2,
      this.y,
      this.x - this.size / 2 - 20,
      this.y - this.size / 4,
      this.x - this.size / 2 - 20,
      this.y + this.size / 4
    );

    // Eye
    fill(0); // Black
    ellipse(this.x + this.size / 4, this.y - this.size / 6, this.eyeSize, this.eyeSize);
  }
}
