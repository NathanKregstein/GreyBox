const Phaser = require('phaser');

class RightPlayer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 55; // radius used for collision detection

    // movement
    this.moveSpeed = 500;
    this.forwardRot = 0;
    this.rotSpeed = 1;
    this.captureState = false;
    this.holdTime =15000;
    this.resetTime =1000;
    this.captureHoldTimer =this.holdTime;
    this.holdResetTimer = this.resetTime;
    this.SpaceDown = false;
    this.prevCaptureState =false;


    // Geometry used for rendering
    this.baseGeo = [
    //   new Phaser.Geom.Point(-17, 10),
    //   new Phaser.Geom.Point(-8, 20),
    //   new Phaser.Geom.Point(8, 20),
    //   new Phaser.Geom.Point(17, 10),
    //   new Phaser.Geom.Point(17, -20),
    //   new Phaser.Geom.Point(-17, -20),
    //   new Phaser.Geom.Point(-17, 10),
    new Phaser.Geom.Point(0,0),
    new Phaser.Geom.Point(-30,40),
    new Phaser.Geom.Point(-30,30),
    new Phaser.Geom.Point(10,0),
    new Phaser.Geom.Point(-30,-30),
    new Phaser.Geom.Point(-30,-40),
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

  update(deltaTime, keys, player2Bend, player2Pos, player2Rot) {
    // Player Movement
    if(this.captureState ==true){
        // if (keys.left.isDown) {
        // this.forwardRot -= this.rotSpeed * deltaTime / 1000
        // }
        // else if (keys.right.isDown) {
        // this.forwardRot += this.rotSpeed * deltaTime / 1000
        // }
        this.forwardRot = player2Rot;
    }
    else{
        this.forwardRot =0;
        this.y = player2Pos;
    }

    // Calculate forward vector
    const forwardX = -Math.sin(this.forwardRot);
    const forwardY = Math.cos(this.forwardRot);
    
    // if (keys.up.isDown) {
    //   this.y -= this.moveSpeed * forwardY * deltaTime / 1000;
    // }
    // if (keys.down.isDown) {
    //     this.y += this.moveSpeed * forwardY * deltaTime / 1000;
    //   }

    // this.y = player2Pos;

    if(player2Bend == 1  && this.holdResetTimer == this.resetTime){
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
    graphics.scale(1.4,1.4);

    // graphics.strokePoints(this.baseGeo);

    // graphics.fillCircle(0, 0, 12);
    // if(this.captureState == false){
    // graphics.fillRect(0, 0, 20, 150);
    // }
    // else if(this.captureState == true){
    //     graphics.strokePoints(this.baseGeo);
    // }
    graphics.strokePoints(this.baseGeo);


    graphics.restore();
  }
}

module.exports = RightPlayer;
