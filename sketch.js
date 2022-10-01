var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girl_running
var ground, invisibleGround, groundImage;
var restart,restartImg;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;

var gameOver, restart;


function preload(){
 
  backgroundImg = loadImage("mountains.jpg")
  
  girl_running = loadAnimation("girlrun_0.png","girlrun_1.png","girlrun_2.png","girlrun_3.png","girlrun_4.png","girlrun_5.png","girlrun_6.png","girlrun_7.png");
  
  groundImage = loadImage("ground.png");

  game = loadImage("game over.png");

  restartImg=loadImage("restart.png");

  
  obstacle1 = loadImage("woodcutterknife.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  girl = createSprite(100,height-150,20,50);
  
  
  girl.addAnimation("running", girl_running);
  girl.setCollider('circle',0,0,100);
  girl.scale = 0.6;
  

  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  ground = createSprite(width/2,height-50,width*2,2)
  ground.addImage("ground",groundImage);
  ground.x=width/2;
  ground.scale=1.2
  ground.velocityX = -(6 + 3*score/100);

  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(game);
  restart = createSprite(width/2,height/2+100);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.8;
  restart.scale=0.5;


  gameOver.visible = false;
  restart.visible=false;
  
  
 
  // invisibleGround.visible =false

 

  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {

  background(backgroundImg);
  textSize(20);
  fill("black");
  
  text("Score: "+ score,30,50);
  
  drawSprites()
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(6 + 3*score/100);
    
    if(touches.length > 0 || keyDown("space") && girl.y  >= height-300) {
      girl.velocityY = -10;
       touches = [];
    }
    
    girl.velocityY = girl.velocityY + 0.8
  
    if (ground.x < 600){
      ground.x = ground.width/2;
    }
  
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(girl)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    girl.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(touches.length>0 || keyDown("space") || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  }
  
  girl.collide(ground);
  drawSprites();
}



function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(width,height-195,20,30);
   // obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      default: obstacle.addImage(obstacle1);
      break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstacle.depth = girl.depth;
    girl.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  
  //obstaclesGroup.destroyEach();

  
  girl.changeAnimation("running");
  
  score = 0;
  
}
