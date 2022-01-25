// Hopguy
// Logan Weckert
// 1/11/2022
//
// Extra for Experts:



let snowflakes = []; 
let player, testwall, testwall2, snow, jumpRightImg, jumpLeftImg, walkLeftImg, walkRightImg, standImg, level1, level2, level3, level4, level5, level5b, level6, level7, level8, level9, level10, level11, level12, level13, level14, level15, level16, level17, level18, level19, level20, level21, level22, level23, wallArray, wallArray0;


function preload(){
  jumpRightImg = loadImage("assets/jumpright.png");
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
  level8 = loadJSON("assets/level8.json");
  level9 = loadJSON("assets/level9.json");
  level10 = loadJSON("assets/level10.json");
  level11 = loadJSON("assets/level11.json");
  level12 = loadJSON("assets/level12.json");
  level13 = loadJSON("assets/level13.json");
  level14 = loadJSON("assets/level14.json");
  level15 = loadJSON("assets/level15.json");
  level16 = loadJSON("assets/level16.json");
  level17 = loadJSON("assets/level17.json");
  level18 = loadJSON("assets/level18.json");
  level19 = loadJSON("assets/level19.json");
  level20 = loadJSON("assets/level20.json");
  level21 = loadJSON("assets/level21.json");
  level22 = loadJSON("assets/level22.json");
  level23 = loadJSON("assets/level23.json");
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
  background("red");
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
    this.climbing = false;
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
    this.sprite = standImg;
  }

  movement(){
    //left movement
    if(keyIsDown(LEFT_ARROW)){
      this.x -= 7.5;
      this.sprite = walkLeftImg;
    }
    //right movement
    if(keyIsDown(RIGHT_ARROW)){
      this.x += 7.5;
      this.sprite = walkRightImg;
    }
    //right jump
    if(keyIsDown(UP_ARROW) && keyIsDown(RIGHT_ARROW)){
      this.sprite = jumpRightImg;
      if(this.timesJumped === 0 && !this.timesJumped >= 1){
        this.x += 1;
        this.y += 0.7 * this.jumplength * this.direction;
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
      this.sprite = jumpLeftImg;
      if(this.timesJumped === 0){
        this.x -= 1;
        this.y += 0.7 * this.jumplength * this.direction;
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
      if(!this.climbing){
        if(this.timesJumped === 0){
          this.y += 0.7 * this.jumplength * this.direction;
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
    }
    //ball border for right
    if (this.x > width - this.radius){
      wallArray = [];
      if(wallArray0 === level1){
        wallArray0 = level2;
      }
      else if (wallArray0 === level5){
        wallArray0 = level4;
      }
      else if(wallArray0 === level7){
        wallArray0 = level1;
      }
      else if(wallArray0 === level2){
        wallArray0 = level8;
      }
      else if(wallArray0 === level10){
        wallArray0 = level11;
      }
      else if(wallArray0 === level15){
        wallArray0 = level14;
      }
      else if(wallArray0 === level16){
        wallArray0 = level15;
      }
      else if(wallArray0 === level17){
        wallArray0 = level16;
      }
      else if(wallArray0 === level18){
        wallArray0 = level17;
      }
      else if(wallArray0 === level20){
        wallArray0 = level19;
      }
      else if(wallArray0 === level21){
        wallArray0 = level20;
      }
      else if(wallArray0 === level22){
        wallArray0 = level21;
      }
      else if(wallArray0 === level23){
        wallArray0 = level22;
      }
      this.x = 0 + this.radius;
    }
    //ball border for left
    if (this.x < 0 + this.radius/2){
      wallArray = [];
      if(wallArray0 === level2){
        wallArray0 = level1;
      }
      else if(wallArray0 === level4){
        wallArray0 = level5;
      }
      else if(wallArray0 === level1){
        wallArray0 = level7;
      }
      else if(wallArray0 === level8){
        wallArray0 = level2;
      }
      else if(wallArray0 === level11){
        wallArray0 = level10;
      }
      else if(wallArray0 === level14){
        wallArray0 = level15;
      }
      else if(wallArray0 === level15){
        wallArray0 = level16;
      }
      else if(wallArray0 === level16){
        wallArray0 = level17;
      }
      else if(wallArray0 === level17){
        wallArray0 = level18;
      }
      else if(wallArray0 === level19){
        wallArray0 = level20;
      }
      else if(wallArray0 === level20){
        wallArray0 = level21;
      }
      else if(wallArray0 === level21){
        wallArray0 = level22;
      }
      else if(wallArray0 === level22){
        wallArray0 = level23;
      }
      this.x = 800 - this.radius;
    }
    //ball border for bottom
    if (this.y > height - this.radius){
      wallArray = [];
      if(wallArray0 === level2){
        wallArray0 = level3;
      }
      else if(wallArray0 === level3){
        wallArray0 = level4;
      }
      else if(wallArray0 === level6){
        wallArray0 = level5;
      }
      else if(wallArray0 === level1){
        wallArray0 = level6;
      }
      else if(wallArray0 === level5){
        wallArray0 = level5b;
      }
      else if(wallArray0 === level1){
        wallArray0 = level6;
      }
      else if(wallArray0 === level8){
        wallArray0 = level9;
      }
      else if(wallArray0 === level9){
        wallArray0 = level10;
      }
      else if(wallArray0 === level12){
        wallArray0 = level11;
      }
      else if(wallArray0 === level13){
        wallArray0 = level12;
      }
      else if(wallArray0 === level14){
        wallArray0 = level13;
      }
      this.y = 0 + this.radius;
      if(wallArray0 === level7){
        this.x = 750;
        this.y = 675;
      }
      
    }
    //ball border for top
    if (this.y < 0 + this.radius){
      wallArray=[];
      if(wallArray0 === level3){
        wallArray0 = level2;
      }
      else if(wallArray0 === level4){
        wallArray0 = level3;
      }
      else if(wallArray0 === level5){
        wallArray0 = level6;
      }
      else if (wallArray0 === level6){
        wallArray0 = level1;
      }
      else if(wallArray0 === level5b){
        wallArray0 = level5;
      }
      else if(wallArray0 === level9){
        wallArray0 = level8;
      }
      else if(wallArray0 === level10){
        wallArray0 = level9;
      }
      else if(wallArray0 === level11){
        wallArray0 = level12;
      }
      else if(wallArray0 === level12){
        wallArray0 = level13;
      }
      else if(wallArray0 === level13){
        wallArray0 = level14;B
      }
      this.y = 800 - this.radius;
    } 
  }
  gravity(){
    if(!this.jumping && !this.climbing){
      this.y += 8;
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
        if(keyIsDown(UP_ARROW) && player.direction > 0){
          player.timesJumped = 1;
          player.jumping = false;
        }
        else{
          player.timesJumped = 0;
        }
      }
      else if (player.x > this.x && player.x <= this.x + this.w + player.radius/2 && player.y >= this.y && player.y <= this.y + this.l){
        player.x = this.x + player.radius/2 + this.w;
        player.climbing = true;
      if(keyIsDown(UP_ARROW) && player.direction > 0 && keyIsDown(RIGHT_ARROW)){
          player.timesJumped = 1;
          player.jumping = false;
        }
        else if(keyIsDown(UP_ARROW) && !keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)){
          player.x++;
          
        }
        else{
          player.timesJumped = 0;
        }
      }

      if (player.y > this.y && player.y <= this.y + this.l + player.radius/2 && player.x > this.x && player.x < this.x + this.w){
        player.y = this.y + player.radius/2 + this.l;
      }
      else if (player.y < this.y && player.y + player.radius/2 >= this.y && player.x > this.x && player.x < this.x + this.w){
        player.y = this.y - player.radius/2;
        if(keyIsDown(UP_ARROW) && player.direction > 0){
          player.timesJumped = 1;
          player.jumping = false;
        }
        else{
          player.timesJumped = 0;
        }
      }
    }
  }
}

class Obstacle{
  constructor(x, y, l, w){
    this.x = x;
    this.y = y;
    this.l = l;
    this.w = w;
    this.obstColor = "yellow";
    this.hit = collideRectCircle(this.x, this.y, this.w, this.l, player.x, player.y, player.radius);
  }
  display(){
    fill(this.obstColor);
    rect(this.x, this.y, this.w, this.l);
  }
  collision(player){
    this.hit = collideRectCircle(this.x, this.y, this.w, this.l, player.x, player.y, player.radius);
    if(this.hit){
      if (player.x <= this.x && player.x >= this.x - player.radius/2  && player.y >= this.y && player.y <= this.y + this.l){
        if(wallArray0 === level12){
          player.x = 50;
          player.y = 675;
        }
        else if(wallArray0 === level13){
          player.x = 400;
          player.y = 750;
        }
        else if(wallArray0 === level14){
          player.x = 600;
          player.y = 750;
        }
        else if(wallArray0 === level16){
          player.x = 300;
          player.y = 50;
        }
        else if(wallArray0 === level17){
          player.x = 400;
          player.y = 750;
        }
      }
      else if (player.x > this.x && player.x <= this.x + this.w + player.radius/2 && player.y >= this.y && player.y <= this.y + this.l){
        if(wallArray0 === level12){
          player.x = 50;
          player.y = 675;
        }
        else if(wallArray0 === level13){
          player.x = 400;
          player.y = 750;
        }
        else if(wallArray0 === level14){
          player.x = 600;
          player.y = 750;
        }
        else if(wallArray0 === level16){
          player.x = 300;
          player.y = 50;
        }
        else if(wallArray0 === level17){
          player.x = 400;
          player.y = 750;
        }
      }
      if (player.y > this.y && player.y <= this.y + this.l + player.radius/2 && player.x > this.x && player.x < this.x + this.w){
        if(wallArray0 === level12){
          player.x = 50;
          player.y = 675;
        }
        else if(wallArray0 === level13){
          player.x = 400;
          player.y = 750;
        }
        else if(wallArray0 === level14){
          player.x = 600;
          player.y = 750;
        }
        else if(wallArray0 === level16){
          player.x = 300;
          player.y = 50;
        }
        else if(wallArray0 === level17){
          player.x = 400;
          player.y = 750;
        }

      }
      else if (player.y < this.y && player.y + player.radius/2 >= this.y && player.x > this.x && player.x < this.x + this.w){
        if(wallArray0 === level12){
          player.x = 50;
          player.y = 675;
        }
        else if(wallArray0 === level13){
          player.x = 400;
          player.y = 750;
        }
        else if(wallArray0 === level14){
          player.x = 600;
          player.y = 750;
        }
        else if(wallArray0 === level16){
          player.x = 300;
          player.y = 50;
        }
        else if(wallArray0 === level17){
          player.x = 400;
          player.y = 750;
        }
      }
    }
  }
}