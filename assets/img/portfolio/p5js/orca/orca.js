// Shape of the object is a circle 
let ball; 

let yOffset = -100; // Adjust this value to set the vertical offset
let weight = 0.1;

let images = []; // Array to store images
let totalImages = 44; // Number of images to load

let pastMousePositions = []; // Array to store past mouse positions
let pastOrcaPositions = []; // Array to store past orca positions

let toggleBoolean = true; // Boolean variable to be toggled
let bKeyPressed = false; // Flag to track "B" key press

let maxDistance = 120; // Maximum distance to cover per iteration

function preload() {
  for (let i = 1; i <= totalImages; i++) {
    let imgPath = "" + i + ".png";
    images.push(loadImage(imgPath));
  }
}

// This method is used for creating canvas 
function setup() { 
    createCanvas(windowWidth-20, windowHeight-20); 
    // frameRate(10); // Set the frame rate to 10 frames per second

    // Preload screen center
    // Store current mouse position
    while (pastMousePositions.length < totalImages) {
      let screenCenter = createVector((windowWidth-20)/2, (windowHeight-20)/2);
      pastMousePositions.push(screenCenter);
    }
    // Set current orca positions to center
    while (pastOrcaPositions.length < totalImages) {
      let screenCenter = createVector((windowWidth-20)/2, (windowHeight-20)/2);
      pastOrcaPositions.push(screenCenter);
    }
} 

// This method will draw the circle  
// and track the mouse as well. 
function draw() { 

    // Check if the "B" key is pressed
    if (keyIsDown(66) && !bKeyPressed) { // ASCII code for "B"
      toggleBoolean = !toggleBoolean; // Toggle between true and false
      bKeyPressed = true; // Set the flag to true
    } else if (!keyIsDown(66)) {
      bKeyPressed = false; // Reset the flag when the "B" key is released
    }
    
    // Store current mouse position
    let currentMousePosition = createVector(mouseX, mouseY);
    pastMousePositions.push(currentMousePosition);
    pastMousePositions.shift(); // Remove the oldest position


    background(255); 
    let deltaX = 0;
    let deltaY = 0;
    let distance = 0;
    fill(0); 
    
    for (let i = 1; i <= totalImages; i++) {
      let j = toggleBoolean*(totalImages-i)+ !toggleBoolean*(i-1);
      deltaX = - pastOrcaPositions[i-1].x + pastMousePositions[i-1].x;
      deltaY = - pastOrcaPositions[i-1].y + pastMousePositions[i-1].y;
      distance = dist(pastOrcaPositions[i-1].x, pastOrcaPositions[i-1].y, pastMousePositions[i-1].x, pastMousePositions[i-1].y);

      if (distance > maxDistance) {
        pastOrcaPositions[i-1].x += (deltaX / distance) * maxDistance *weight;
        pastOrcaPositions[i-1].y += (deltaY / distance) * maxDistance*weight;
      } else {
        pastOrcaPositions[i-1].x += deltaX * weight;
        pastOrcaPositions[i-1].y += deltaY * weight;
      }

      image(images[j], pastOrcaPositions[i-1].x-images[i-1].width/2,
        pastOrcaPositions[i-1].y-images[i-1].height/2 + yOffset);
    }    
} 
