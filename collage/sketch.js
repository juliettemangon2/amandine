// The collage files live in the "collage" folder of the website.
// FOLDER is added in front of every image and sound path.
const FOLDER = 'collage/';
// Helvetica Neue, or Helvetica / Arial on computers that don't have it
const FONT = 'Helvetica Neue", Helvetica, "Arial';
let cnv;

let screen = "home";
let savedArtboard;
let finalArtboard;
//let generatedTitle = "'TITLE'";

let red;
let orange;
let yellow;
let green;
let teal;
let mint;
let babyblue;
let blue;
let violet;
let purple;
let fuscia;
let pink;

function preload(){
	bgColor = loadImage(FOLDER + 'images/bgcolor.jpg');
	bgImage = loadImage(FOLDER + 'images/bgImage.png');
	person = loadImage(FOLDER + 'images/people.png');
	objects = loadImage(FOLDER + 'images/object.jpg');
	boat = loadImage(FOLDER + 'images/boat.webp');
	climber = loadImage(FOLDER + 'images/climber.webp');
	garden = loadImage(FOLDER + 'images/garden.webp');
	gov = loadImage(FOLDER + 'images/gov.webp');
	horse = loadImage(FOLDER + 'images/horse.webp');
	king = loadImage(FOLDER + 'images/king.webp');
	kids = loadImage(FOLDER + 'images/kids.webp');
	knife = loadImage(FOLDER + 'images/knife.webp');
	lake = loadImage(FOLDER + 'images/lake.webp');
	laundry = loadImage(FOLDER + 'images/laundry.webp');
	lipgloss = loadImage(FOLDER + 'images/lipgloss.webp');
	mirror = loadImage(FOLDER + 'images/mirror.webp');
	ocean = loadImage(FOLDER + 'images/ocean.webp');
	orangefruit = loadImage(FOLDER + 'images/orange.webp');
	pencil = loadImage(FOLDER + 'images/pencil.webp');
	safari = loadImage(FOLDER + 'images/safari.webp');
	salt = loadImage(FOLDER + 'images/salt.webp');
	sitter = loadImage(FOLDER + 'images/sitter.webp');
	skiier = loadImage(FOLDER + 'images/skiier.webp');
	tape = loadImage(FOLDER + 'images/tape.webp');
	weds = loadImage(FOLDER + 'images/weds.webp');
	seal = loadImage(FOLDER + 'images/seal.webp');
	stand = loadImage(FOLDER + 'images/stand.webp');
	usb = loadImage(FOLDER + 'images/usb.webp');
	tulip = loadImage(FOLDER + 'images/tuplip.webp');
	necklace = loadImage(FOLDER + 'images/necklace.webp');
	field = loadImage(FOLDER + 'images/field.webp');
	balcony = loadImage(FOLDER + 'images/balcony.webp');
	snipSound = loadSound(FOLDER + 'sound/snip.mp3');
	customText = loadImage(FOLDER + 'images/abc.png');
}

function setup() {
	// The sketch is still drawn at 1960 x 920, but the page shrinks or grows
	// the canvas to fit the screen (see #collage in style.css).
	// p5 converts mouse positions back to 1960 x 920 automatically.
	cnv = createCanvas(1960, 920);
	cnv.parent('collage');
	background(255);

	artboardColor = color(255);
	
	home();
	
	red = color(255, 33, 74);
	orange = color(245, 130, 64);
	yellow = color(255, 230, 102);
	green = color(190, 237, 114);
	mint = color(157, 245, 180);
	teal = color(129, 240, 227);
	babyblue = color(117, 211, 240);
	blue = color(76, 135, 245);
	violet = color(167, 172, 235);
	purple = color(141, 91, 189);
	fuscia = color(239, 127, 245);
	pink = color(217, 78, 166);

}

function draw() {
	cnv.elt.parentElement.setAttribute('data-screen', screen);
	if(screen == "home"){
		home();
	} else if(screen == "finalCollage"){
		finalCollage();
	}
}

function home(){
	screen = "home";
	
	background(255);
	fill(artboardColor);
	noStroke();
	rect(100, 100, 1100, 700);//artboard
	
	if (savedArtboard){
		image(savedArtboard, 100, 100, 1100, 700);
	}

	noFill();//artboard outline (just outside the artboard, so it isn't saved into the collage)
	stroke(0);
	strokeWeight(1);
	rect(99, 99, 1102, 702);
	noStroke();

	image(bgColor, 1250, 100, 100, 100);//background color
	
	if (mouseX > 1250 && mouseX < 1350 && mouseY > 100 && mouseY < 200){
		fill(0);
		noStroke();
		textFont(FONT);//background color
		textSize(24);
		textStyle(BOLD);
		text('BACKGROUND COLOR', 1370, 160);
	}
	
	image(bgImage,1250, 250, 100, 100)//background images
	
	if (mouseX > 1250 && mouseX < 1350 && mouseY > 250 && mouseY < 350){
		fill(0);
		noStroke();
		textFont(FONT);//background image
		textSize(24);
		textStyle(BOLD);
		text('BACKGROUND IMAGE', 1370, 310);
	}
	
	image(person, 1250, 400, 100, 100);//people
	if (mouseX > 1250 && mouseX < 1350 && mouseY > 400 && mouseY < 500){
		fill(0);
		noStroke();
		textFont(FONT);//people
		textSize(24);
		textStyle(BOLD);
		text('PEOPLE', 1370, 460);
	}
	
	image(objects, 1250, 550, 100, 100);//objects
	if (mouseX > 1250 && mouseX < 1350 && mouseY > 550 && mouseY < 650){
		fill(0);
		noStroke();
		textFont(FONT);//objects
		textSize(24);
		textStyle(BOLD);
		text('OBJECTS', 1370, 610);
	}
	
	image(customText, 1250, 700, 100, 100);//text
	if (mouseX > 1250 && mouseX < 1350 && mouseY > 700 && mouseY < 800){
		fill(0);
		noStroke();
		textFont(FONT);//text
		textSize(24);
		textStyle(BOLD);
		text('CUSTOM TEXT', 1370, 760);
	}

	

	fill(0);
	noStroke();
	textFont(FONT);//title
	textSize(50);
	textStyle(BOLD);
	text('"TITLE"', 100, 80);

	fill(0);//reset
	noStroke();
	textFont(FONT);
	textSize(25);
	textStyle(BOLD);
	text('RESET', 100, 850);

	textAlign(RIGHT);//done
	text('DONE', 1200, 850);
	textAlign(LEFT);
}

function mousePressed(event){
	// only react to clicks on the collage itself (not the menu or links)
	if (!event || event.target !== cnv.elt) return;

	userStartAudio();
	snipSound.play();

	
	if(screen == "home"){

		if (mouseX > 1250 && mouseX < 1350 && mouseY > 100 && mouseY < 200){
			background(255);
			backgroundColor();
		}
		if (mouseX > 1250 && mouseX < 1350 && mouseY > 250 && mouseY < 350){
			background(255);
			backgroundImage();
		}
		if (mouseX > 1250 && mouseX < 1350 && mouseY > 400 && mouseY < 500){
			background(255);
			people();
		}
		if (mouseX > 1250 && mouseX < 1350 && mouseY > 550 && mouseY < 650){
			background(255);
			object();
		}
		if (mouseX > 1250 && mouseX < 1350 && mouseY > 700 && mouseY < 800){
			background(255);
			fill(artboardColor);
			noStroke();
			rect(100, 100, 1100, 700);

			if(savedArtboard){
				image(savedArtboard, 100, 100, 1100, 700);
			}
			
			fill(0);
			textFont(FONT);
			textSize(48);
			textStyle(BOLD);
			
			let t = prompt("TYPE YOUR TEXT:");
			if (t === null) return;
			
			text(t.toUpperCase(), random(200, 900), random(200, 500));
			
			savedArtboard = get(100, 100, 1100, 700);
			home();
		}
		if (mouseX > 100 && mouseX < 210 && mouseY >825 && mouseY < 855){//reset page --> turns white\
			savedArtboard = undefined;
			artboardColor = color(255);
			background(255);
			home();
		}
		if (mouseX > 1125 && mouseX < 1200 && mouseY > 825 && mouseY < 855){
			finalArtboard = get(100, 100, 1100, 700);
			screen = "finalCollage";
		}
	}

	else if(screen == "bgColor"){
		if (mouseX > 100 && mouseX < 350 && mouseY > 150 && mouseY < 400){
			artboardColor = red;
			background(255);
			home();
		}
		if (mouseX > 400 && mouseX < 650 && mouseY > 150 && mouseY < 400){
			artboardColor = orange;
			background(255);
			home();
		}
		if (mouseX > 700 && mouseX < 950 && mouseY > 150 && mouseY < 400){
			artboardColor = yellow;
			background(255);
			home();
		}
		if (mouseX > 1000 && mouseX < 1250 && mouseY > 150 && mouseY < 400){
			artboardColor = green;
			background(255);
			home();
		}
		if (mouseX > 1300 && mouseX < 1550 && mouseY > 150 && mouseY < 400){
			artboardColor = mint;
			background(255);
			home();
		}
		if (mouseX > 1600 && mouseX < 1850 && mouseY > 150 && mouseY < 400){
			artboardColor = teal;
			background(255);
			home();
		}
		if (mouseX > 100 && mouseX < 350 && mouseY > 450 && mouseY < 700){
			artboardColor = babyblue;
			background(255);
			home();
		}
		if (mouseX > 400 && mouseX < 650 && mouseY > 450 && mouseY < 700){
			artboardColor = blue;
			background(255);
			home();
		}
		if (mouseX > 700 && mouseX < 950 && mouseY > 450 && mouseY < 700){
			artboardColor = violet;
			background(255);
			home();
		}
		if (mouseX > 1000 && mouseX < 1250 && mouseY > 450 && mouseY < 700){
			artboardColor = purple;
			background(255);
			home();
		}
		if (mouseX > 1300 && mouseX < 1550 && mouseY > 450 && mouseY < 700){
			artboardColor = fuscia;
			background(255);
			home();
		}
		if (mouseX > 1600 && mouseX < 1850 && mouseY > 450 && mouseY < 700){
			artboardColor = pink;
			background(255);
			home();
		}
	}

	else if(screen == "bgImage"){
		if (mouseX > 100 && mouseX < 509 && mouseY > 150 && mouseY < 456){
			background(255);
			home();
			image(safari, 100, 100, 1100, 700);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 540 && mouseX < 949 && mouseY > 150 && mouseY < 456){
			background(255);
			home();
			image(lake, 100, 100, 1100, 700);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1000 && mouseX < 1409 && mouseY > 150 && mouseY < 456){
			background(255);
			home();
			image(garden, 100, 100, 1100, 700);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1500 && mouseX < 1906 && mouseY > 150 && mouseY < 456){
			background(255);
			home();
			image(gov, 100, 100, 1100, 700);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 100 && mouseX < 506 && mouseY > 650 && mouseY < 838){
			background(255);
			home();
			image(boat, 100, 300, 1100, 509);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 540 && mouseX < 946 && mouseY > 650 && mouseY < 838){
			background(255);
			home();
			image(ocean, 100, 300, 1100, 509);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1040 && mouseX < 1407 && mouseY > 590 && mouseY < 840){
			background(255);
			home();
			image(field, 100, 100, 1100, 700);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1500 && mouseX < 1860 && mouseY > 550 && mouseY < 838){
			background(255);
			home();
			image(balcony, 100, 100, 1100, 700);
			savedArtboard = get(100, 100, 1100, 700);
		}
	}
	else if (screen == "people"){
		if (mouseX > 100 && mouseX < 304 && mouseY> 150 && mouseY < 516){
			background(255);
			home();
			image(climber, random(100, 900), random(100, 500), 204, 366);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 400 && mouseX < 664 && mouseY> 200 && mouseY < 525){
			background(255);
			home();
			image(laundry, random(100,900), random(100, 500), 264, 325);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 750 && mouseX < 954 && mouseY> 150 && mouseY < 515){
			background(255);
			home();
			image(king, random(100,900), random(100, 500), 204, 365);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1050 && mouseX < 1349 && mouseY> 170 && mouseY < 486){
			background(255);
			home();
			image(weds, random(100,900), random(100, 500), 299, 316);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1450 && mouseX < 1739 && mouseY> 150 && mouseY < 500){
			background(255);
			home();
			image(horse, random(100,900), random(100, 500), 289, 350);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 100 && mouseX < 390 && mouseY> 650 && mouseY < 801){
			background(255);
			home();
			image(seal, random(100,900), random(100, 500), 290, 151);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 400 && mouseX < 737 && mouseY> 600 && mouseY < 822){
			background(255);
			home();
			image(skiier, random(100,900), random(100, 500), 337, 222);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 750 && mouseX < 1022 && mouseY> 550 && mouseY < 873){
			background(255);
			home();
			image(sitter, random(100, 900), random(100, 500), 272, 323);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1150 && mouseX < 1416 && mouseY> 500 && mouseY < 782){
			background(255);
			home();
			image(kids, random(100, 900), random(100, 500), 266, 182);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1500 && mouseX < 1778 && mouseY> 500 && mouseY < 890){
			background(255);
			home();
			image(stand, random(100, 900), random(100, 500), 278, 390);
			savedArtboard = get(100, 100, 1100, 700);
		}
	}
	else if(screen == "object"){
		if (mouseX > 100 && mouseX <420 && mouseY > 200 && mouseY < 409){
			background(255);
			home();
			image(tape, random(100, 900), random(100, 500), 160, 104);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 500 && mouseX < 800 && mouseY > 150 && mouseY < 450){
			background(255);
			home();
			image(orangefruit, random(100, 900), random(100, 500), 150, 150);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 800 && mouseX < 1140 && mouseY > 130 && mouseY < 470){
			background(255);
			home();
			image(salt, random(100, 900), random(100, 500), 150, 150);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1150 && mouseX < 1400 && mouseY > 160 && mouseY < 410){
			background(255);
			home();
			image(knife, random(100, 900), random(100, 500), 150, 150);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1500 && mouseX < 1820 && mouseY > 160 && mouseY < 436){
			background(255);
			home();
			image(necklace, random(100, 900), random(100, 500), 160, 138);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 200 && mouseX < 304 && mouseY > 550 && mouseY < 870){
			background(255);
			home();
			image(tulip, random(100, 900), random(100, 500), 52, 160);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 500 && mouseX < 810 && mouseY > 550 && mouseY < 860){
			background(255);
			home();
			image(lipgloss, random(100, 900), random(100, 500), 150, 150);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 800 && mouseX < 1110 && mouseY > 550 && mouseY < 860){
			background(255);
			home();
			image(pencil, random(100, 900), random(100, 500), 150, 150);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1150 && mouseX < 1460 && mouseY > 550 && mouseY < 860){
			background(255);
			home();
			image(mirror, random(100, 900), random(100, 500), 150, 150);
			savedArtboard = get(100, 100, 1100, 700);
		}
		if (mouseX > 1500 && mouseX < 1810 && mouseY > 550 && mouseY < 860){
			background(255);
			home();
			image(usb, random(100, 900), random(100, 500), 150, 150);
			savedArtboard = get(100, 100, 1100, 700);
		}
	}
	else if (screen == "finalCollage"){
		if (mouseX > 1145 && mouseX < 1530 && mouseY > 825 && mouseY < 855){
			background(255);
			home();
		}
		/*if (mouseX > 430 && mouseX < 650 && mouseY > 825 && mouseY < 855){
			generatedTitle = '"' + generateTitle() + '"';
		}
		*/
	}
}
	

function backgroundColor(){
	screen = "bgColor";
	
	fill(0);
	textFont(FONT);
	textSize(50);
	textStyle(BOLD);
	text('BACKGROUND COLOR', 100, 80);

	fill(red);
	stroke(0);
	rect(100, 150, 250, 250);

	fill(orange);
	stroke(0);
	rect(400, 150, 250, 250);	

	fill(yellow);
	stroke(0);
	rect(700, 150, 250, 250);	

	fill(green);
	stroke(0);
	rect(1000, 150, 250, 250);	

	fill(mint);
	stroke(0);
	rect(1300, 150, 250, 250);	

	fill(teal);
	stroke(0);
	rect(1600, 150, 250, 250);	

	fill(babyblue);
	stroke(0);
	rect(100, 450, 250, 250);

	fill(blue);
	stroke(0);
	rect(400, 450, 250, 250);	

	fill(violet);
	stroke(0);
	rect(700, 450, 250, 250);	

	fill(purple);
	stroke(0);
	rect(1000, 450, 250, 250);	

	fill(fuscia);
	stroke(0);
	rect(1300, 450, 250, 250);	

	fill(pink);
	stroke(0);
	rect(1600, 450, 250, 250);	
}

function backgroundImage(){
	screen = "bgImage";
	
	fill(0);
	textFont(FONT);
	textSize(50);
	textStyle(BOLD);
	text('BACKGROUND IMAGE', 100, 80);

	image (safari, 100, 150, 409, 306);
	image (lake, 540, 150, 409, 306);
	image (garden, 1000, 150, 409, 306);
	image (gov, 1500, 150, 406, 306);
	image (boat, 100, 650, 406, 188);
	image (ocean, 540, 650, 406, 188);
	image (field, 1040, 590, 367, 250);
	image (balcony, 1500, 550, 360, 288);
}

function people(){
	screen = "people";
	
	fill(0);
	textFont(FONT);
	textSize(50);
	textStyle(BOLD);
	text('PEOPLE', 100, 80);

	image (climber, 100, 150, 204, 366);
	image (laundry, 400, 200, 264, 325);
	image (king, 750, 150, 204, 365);
	image (weds, 1050, 170, 299, 316);
	image (horse, 1450, 150, 289, 350);
	image (seal, 100, 650, 290, 151);
	image (skiier, 400, 600, 337, 222);
	image (sitter, 750, 550, 272, 323);
	image (kids, 1150, 600, 266, 182);
	image (stand, 1500, 500, 278, 390);
}

function object(){
	screen = "object";
	
	fill(0);
	textFont(FONT);
	textSize(50);
	textStyle(BOLD);
	text('OBJECTS', 100, 80);

	image (tape, 100, 200, 320, 209);
	image (orangefruit, 500, 150, 300, 300);
	image (salt, 800, 130, 340, 340);
	image (knife, 1150, 160, 250, 250);
	image (necklace, 1500, 160, 320, 276);
	image (tulip, 200, 550, 104, 320);
	image (lipgloss, 500, 550, 310, 310);
	image (pencil, 800, 550, 310, 310);
	image (mirror, 1150, 550, 310, 310);
	image (usb, 1500, 550, 310, 310);
}

function finalCollage(){
	
	background(255);
	fill(255);
	rect(430, 110, 1100, 700);

	if (finalArtboard){
		image(finalArtboard, 430, 110, 1100, 700);
	}

	noFill();//artboard outline
	stroke(0);
	strokeWeight(1);
	rect(429, 109, 1102, 702);
	noStroke();

	/*fill(0);
	noStroke();
	rect(430, 825, 220, 30);
	
	fill(255);//generate title
	noStroke();
	textFont(FONT);
	textSize(25);
	textStyle(BOLD);
	text('GENERATE TITLE', 434, 850);
	*/

	fill(0);//home
	noStroke();
	textFont(FONT);
	textSize(25);
	textStyle(BOLD);
	textAlign(RIGHT);
	text('HOME', 1530, 850);
	textAlign(LEFT);

	fill(0);
	textFont(FONT);
	textSize(48);
	textStyle(BOLD);
	text('"TITLE"', 430, 100);
}

function typeText(){
	
	fill(0);
	textFont(FONT);
	textSize(50);
	textStyle(BOLD);
	text('', 100, 80);
}

/*function generateTitle(){
  return RiTa.randomWord({ pos: "nn" }) + " that " + RiTa.randomWord({ pos: "vb" });
}
*/