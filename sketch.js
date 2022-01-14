// Hopguy
// Logan Weckert
// 1/11/2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let snowflakes = []; 
let player, testwall, testwall2, snow, jumpRightimg, jumpLeftImg, walkLeftImg, walkRightImg, standImg, level1;
let wallArray, wallArray0;

function preload(){
  jumpRightimg = loadImage("assets/jumpright.png");
  jumpLeftImg = loadImage("assets/jumpleft.png");
  walkLeftImg = loadImage("assets/walkleft.png");
  walkRightImg = loadImage("assets/walkright.png");
  standImg = loadImage("assets/standingstill.png");
  level1 = loadJSON("assets/level1.json");
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  //sets snow to false
  snow = false;
  
  wallArray0 = level1;
  wallArray = [];
  for(let protowall in wallArray0){
    let testwall = new Wall(wallArray0[protowall].x, wallArray0[protowall].y);
    wallArray.push(testwall);
  }
  //makes a player
  fill(240);
  noStroke();
  player = new Player(width/2, height/2, 10, 12, 30, standImg);
  //creates a random set of platforms
  frameRate(60);
}

function draw() {
  background("brown");
  //displays and sets collisions for platforms 
  // for(let testwall in wallArray){
  //   testwall.display();
  //   testwall.collision(player);
  // }
  
  
  

  //displays player, allows movement, and sets gravity
  player.display();
  player.movement();
  player.gravity();

  
  //allows snow to be created when h is pressed
  let t = frameCount / 30; 
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

function keyPressed() {
  player.handleKeys();
}

function keyReleased(){
  player.handleKeys2();
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
  constructor(x, y, dx, dy, radius, thisImage){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.jumplength = 0;
    this.direction = -1;
    this.timesJumped = 0;
    this.jumping = false;
    this.sprite = thisImage;
  }

  display(){
    noStroke();
    noFill();
    circle(this.x, this.y, this.radius);
    image(this.sprite, this.x-this.radius/2, this.y-this.radius/2, this.radius, this.radius);
  }

  handleKeys(){
    if(keyCode === UP_ARROW){
      this.jumplength = 15;
      this.direction = -1;
      if(this.timesJumped === 0){
        this.jumping = true;
      }
    }
  }

  handleKeys2(){
    if(keyCode === UP_ARROW){
      this.timesJumped++;
      this.jumping = false;
    }
  }

  movement(){
    //left movement
    if(keyIsDown(LEFT_ARROW)){
      this.x -= 10;
    }
    //right movement
    if(keyIsDown(RIGHT_ARROW)){
      this.x += 10;
    }
    //right jump
    if(keyIsDown(UP_ARROW) && keyIsDown(RIGHT_ARROW)){
      if(this.timesJumped === 0){
        
        console.log(this.timesJumped);
        this.x += 1;
        this.y += 1 * this.jumplength * this.direction;
        if(this.jumplength < 0 && this.direction < 0){
          this.direction = 1;
        }
        if(this.direction > 0){
          this.jumplength += 1;
        }
        else{
          this.jumplength -= 1;
        }
      }
    }
    //left jump
    if(keyIsDown(UP_ARROW) && keyIsDown(LEFT_ARROW)){
      if(this.timesJumped === 0){
        
        console.log(this.timesJumped);
        this.x -= 1;
        this.y += 1 * this.jumplength * this.direction;
        if(this.jumplength < 0 && this.direction < 0){
          this.direction = 1;
        }
        if(this.direction > 0){
          this.jumplength += 1;
        }
        else{
          this.jumplength -= 1;
        }
      }
    }
    //upwards jump
    if(keyIsDown(UP_ARROW) && !keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)){
      if(this.timesJumped === 0){
        
        console.log(this.timesJumped);
        this.y += 1 * this.jumplength * this.direction;
        if(this.jumplength < 0 && this.direction < 0){
          this.direction = 1;
        }
        if(this.direction > 0){
          this.jumplength += 1;
        }
        else{
          this.jumplength -= 1;
        }
      }
    }
    //snow effect NEED TO REMOVE
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
      this.y += 7;
    }
  }
}

//wall/platform creation and behaviour
class Wall{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.l = 100;
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
        player.timesJumped = 0;
        //console.log("Left");
      }
      else if (player.x > this.x && player.x <= this.x + this.w + player.radius/2 && player.y >= this.y && player.y <= this.y + this.l){
        player.x = this.x + player.radius/2 + this.w;
        player.timesJumped = 0;
        //console.log("Right");
      }
      if (player.y > this.y && player.y <= this.y + this.l + player.radius/2 && player.x > this.x && player.x < this.x + this.w){
        player.y = this.y + player.radius/2 + this.l;
        //console.log("Bottom");
      }
      else if (player.y < this.y && player.y + player.radius/2 >= this.y && player.x > this.x && player.x < this.x + this.w){
        player.y = this.y - player.radius/2;
        player.timesJumped = 0;
        //console.log("Top");
      }
    }
  }
}