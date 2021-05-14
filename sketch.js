var player,ground,mario,mariojump
var canvaHeight  
var ground1,ground2,ground3
var pipe,block,obstacleimg,obstacle,obstacle3
var restart,gameOver
var gameState = 0


function preload() {
   mario = loadAnimation("standing.png","running1.png","running2.png")
   mariojump = loadAnimation("jumping.png")
   ground = loadImage("ground3.png")
   pipeimg = loadImage("pipe.png")
   blockimg = loadImage("block.png")
   obstacleimg = loadImage("obstacle.png")
   restart1 = loadImage("restart1.png")
   gameover = loadImage("gameOver1.png")
}



function setup(){
  canvaHeight = displayHeight-143
  createCanvas(displayWidth,canvaHeight)
  player = createSprite(200,canvaHeight-150,60,60)
  player.velocityX = 12
  restart = createSprite(player.x,canvaHeight-360,60,60)
 restart.visible = false
 
  player.addAnimation("running",mario)
 
 
  player.debug = true
  pipeGroup = new Group()
  blockGroup = new Group()
  obstacleGroup = new Group()
  obstacle3Group = new Group()
}
function draw(){
  background("#5E91FE")
  spawnGround()
  
  player.collide(pipeGroup)
  player.collide(blockGroup)
 
  camera.position.x = player.x

  if(ground1&&ground2) {
  
    player.collide(ground1)
    player.collide(ground2)
  if(gameState===0){
  player.setCollider("rectangle",50,0,20,130)
  if(keyDown("space")&&player.y >canvaHeight-180){
    player.addAnimation("mariojump",mariojump)
    player.velocityY = -31
    }
    if(player.y <240){
      player.velocityX = 12
  
    }
    
     if(player.isTouching(obstacleGroup)||player.y >canvaHeight){
       gameState = 1
     }
  
    for(var i=0;i<obstacleGroup.length;i++){
      if(player.isTouching(obstacle3Group.get(i))){
        obstacleGroup.get(i).destroy()
        obstacle3Group.get(i).destroy()
  
      }
    }
    pipe1()
    block1()

    obstacle1()
 }
 if(ground1.x <camera.position.x-ground1.width/2-800){
  ground1.x = ground2.x+ground2.width+250

}
 if(ground2.x<camera.position.x-ground1.width/2-800){
   ground2.x = ground1.x+ground1.width+250
}
 player.velocityY = player.velocityY+1.5
  
 
  camera.position.x = player.x


}
 if(gameState===1){
  ground1.destroy()
  ground2.destroy()
  pipeGroup.destroyEach()
  obstacleGroup.destroyEach()
  player.destroy()
  blockGroup.destroyEach()
  obstacle3Group.destroyEach()
restart.x =player.x
 restart.visible = true
 restart.addImage(restart1)
 gameOver = createSprite(player.x,canvaHeight-430,60,60)
 gameOver.addImage(gameover)
 if(keyDown("r")){
   gameState =0
 }
 

 

 }

drawSprites() 
}

 
function spawnGround(){
  if(frameCount===1){
   ground1= createSprite(camera.position.x,canvaHeight,displayWidth*1,40)
 
  
 
 ground1.velocityX = -12
 ground1.addImage(ground)

 
 
  ground2= createSprite(ground1.x+ground1.width+150,canvaHeight,displayWidth*1,40)
  ground2.velocityX = -12
  ground2.addImage(ground)
  ground1.debug = true
  ground2.debug = true
  } 
}
function pipe1() {
  if(frameCount%100===0){
    pipe = createSprite(camera.position.x+displayWidth/2,random(canvaHeight,canvaHeight-185),40,200)
    pipe.scale= 0.6
    pipe.addImage(pipeimg)
    pipe.velocityX = -12
    pipe.depth = ground2.depth-1
    pipe.depth = ground1.depth-1
    pipeGroup.add(pipe)
    pipe.debug = true
    pipe.setCollider("rectangle",0,0,130,350)
  }   
}
function block1() {
  if(frameCount%130===0){
    block = createSprite(camera.position.x+displayWidth/2,random(canvaHeight-250,canvaHeight-350),40,200)
     block.scale= 0.4
     block.addImage(blockimg)
     block.velocityX = -12
     blockGroup.add(block)
     block.debug = true
     block.setCollider("rectangle",0,0,130,150)
  }
}
function obstacle1() {
  if(frameCount%50===0){
    obstacle = createSprite(camera.position.x+displayWidth/2,canvaHeight-120,40,20)
    obstacle3 = createSprite(obstacle.x,obstacle.y-30,40,20)
    obstacle3.setCollider("rectangle",0,0,80,30)
    obstacle3.debug = true
    obstacle3.visible = false
   obstacle.addImage(obstacleimg)
   obstacle.scale= 0.3
   obstacle.setCollider("rectangle",0,0,300,50)
   obstacle.debug = true
   obstacleGroup.add(obstacle)
   obstacle3Group.add(obstacle3)
  }

}
