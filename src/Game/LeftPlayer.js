const Phaser = require('phaser');

class LeftPlayer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 55; // radius used for collision detection

    // movement
    this.moveSpeed = 500;
    this.forwardRot = 0;
    this.rotSpeed = 1;
    this.captureState = false;
    this.holdTime =5000;
    this.resetTime =2000;
    this.captureHoldTimer =this.holdTime;
    this.holdResetTimer = this.resetTime;
    this.SpaceDown = false;
    this.prevCaptureState =false;


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

  update(deltaTime, keys, player1Bend , player1Pos, player1Rot) {
    // Player Movement
    if(this.captureState ==true){
      // if (keys.a.isDown) {
      // this.forwardRot -= this.rotSpeed * deltaTime / 1000
      // }
      // else if (keys.d.isDown) {
      // this.forwardRot += this.rotSpeed * deltaTime / 1000
      // }
      this.forwardRot = player1Rot;
  }
  else{
      this.forwardRot =0;
      this.y = player1Pos;
  }

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
    }
    else{
      this.captureState = false;
      this.captureHoldTimer = this.holdTime;
      this.SpaceDown =false;
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
    // render player base
    graphics.save();
    if(this.captureState == false){
      // graphics.fillRect(0, 0, 20, 150);
        graphics.lineStyle(2,0xA799B7);
      }
    else if(this.captureState == true){
          // graphics.strokePoints(this.baseGeo);
          graphics.lineStyle(3,0xE0CA3C);
      }
    graphics.translate(this.x, this.y);
    graphics.rotate(this.forwardRot);
    // graphics.strokePoints(this.baseGeo);

    // render cannon
    // graphics.fillCircle(0, 0, 12);
    // if(this.captureState == false){
    //   graphics.fillRect(0, 0, 20, 150);
    //   }
    //   else if(this.captureState == true){
    //       graphics.strokePoints(this.baseGeo);
    //   }
    graphics.scale(1.4,1.4);
    graphics.strokePoints(this.baseGeo);
    graphics.restore();
  }
}

module.exports = LeftPlayer;
