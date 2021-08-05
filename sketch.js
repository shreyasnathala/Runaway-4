var Bob,Bobimg
var bgimg
var life, lifeImg
var l=3
var Enemy,Enemyimg
var enemyGroup,lifeGroup
function preload() {
  bgimg=loadImage("images/Game Background.jpg")
  Bobimg=loadImage("images/Bob.png")
  lifeImg=loadImage("images/Live.png")
  Enemyimg=loadImage("images/enemy.png")
}

function setup(){
createCanvas(1000,800)

bg=createSprite(500,400,1200,800);
bg.addImage("bg",bgimg)
bg.scale=3.5
bg.velocityX=-3-l/5
Bob=createSprite(100,700,10,10);
Bob.addImage("Bob",Bobimg)

ground=createSprite(500,780,1000,3);
ground.visible=false;

lifeGroup=new Group();
enemyGroup=new Group();
}

function draw() {
  background(bgimg)

  if(bg.x<0) {
  bg.x=bg.width/6
  }
  edges=createEdgeSprites()
  Bob.bounceOff(edges)
  if(keyDown("space")) {
    Bob.velocityY=-10
  }
  Bob.velocityY+=0.5

  if(Bob.isTouching(enemyGroup))
  {
    l-=1;
    enemyGroup[0].destroy()
  }
  if(Bob.isTouching(lifeGroup)) {
    l+=1;
    lifeGroup[0].destroy();
  }
  


  spawnObstacles()
  spawnlife()
Bob.collide(ground)
  drawSprites();
  textSize(40);
  stroke("white");
  fill("black");
  text("LIFE: "+l,70,100)
  if(l===0) {
    Bob.velocityY=0
    bg.velocityX=0
    enemyGroup.destroyEach()
    lifeGroup.destroyEach();
    Bob.destroy()
    enemyGroup.setVelocityXEach()
    lifeGroup.setVelocityXEach()
    textSize(50);
    strokeWeight(3);
    stroke ("blue");
    fill("red")
    text("Game Over",500,400)
  };
  
}

function spawnlife() {
  if (frameCount%180===0){
    life=createSprite(900,random(100,500),10,10);
    life.addImage("life",lifeImg);
    life.velocityX=-3-l/7
    lifeGroup.add(life)
    life.scale=0.2
  }
}

function spawnObstacles () {
  if (frameCount%300===0) {
    Enemy=createSprite(random(100,900),random(100,700),10,10);
Enemy.addImage("Img",Enemyimg)
Enemy.velocityX=-4-l/8
Enemy.scale=0.3
enemyGroup.add(Enemy)
  }
}