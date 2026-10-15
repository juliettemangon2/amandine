let heads = [];
let torsos = [];
let legs = [];
let feet = [];

let headIndex = 0;
let torsoIndex = 0;
let legIndex = 0;
let feetIndex = 0;

let headBox = {};
let torsoBox = {};
let legBox = {};
let feetBox = {};

let started = false;

// Sounds load in the background (not before the page shows),
// so the figure appears right away. Each sound starts as soon as it's ready.
const SOUND_NAMES = { head: "headSound", torso: "torsoSound", legs: "legsSound", feet: "feetSound" };
let soundCache = {};    // "head0" → the loaded sound
let playing = {};       // which sound is playing for each part
let wanted = {};        // which sound each part should be playing

function preload() {
  for (let i = 1; i <= 6; i++) {
    heads.push(loadImage("assets/head" + i + ".webp"));
    torsos.push(loadImage("assets/torso" + i + ".webp"));
    legs.push(loadImage("assets/legs" + i + ".webp"));
    feet.push(loadImage("assets/feet" + i + ".webp"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  // start downloading the first sound of each part
  for (let part in SOUND_NAMES) getSound(part, 0);
}

function draw() {
  background(255);

  let centerX = width / 2;

  let totalH = height * 0.9;
  let startY = height * 0.05;

  let headH = totalH * 0.11;
  let torsoH = totalH * 0.33;
  let legH = totalH * 0.44;
  let feetH = totalH * 0.12;

  let gap = height * 0.01;

  let headY = startY + headH / 2;
  let torsoY = headY + headH / 2 + gap + torsoH / 2;
  let legY = torsoY + torsoH / 2 + gap + legH / 2;
  let feetY = legY + legH / 2 + gap + feetH / 2;

  drawPart(legs[legIndex], centerX, legY, legH, legBox);
  drawPart(torsos[torsoIndex], centerX, torsoY, torsoH, torsoBox);
  drawPart(feet[feetIndex], centerX, feetY, feetH, feetBox);
  drawPart(heads[headIndex], centerX, headY, headH, headBox);
}

function drawPart(img, x, y, targetH, box) {
  let ratio = img.width / img.height;
  let targetW = targetH * ratio;

  image(img, x, y, targetW, targetH);

  box.x = x - targetW / 2;
  box.y = y - targetH / 2;
  box.w = targetW;
  box.h = targetH;
}

function mousePressed() {
  press();
}

// ----- phones and tablets: a tap works like a click -----
// (some phones never send a "click" to the sketch, so taps are handled here.
//  A finger that slides is a scroll, not a tap, so it's ignored.)
let tapStart = null;
function touchStarted(event) {
  if (event && event.touches && event.touches.length === 1) {
    tapStart = { x: event.touches[0].clientX, y: event.touches[0].clientY, t: millis(), mx: mouseX, my: mouseY };
  } else {
    tapStart = null;
  }
}
function touchMoved(event) {
  if (!tapStart || !event || !event.touches || !event.touches.length) return;
  let dx = event.touches[0].clientX - tapStart.x, dy = event.touches[0].clientY - tapStart.y;
  if (dx * dx + dy * dy > 15 * 15) tapStart = null;   // the finger moved: it's a scroll
}
function touchEnded() {
  if (!tapStart) return;
  let s = tapStart;
  tapStart = null;
  if (millis() - s.t > 700) return;                   // a long press isn't a tap
  mouseX = s.mx;
  mouseY = s.my;
  press();
}

function press() {
  userStartAudio();

  if (!started) {
    playPart("head", headIndex);
    playPart("torso", torsoIndex);
    playPart("legs", legIndex);
    playPart("feet", feetIndex);
    started = true;
  }

  if (inside(headBox)) {
    headIndex = (headIndex + 1) % 6;
    playPart("head", headIndex);
  } else if (inside(torsoBox)) {
    torsoIndex = (torsoIndex + 1) % 6;
    playPart("torso", torsoIndex);
  } else if (inside(legBox)) {
    legIndex = (legIndex + 1) % 6;
    playPart("legs", legIndex);
  } else if (inside(feetBox)) {
    feetIndex = (feetIndex + 1) % 6;
    playPart("feet", feetIndex);
  }
}

function inside(box) {
  return (
    mouseX > box.x &&
    mouseX < box.x + box.w &&
    mouseY > box.y &&
    mouseY < box.y + box.h
  );
}

// get a part's sound, downloading it the first time
function getSound(part, index) {
  let key = part + index;
  if (!soundCache[key]) {
    soundCache[key] = loadSound("assets/" + SOUND_NAMES[part] + (index + 1) + ".mp3", function (s) {
      if (wanted[part] === index) startLoop(part, s);   // play it if it's still the one we want
    });
  }
  return soundCache[key];
}

// stop the part's current sound and loop the new one
function playPart(part, index) {
  wanted[part] = index;
  if (playing[part]) {
    playing[part].stop();
    playing[part] = null;
  }
  let s = getSound(part, index);
  if (s.isLoaded()) startLoop(part, s);
  getSound(part, (index + 1) % 6);   // get the next one ready
}

function startLoop(part, s) {
  if (playing[part] && playing[part] !== s) playing[part].stop();
  s.loop();
  playing[part] = s;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
