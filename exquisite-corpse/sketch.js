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
  let c = createCanvas(windowWidth, windowHeight);
  c.elt.addEventListener("pointerdown", onDown);
  c.elt.addEventListener("pointerup", onUp);
  c.elt.addEventListener("pointercancel", function () { down = null; });
  // iPhones only allow sound to start during a touch, so unlock it on every touch
  document.addEventListener("touchend", function () { try { userStartAudio(); } catch (e) {} }, { passive: true });
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

// ----- taps and clicks -----
// Handled straight on the canvas with "pointer" events, which phones
// (including iPhones) and computers all send the same way. A finger that
// slides is a scroll, not a tap, so it's ignored.
let down = null;
function onDown(e) {
  down = { x: e.clientX, y: e.clientY, t: Date.now() };
}
function onUp(e) {
  if (!down) return;
  let d = down;
  down = null;
  let dx = e.clientX - d.x, dy = e.clientY - d.y;
  if (dx * dx + dy * dy > 15 * 15 || Date.now() - d.t > 700) return;
  let r = e.target.getBoundingClientRect();
  press(e.clientX - r.left, e.clientY - r.top);
}

function press(x, y) {
  // change the picture first, so it always works even if sound is blocked
  let changed = null;
  if (inside(headBox, x, y)) {
    headIndex = (headIndex + 1) % 6;
    changed = ["head", headIndex];
  } else if (inside(torsoBox, x, y)) {
    torsoIndex = (torsoIndex + 1) % 6;
    changed = ["torso", torsoIndex];
  } else if (inside(legBox, x, y)) {
    legIndex = (legIndex + 1) % 6;
    changed = ["legs", legIndex];
  } else if (inside(feetBox, x, y)) {
    feetIndex = (feetIndex + 1) % 6;
    changed = ["feet", feetIndex];
  }

  // then the sound
  try {
    userStartAudio();
    if (!started) {
      playPart("head", headIndex);
      playPart("torso", torsoIndex);
      playPart("legs", legIndex);
      playPart("feet", feetIndex);
      started = true;
    } else if (changed) {
      playPart(changed[0], changed[1]);
    }
  } catch (err) {
    console.warn("sound could not start:", err);
  }
}

function inside(box, x, y) {
  return x > box.x && x < box.x + box.w && y > box.y && y < box.y + box.h;
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
