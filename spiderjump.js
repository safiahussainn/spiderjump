var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// create variable to store images into
var background = new Image();
var spiderman = new Image()
var buildingTop = new Image();
var buildingBottom = new Image();

//load images into variables
spiderman.src = "images/spiderman.png";
background.src = "images/background.jpg";
buildingTop.src = "images/buildingTop.png";
buildingBottom.src = "images/buildingBottom.png";

// create variable to store sound into
var fly = new Audio();
var score = new Audio();
var hit = new Audio();

//load sound into variables
fly.src = "sounds/swoosh.mp3";
score.src = "sounds/point.mp3";
hit.src = "sounds/hit.mp3";

//sets the location of the spidermanX and y location

var spidermanX = 20;

var spidermanY = 150;

var gap = 90;

var distanceBuilding;

// setting gravity to allow spiderman to fall

var gravity = 1.5;

// setting score to 0 and will be incremented by 1 everytime player gets through building gap

var score = 0;

// creation function for pressing the spacebar to allow soiderman to move up

document.addEventListener("keypress",moveUp);

function moveUp(){
	spidermanY -= 25;
	fly.play();
}

// creating an array for building

var building = [];
building[0] = {
	x : canvas.width,
	y : 0
};

// creating function which will allow the buildings to consecutively move to the left
// side of the screen with randomised Y values to create differnet heights

function draw(){
	context.drawImage(background,0,0);
	for(var i = 0; i < building.length; i++){
		distanceBuilding = buildingTop.height+gap;
		context.drawImage(buildingTop,building[i].x,building[i].y);
		context.drawImage(buildingBottom,building[i].x,building[i].y+distanceBuilding);
		building[i].x--;
		if( building[i].x == 125 ){
			building.push({
				x : canvas.width,
				y: Math.floor(Math.random()*buildingTop.height)-buildingTop.height
			});
		}
		context.drawImage(spiderman,spidermanX,spidermanY);
		
		// if statment to create the collision when the player otuches the buildings
		
	if( spidermanX + spiderman.width/2 >= building[i].x && spidermanX <= building[i].x + buildingTop.width && (spidermanY <= building[i].y + buildingTop.height || spidermanY+spiderman.height/2 >= building[i].y+distanceBuilding)
           || spidermanY + spiderman.height/2 >=  canvas.height){
          hit.play();
          console.log("hit");
          context.fillStyle = "white";
          context.font = "45px Arial";
          alert("Game over");
          clearInterval(game);
        }
        if(building[i].x == 5){
            score++;
            scorePoint.play();
        }
    }

	 // appplying the gravity to spiderman
	   spidermanY += gravity;
	   
	   // score displayed at the bottom left of the screen
	   
	   context.fillStyle = "black";
	   context.font = "20px Arial";
	   context.fillText("Score : "+score,10,canvas.height);
	   
	   
}


let game = setInterval(draw,15);
