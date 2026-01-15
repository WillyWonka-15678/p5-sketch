/*===============================================================
  Project Name: Entropy Clock
  Author: Shiyu Wang
  Date: 2025-10-20

  ---------------------------------------------------------------
  INSTRUCTIONS (OPERATION MANUAL)

  • Watch the grid gradually destabilize as entropy increases over time.
  • Click anywhere on the canvas to reduce entropy and temporarily
    restore order to the system.
  • The system constantly fluctuates between stability and disorder,
    driven by Perlin noise and an entropy variable.

  ---------------------------------------------------------------
  BLURB (Short description of the project)

  A generative visualization exploring the rise and fall of entropy.
  Each square of the grid shifts, rotates, and drifts as disorder 
  accumulates—revealing a slow transition from structure to chaos.

  ---------------------------------------------------------------
  ACKNOWLEDGEMENTS (References / Links / Inspirations)

  Inspired by:
  • https://learn.gold.ac.uk/mod/page/view.php?id=1750582
  • https://learn.gold.ac.uk/mod/page/view.php?id=1752323
================================================================*/

let spacing = 30;
let entropy = 0;
let entropyIncrease = 0.01;
let maxEntropy = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(0, 10); // translucent background to create a motion-trail effect
  
  // entropy gradually increases until reaching its maximum limit
  entropy = min(entropy + entropyIncrease, maxEntropy);
  
  // draw a grid with noise-driven perturbations
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      
      // noise adds positional disturbance based on entropy level
      let n = noise(x * 0.02, y * 0.02, frameCount * 0.01);
      let offset = map(n, 0, 1, -entropy * 10, entropy * 10);
      
      // grid color shifts toward chaos as entropy increases
      let hue = map(entropy, 0, maxEntropy, 0, 360);
      fill(hue, 80, 100);
      
      push();
      translate(x + offset, y + offset); // move based on noise offset
      rotate(offset * 0.01 * entropy);   // rotation also influenced by entropy
      rect(0, 0, spacing * 0.6, spacing * 0.6);
      pop();
    }
  }
}

function mousePressed() {
  // clicking reduces entropy and restores local order
  entropy = max(0, entropy - 1);
}
