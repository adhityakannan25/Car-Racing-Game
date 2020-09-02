class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);

    car1.addImage("car1Image",car1Img)
    car2.addImage("car2Image",car2Img)
    car3.addImage("car3Image",car3Img)
    car4.addImage("car4Image",car4Img)

    cars = [car1, car2, car3, car4];

    
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){

      background("white")
      image(trackImg,0,-displayHeight*4+100,displayWidth,displayHeight*5)


      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 300;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 260;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //cars[index - 1].shapeColor = "red";

          fill(135,206,250)
          stroke("black")
          strokeWeight(3)
          ellipse(cars[index-1].x,cars[index-1].y,70,70)
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(player.distance>5090){
      gameState=2
      player.rank+=1
      Player.updateCarsAtEnd(player.rank)
      //console.log("GAME END")
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }

  end(){
  
  console.log("GAME HAS ENDED")
   sprRank = createSprite(displayWidth/2,-4020,30,30);
  
  switch(player.rank){
    case 1: sprRank.addImage(rank1Img);
     break;
    case 2: sprRank.addImage(rank2Img) 
     break;
    case 3: sprRank.addImage(rank3Img)
     break;
    case 4: sprRank.addImage(rank4Img)
     break;
    default:
     break;
    }
    drawSprites();
  }
}