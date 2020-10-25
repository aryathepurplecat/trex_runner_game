// adding var's
var trex,trex_running,ground,ground_image,invground
var clouds,cloud_image 
var obstacle,obs_image1,obs_image2,obs_image3,obs_image4,obs_image5,obs_image6
var cloud_group,obstacle_group
var gamestate = "play"
var gameOver,gameOver_image,restart,restart_image
var trex_collided
var count=0

function preload () {
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  ground_image = loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  obs_image1 = loadImage("obstacle1.png")
  obs_image2 = loadImage("obstacle2.png")
  obs_image3 = loadImage("obstacle3.png")
  obs_image4 = loadImage("obstacle4.png")
  obs_image5 = loadImage("obstacle5.png")
  obs_image6 = loadImage("obstacle6.png")
  gameOver_image = loadAnimation("gameOver.png")
  restart_image = loadAnimation("restart.png")
  trex_collided = loadAnimation("trex_collided.png");
}


function setup() {
  createCanvas(600,200);
  trex = createSprite(200,180,20,50);
  trex.x = 50
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5
  ground = createSprite(200,185,800,15);
  ground.addImage(ground_image)
  ground.x = ground.width/2
  invground = createSprite(300,192,600,5)
  invground.visible = false;
  cloud_group = new Group();
  obstacle_group = new Group();
  //place gameOver and restart icon on the screen
  gameOver = createSprite(300,100);
  restart = createSprite(300,150);
  
  gameOver.addAnimation("gameOver",gameOver_image);
  gameOver.scale = 0.5;
  
  restart.addAnimation("restart",restart_image);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
}

function draw() {
  background(180);
  text("Score: "+count,500,50)
  
  trex.collide(invground);
  if(gamestate === "play") {
    
    count= count+Math.round(getFrameRate()/60)
        //jump when the space key is pressed
    if((keyDown("space") || keyDown("up")) && trex.y >= 155){
      trex.velocityY = -12 ;
    }

    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
  
  ground.velocityX = -6
  
  //resetting ground
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //calling clouds
  spawnClouds();
  spawnObstacles();
    
  if(obstacle_group.isTouching(trex)) {
    gamestate = "end"
  }
  
  } 
  else if(gamestate === "end") {
          gameOver.visible = true;
    restart.visible = true;
    
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacle_group.setVelocityXEach(0);
    cloud_group.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacle_group.setLifetimeEach(-1);
    cloud_group.setLifetimeEach(-1);
    
        //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
     if(mousePressedOver(restart)) {
    reset();
  }
    }
  
  drawSprites();
}

function spawnClouds() {
  if(frameCount % 60 === 0) {
    clouds = createSprite(650,100,20,20);
    clouds.y = Math.round(random(50,120));
    console.log(clouds.y);
    clouds.velocityX = -6
    clouds.addImage(cloud_image);
    clouds.scale = 0.6
    clouds.lifetime = 200;
    clouds.depth = trex.depth;
    trex.depth = trex.depth + 1 
    
    cloud_group.add(clouds);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    obstacles = createSprite(650,170,10,10);
    obstacles.velocityX = -6;
    obstacles.scale = 0.5;
    obstacles.lifetime = 170 
    
    
    obstacle_group.add(obstacles)
    
    var r = Math.round(random(1,6));
    switch(r)  {
      case 1:obstacles.addImage(obs_image1)
              break;
      case 2:obstacles.addImage(obs_image2)
              break;
      case 3:obstacles.addImage(obs_image3)
              break;
      case 4:obstacles.addImage(obs_image4)
              break;
      case 5:obstacles.addImage(obs_image5)
              break;
      case 6:obstacles.addImage(obs_image6)
              break;
      default:break;
      
      
    }
  }
  
}

function reset(){
  count = 0;
  gamestate = "play";
  gameOver.visible = false;
  restart.visible = false;
  obstacle_group.destroyEach();
  trex.changeAnimation("running",trex_running);
  cloud_group.destroyEach();
}

