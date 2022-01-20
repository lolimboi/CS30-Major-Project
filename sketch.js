// Hopguy
// Logan Weckert
// 1/11/2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let snowflakes = []; 
let player, testwall, testwall2, snow, jumpRightimg, jumpLeftImg, walkLeftImg, walkRightImg, standImg, level1, level2, level3, level4, level5, level5b, level6, level7, level8, level9, level10, level11, level12, level13, level14, level15, level16, level17, level18, level19, level20, level21, level22, level23, level24;
let wallArray, wallArray0;

function preload(){
  jumpRightimg = loadImage("assets/jumpright.png");
  jumpLeftImg = loadImage("assets/jumpleft.png");
  walkLeftImg = loadImage("assets/walkleft.png");
  walkRightImg = loadImage("assets/walkright.png");
  standImg = loadImage("assets/standingstill.png");
  level1 = loadJSON("assets/level1.json");
  level2 = loadJSON("assets/level2.json");
  level3 = loadJSON("assets/level3.json");
  level4 = loadJSON("assets/level4.json");
  level5 = loadJSON("assets/level5.json");
  level5b = loadJSON("assets/level5b.json");
  level6 = loadJSON("assets/level6.json");
  level7 = loadJSON("assets/level7.json");
  level8 = loadJSON("assets/level7.json");
  level9 = loadJSON("assets/level7.json");
  level10 = loadJSON("assets/level7.json");
  level11 = loadJSON("assets/level7.json");
  level12 = loadJSON("assets/level7.json");
  level13 = loadJSON("assets/level7.json");
  level14 = loadJSON("assets/level7.json");
  level15 = loadJSON("assets/level7.json");
  level16 = loadJSON("assets/level7.json");
  level17 = loadJSON("assets/level7.json");
  level18 = loadJSON("assets/level7.json");
  level19 = loadJSON("assets/level7.json");
  level20 = loadJSON("assets/level7.json");
  level21 = loadJSON("assets/level7.json");
  level22 = loadJSON("assets/level7.json");
  level23 = loadJSON("assets/level7.json");
  level24 = loadJSON("assets/level7.json");
}

function setup() {
  createCanvas(800, 800);
  //sets snow to false
  snow = false;
  //makes a player
  fill(240);
  noStroke();
  player = new Player(width/2, height/2, 10, 12, 30, standImg);
  
  wallArray0 = level1;
  wallArray = [];
  
  
  
 
  frameRate(48);
}

function draw() {
  background("brown");
  //displays and sets collisions for platforms 
  for(let protowall in wallArray0){
    let testwall = new Wall(wallArray0[protowall].x, wallArray0[protowall].y, wallArray0[protowall].l, wallArray0[protowall].w);
    wallArray.push(testwall);
  }
  for(let testwall of wallArray){
    testwall.display();
    testwall.collision(player);
  }
  
  
  

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
    if (this.x > width - this.radius){
      wallArray = [];
      if(wallArray0 === level1){
        wallArray0 = level2;
        console.log("level 2");
      }
      else if (wallArray0 === level5){
        wallArray0 = level4;
        console.log("level 4");
      }
      else if(wallArray0 === level7){
        wallArray0 = level1;
        console.log("level 1");
      }
      this.x = 0 + this.radius;
    }
    //ball border for left
    if (this.x < 0 + this.radius){
      wallArray = [];
      if(wallArray0 === level2){
        wallArray0 = level1;
        console.log("level 1");
      }
      else if(wallArray0 === level4){
        wallArray0 = level5;
        console.log("level 5");
      }
      else if(wallArray0 === level1){
        wallArray0 = level7;
        console.log("level 7");
      }
      this.x = 800 - this.radius;
    }
    //ball border for bottom
    if (this.y > height - this.radius){
      wallArray = [];
      if(wallArray0 === level2){
        wallArray0 = level3;
        console.log("level 3");
      }
      else if(wallArray0 === level3){
        wallArray0 = level4;
        console.log("level 4");
      }
      else if(wallArray0 === level6){
        wallArray0 = level5;
        console.log("level 5");
      }
      else if(wallArray0 === level1){
        wallArray0 = level6;
        console.log("level 6");
      }
      else if(wallArray0 === level5){
        wallArray0 = level5b;
        console.log("level 5b");
      }
      this.y = 0 + this.radius;
    }
    //ball border for top
    if (this.y < 0 + this.radius){
      wallArray=[];
      if(wallArray0 === level3){
        wallArray0 = level2;
        console.log("level 2");
      }
      else if(wallArray0 === level4){
        wallArray0 = level3;
        console.log("level 3");
      }
      else if(wallArray0 === level5){
        wallArray0 = level6;
        console.log("level 6");
      }
      else if (wallArray0 === level6){
        wallArray0 = level1;
        console.log("level 1");
      }
      else if(wallArray0 === level5b){
        wallArray0 = level5;
        console.log("level 5");
      }
      this.y = 800 - this.radius;
    } 
  }
  gravity(){
    if(!this.jumping){
      this.y += 9;
    }
  }
}

//wall/platform creation and behaviour
class Wall{
  constructor(x, y, l, w){
    this.x = x;
    this.y = y;
    this.l = l;
    this.w = w;
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