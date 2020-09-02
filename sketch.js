var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var car1Img, car2Img, car3Img, car4Img;
var trackImg;
var sprRank;

function preload(){
   car1Img = loadImage("images/car1.png")
   car2Img = loadImage("images/car2.png")
   car3Img = loadImage("images/car3.png")
   car4Img = loadImage("images/car4.png")
   trackImg = loadImage("images/track.jpg")

   rank1Img = loadImage("images/rank1.png")
   rank2Img = loadImage("images/rank2.png")
   rank3Img = loadImage("images/rank3.png")
   rank4Img = loadImage("images/rank4.png")
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
 
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  /*console.log(displayWidth)
  console.log(displayHeight)*/

  if(gameState===2){
    game.end()
  }


}
