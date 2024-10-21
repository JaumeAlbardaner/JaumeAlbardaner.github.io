let yOffset = -100; // Adjust this value to set the vertical offset
let weight = 0.1;

let totalImages = 44; // Number of images to load
let images = new Array(totalImages); // Array to store images
let trans_images = new Array(totalImages); // Array to store images

let pastMousePositions = new Array(totalImages); // Array to store past mouse positions
let pastOrcaPositions = new Array(totalImages); // Array to store past orca positions

let backwardsBoolean = true; // Boolean variable to be toggled
let alphaBoolean = false; // Boolean variable to be toggled
let bKeyPressed = false; // Flag to track "B" key press
let aKeyPressed = false; // Flag to track "B" key press

let maxDistance = 120; // Maximum distance to cover per iteration


function preload() {
  for (let i = 1; i <= totalImages; i++) {
    let imgPath = "" + i + ".png";
    images[i-1] = (loadImage(imgPath));
  }
  for (let i = 1; i <= totalImages; i++) {
    let imgPath = "../orca_trans/" + i + ".png";
    trans_images[i-1] = (loadImage(imgPath));
  }
}

// This method is used for creating canvas 
function setup() { 
    createCanvas(windowWidth-20, windowHeight-20); 
    background(255); 

    // Preload screen center
    // Store current mouse position
    for (let i = 0; i < totalImages; i++) {
      let screenCenter = createVector((windowWidth-20)/2, (windowHeight-20)/2);
      pastMousePositions[i] = (screenCenter);
      pastOrcaPositions[i] = (screenCenter);
    }
} 

// This method will draw the circle  
// and track the mouse as well. 
function draw() { 
    clear()

    // Check if the "B" key is pressed
    if (keyIsDown(66) && !bKeyPressed) { // ASCII code for "B"
      backwardsBoolean = !backwardsBoolean; // Toggle between true and false
      bKeyPressed = true; // Set the flag to true
    } else if (!keyIsDown(66)) {
      bKeyPressed = false; // Reset the flag when the "B" key is released
    }
    // Check if the "A" key is pressed
    if (keyIsDown(65) && !aKeyPressed) { // ASCII code for "a"
      alphaBoolean = !alphaBoolean; // Toggle between true and false
      aKeyPressed = true; // Set the flag to true
    } else if (!keyIsDown(65)) {
      aKeyPressed = false; // Reset the flag when the "a" key is released
    }
    
    // Store current mouse position
    let currentMousePosition = createVector(mouseX, mouseY);
    pastMousePositions.push(currentMousePosition);
    pastMousePositions.shift(); // Remove the oldest position


    let deltaX = 0;
    let deltaY = 0;
    let distance = 0;
    
    for (let i = 1; i <= totalImages; i++) {
      let j = backwardsBoolean*(totalImages-i)+ !backwardsBoolean*(i-1);
      let i_aux = !backwardsBoolean*(totalImages-i)+ backwardsBoolean*(i-1);
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
      
      if(alphaBoolean)
      {
        image(trans_images[j], pastOrcaPositions[i_aux].x-images[i_aux].width/2,
        pastOrcaPositions[i_aux].y-images[i_aux].height/2 + yOffset);
      }
      else
      {
        image(images[j], pastOrcaPositions[i_aux].x-images[i_aux].width/2,
          pastOrcaPositions[i_aux].y-images[i_aux].height/2 + yOffset);
      }
  }    
} 
