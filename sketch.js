// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let snowflakes = []; 
let snow = false;
let player;

function setup() {
  createCanvas(windowHeight, windowHeight);
  fill(240);
  noStroke();
  player = new Player(width/2, height/2, 5, 5, 20);
}

function draw() {
  background("brown");
  let t = frameCount / 60; 

  player.display();
  player.movement();
  player.gravity();
  if(snow){
    for (let i = 0; i < random(5); i++) {
      snowflakes.push(new snowflake()); 
    }

    
  }
  for (let flake of snowflakes) {
    flake.update(t); 
    flake.display(); 
  }
}


function snowflake() {

  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    let w = 0.6;
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    this.posY += pow(this.size, 0.5);

    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    fill(255);
    ellipse(this.posX, this.posY, this.size);
  };
}

class Player{
  constructor(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  display(){
    noStroke();
    fill("green");
    circle(this.x, this.y, this.radius);
  }

  movement(){
    if(keyIsDown(LEFT_ARROW)){
      this.x -= this.dx;
    }
    if(keyIsDown(RIGHT_ARROW)){
      this.x += this.dx;
    }
    if(keyIsDown(UP_ARROW)){
      this.y -= this.dy;
    }
    if(keyIsDown(72)){
      snow = true;
    }
    else{
      snow = false;
    }

    if (this.x > width - this.radius ){
      this.x = width - this.radius;
      this.dx = -this.dx*0.5;
    }
    
    //ball border for left
    if (this.x < 0 + this.radius){
      this.x = 0 + this.radius;
      this.dx = -this.dx*0.5;
    }
    
    //ball border for botttom
    if (this.y > height - this.radius){
      this.y = height - this.radius;
      this.dy = -this.dy*0.1;
       
    }
  
    //ball border for top
    if (this.y < 0 + this.radius){
      this.y = 0 + this.radius;
      this.dy = -this.dy*0.7;
    }
  }
  gravity(){
    this.y += 1;
  }
}

class Wall{
  
}