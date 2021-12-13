// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let snowflakes = []; 
let player, testwall, snow;
let wallArray = [];

function setup() {
  createCanvas(windowHeight, windowHeight);
  //sets snow to false
  snow = false;
  //makes a player
  fill(240);
  noStroke();
  player = new Player(width/2, height/2, 5, 5, 20);
  //creates a random set of platforms
  for(let i = 0; i < windowHeight/100; i++){
    let x = random(0, windowHeight-100);
    let y = i*100 +100;
    testwall = new Wall(x, y);
    wallArray.push(testwall);
  }
}

function draw() {
  background("brown");
  //displays and sets collisions for platforms 
  for(let testwall of  wallArray){
    testwall.display();
    testwall.collision(player);
  }
  

  //displays player, allows movement, and sets gravity
  player.display();
  player.movement();
  if(!player.jumping){
    player.gravity();
  }
  
  //allows snow to be created when h is pressed
  let t = frameCount / 60; 
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

//snowflake creation and behaviour
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

//player creation and behaviour
class Player{
  constructor(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.jumping = false;
    this.jumpheight = 0;
  }

  display(){
    noStroke();
    fill("green");
    circle(this.x, this.y, this.radius);
  }

  keyPressed(){
    if(key === UP_ARROW){
      this.jumpheight = this.y;
    }
  }

  movement(){
    if(keyIsDown(LEFT_ARROW)){
      this.x -= 10;
    }
    if(keyIsDown(RIGHT_ARROW)){
      this.x += 10;
    }
    if(keyIsDown(UP_ARROW)){
      this.jumping = true;
      if(this.jumping){
        this.y -= this.dy;
        if(this.jumpheight + 10 <= this.y){
          this.jumping = !this.jumping;
          console.log("aaaaaaa");
        }
      }
      
    }
    if(keyIsDown(72)){
      snow = true;
    }
    else{
      snow = false;
    }
    //ball border for right
    if (this.x >width - this.radius){
      this.x = width - this.radius;
    }
    
    //ball border for left
    if (this.x < 0 + this.radius){
      this.x = 0 + this.radius;
    }
    
    //ball border for botttom
    if (this.y > height - this.radius){
      this.y = height - this.radius;
    }
  
    //ball border for top
    if (this.y < 0 + this.radius){
      this.y = 0 + this.radius;
    }
    
  }
  gravity(){
    if(!this.jumping){
      this.y += 9.9999999999999;
    }
    
  }
    
}


//wall/platform creation and behaviour
class Wall{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.l = 20;
    this.w = 100;
    this.wallColor = "black";
    this.hit = collideRectCircle(this.x, this.y, this.w, this.l, player.x, player.y, player.radius);
  }
  display(){
    fill(this.wallColor);
    rect(this.x, this.y, this.w, this.l);
  }
  collision(player){
    this.hit = collideRectCircle(this.x, this.y, this.w, this.l, player.x, player.y, player.radius);
    if(this.hit){
      if (player.x <= this.x && player.x >= this.x - player.radius/2  && player.y >= this.y && player.y <= this.y + this.l){
        player.x = this.x - player.radius/2;
        console.log("Left");
      }
      else if (player.x > this.x && player.x <= this.x + this.w + player.radius/2 && player.y >= this.y && player.y <= this.y + this.l){
        player.x = this.x + player.radius/2 + this.w;
        console.log("Right");
      }
      if (player.y > this.y && player.y <= this.y + this.l + player.radius/2 && player.x > this.x && player.x < this.x + this.w){
        player.y = this.y + player.radius/2 + this.l;
        console.log("Bottom");
      }
      else if (player.y < this.y && player.y + player.radius/2 >= this.y && player.x > this.x && player.x < this.x + this.w){
        player.y = this.y - player.radius/2;
        console.log("Top");
      }
    }
  }
}