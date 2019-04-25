const Phaser = require('phaser');

class LeftPlayer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // this.radius = 55; // radius used for collision detection
    this.radius = .055*window.innerWidth; 
    // movement
    this.moveSpeed = 500;
    this.forwardRot = 0;
    this.rotSpeed = 1;
    this.captureState = false;
    this.holdTime =5000;
    this.resetTime =750;
    this.captureHoldTimer =this.holdTime;
    this.holdResetTimer = this.resetTime;
    this.SpaceDown = false;
    this.prevCaptureState =false;
    this.temp = 0;
    this.hasTicked =false;
    this.hasReleased = false;


    // Geometry used for rendering
    this.baseGeo = [
      // new Phaser.Geom.Point(-17, 10),
      // new Phaser.Geom.Point(-8, 20),
      // new Phaser.Geom.Point(8, 20),
      // new Phaser.Geom.Point(17, 10),
      // new Phaser.Geom.Point(17, -20),
      // new Phaser.Geom.Point(-17, -20),
      // new Phaser.Geom.Point(-17, 10),
      new Phaser.Geom.Point(0,0),
      new Phaser.Geom.Point(30,40),
      new Phaser.Geom.Point(30,30),
      new Phaser.Geom.Point(-10,0),
      new Phaser.Geom.Point(30,-30),
      new Phaser.Geom.Point(30,-40),
      new Phaser.Geom.Point(0,0),
    ];
    this.newGeo =[
      new Phaser.Geom.Point(-10,0),
      new Phaser.Geom.Point(25,0),
      new Phaser.Geom.Point(20,-10),
      new Phaser.Geom.Point(25,0),
      new Phaser.Geom.Point(20,10),
      // new Phaser.Geom.Point(window.innerWidth *.03,window.innerHeight *.03),
      // new Phaser.Geom.Point(0,window.innerHeight*.06),
      // new Phaser.Geom.Point(-10,0),
    ];
  }
  preload(){
    this.load.audio('HoldTick',['Assets/HoldTick.wav']);
  }


  giveState(){
    return this.captureState;
  }
  setX(newX) {
    this.x = newX;
  }
  
  setY(newY) {
    this.y = newY;
  }

  update(deltaTime, keys, player1Bend , player1Pos, player1Rot, sound) {
    // Player Movement
    if(this.captureState == true){
      // if (keys.a.isDown) {
      // this.forwardRot -= this.rotSpeed * deltaTime / 1000
      // }
      // else if (keys.d.isDown) {
      // this.forwardRot += this.rotSpeed * deltaTime / 1000
      // }
      
      // console.log(player1Rot);
      // if(player1Rot < Math.PI){
        this.temp = player1Rot + (2*(Math.PI));
         if(this.temp <= 1.5  || this.temp >= 5){
           this.forwardRot = this.temp
         }
        //   this.forwardRot +=(Math.PI/4);
        // }
        // else{
        //   this.forwardRot -= (Math.PI/4);
        // }
        // console.log(this.forwardRot);
      // }
  }
  else{
      this.forwardRot =0;
      // this.y = player1Pos;
  }
  this.y = player1Pos;

    // Calculate forward vector
    const forwardX = -Math.sin(this.forwardRot);
    const forwardY = Math.cos(this.forwardRot);
    
    
    // if (keys.w.isDown) {
    //   this.y -= this.moveSpeed * forwardY * deltaTime / 1000;
    // }
    // if (keys.s.isDown) {
    //   this.y += this.moveSpeed * forwardY * deltaTime / 1000;
    // }
    if(player1Bend == 1  && this.holdResetTimer == this.resetTime){
      this.captureState=true;
      this.captureHoldTimer = this.captureHoldTimer - deltaTime;
      this.SpaceDown =true;
      this.prevCaptureState =true;
      if(this.captureHoldTimer <= 2000 && !this.hasTicked){
        sound.play('HoldTick');
        this.hasTicked = true;

      }
      // if(this.captureHoldTimer <= 100 && !this.hasReleased){
      //   sound.play('CatchSound');
      //   this.hasReleased =true;
      // }
      console.log(this.captureHoldTimer);
    }
    else{
      this.captureState = false;
      this.captureHoldTimer = this.holdTime;
      this.SpaceDown =false;
      this.hasTicked = false;
      this.hasReleased =false;
    }
    if(this.captureState && this.captureHoldTimer <=0){
      this.SpaceDown =false;
    }
    if(!this.SpaceDown && this.holdResetTimer > 0 && this.prevCaptureState){
      this.holdResetTimer = this.holdResetTimer - deltaTime;
    }
    if(this.holdResetTimer <= 0){
      this.holdResetTimer = this.resetTime;
      this.prevCaptureState = false;
    }
  }

  draw(graphics) {
    graphics.save();
    graphics.translate(this.x, this.y);
    graphics.rotate(this.forwardRot);
    if(this.captureState == false){
      graphics.fillStyle(0xA799B7, 1);
      graphics.fillCircle(0, 0, this.radius);
      graphics.fillStyle(0x40E0D0, 1);
      graphics.fillCircle(70, 0, this.radius);
      graphics.fillStyle(0xA799B7, 1);
      // graphics.fillRect(5, 0 - this.radius, 5, this.radius +this.radius);
      // graphics.lineStyle(2,0xA799B7);

        // graphics.lineStyle(2,0xA799B7);
        // graphics.scale(1.4,1.4);
        // graphics.strokePoints(this.baseGeo);
      }
          else if(this.captureState == true){
          // graphics.strokePoints(this.baseGeo);
          // graphics.lineStyle(3,0xE0CA3C);
          // graphics.lineStyle(2,0xA799B7);
          // graphics.scale(1.4,1.4);
          // graphics.strokePoints(this.baseGeo);
          graphics.fillStyle(0xE0CA3C, 1);
          graphics.fillCircle(0, 0, this.radius);
          graphics.fillStyle(0x40E0D0, 1);
          graphics.fillCircle(20, 0, this.radius);
          graphics.lineStyle(5,0xE0CA3C);
          graphics.strokePoints(this.newGeo);
      }
    // else if(this.captureState == true){
    //       // graphics.strokePoints(this.baseGeo);
    //       graphics.lineStyle(3,0xE0CA3C);
    //   }
    // graphics.translate(this.x, this.y);
    // graphics.rotate(this.forwardRot);
    // graphics.strokePoints(this.baseGeo);

    graphics.restore();
  }
}

module.exports = LeftPlayer;
