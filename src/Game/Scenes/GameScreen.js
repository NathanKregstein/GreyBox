// Import outside libraries
const Phaser = require('phaser');

const Player = require('../LeftPlayer');
const Player2 = require('../RightPlayer');
const Ball = require('../Ball');
const Blocker1 = require('../Blocker1');
const Blocker2 = require('../Blocker2');


const SerialPortReader = require('../SerialPortReader');

let player1Pos;
let player2Pos;
let player1Bend = 0;
let player2Bend = 0;
let player1Rot = 0;
let player2Rot = 0;
// function onSerialMessage(msg) {
//   // Put your serial reading code in here. msg will be a string
// //   console.log(msg);
//     const vals = msg.split(':');
//     player1Pos = parseFloat(vals[0]);
//     player2Pos = parseFloat(vals[1]);
//     player1Bend = parseInt(vals[2]);
//     player2Bend = parseInt(vals[3]);
//     player1Rot = parseFloat(vals[4]);
//     player2Rot = parseFloat(vals[5]);
//     player1Pos = player1Pos/1023 * (window.innerHeight * .8) + (window.innerHeight *.1);
//     player2Pos = player2Pos/1023 * (window.innerHeight *.8) + (window.innerHeight *.1);

// //   console.log(player1Pos);

// }
// SerialPortReader.addListener(onSerialMessage);
/**
 * Helper function for checking if two circles are colliding
 * 
 * @param {object} c1 : must have x, y, and radius property
 * @param {object} c2 : must have x, y, and radius property
 */
function isCircleCollision(c1, c2) {
    // Get the distance between the two circles
    const distSq = (c1.x - c2.x) * (c1.x - c2.x) + (c1.y - c2.y) * (c1.y - c2.y);
    const radiiSq = (c1.radius * c1.radius) + (c2.radius * c2.radius);
  
    // Returns true if the distance btw the circle's center points is less than the sum of the radii
    return (distSq < radiiSq);
  }

  function RectCircleColliding(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.y-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}

class GameScreen extends Phaser.Scene {
    constructor() {
      super('GameScreen');
      SerialPortReader.addListener(this.onSerialMessage.bind(this));
      
    }

    preload(){
      //sounds
      this.load.audio('BlockerHitSound',['../Assets/BlockerHitSound.wav']);
      this.load.audio('CatchSound',['../Assets/CatchSound.wav']);
      this.load.audio('Theme1',['../Assets/Theme1.wav']);
      this.load.audio('ScoreSound',['../Assets/ScoreSound.wav']);
      this.load.audio('HoldTick',['../Assets/HoldTick.wav']);
      // this.load.audio('WinSound',['../Assets/WinSound1.mp3']);

      // Theme song from https://freesound.org/people/tyops/sounds/237127/
      //  ticking sound from https://freesound.org/people/FoolBoyMedia/sounds/264498/
  }
    onSerialMessage(msg){
      this.gamevars = msg
    }
    create() {
        // console.log("gameScreen");
        document.getElementById("game-score").style.display ='inline-block';
        document.body.style.backgroundImage = "url('../Assets/Line.png')";
        SerialPortReader.addListener(this.onSerialMessage.bind(this));
        // console.log(player1Bend);
        this.ballState = false;
        this.keys = {
          left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
          right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
          up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
          down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
          space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
          shift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
          a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
          d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
          w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
          s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
          }
          this.player1Score =0;
          this.player2Score =0;
          this.leftCaught =false;
          this.rightCaught =false;
          this.collided1 =false;
          this.collided2 =false;
        //   this.score1Text = this.add.text(50, 50, 'score: 0', { fontSize: '24px', fill: '#FFF' });
        //   this.score2Text = this.add.text(600, 50, 'score: 0', { fontSize: '24px', fill: '#FFF' });
          this.graphics = this.add.graphics({
              fillStyle: { color: 0xeeeeee },
              lineStyle: { width: 3, color: 0xeeeeee }
          });
      



        this.pL1 = new Player(((window.innerWidth / 4) -(.1 *window.innerWidth)), window.innerHeight / 2 -75);
        this.pR1 = new Player2((window.innerWidth * .75) + (.1 *window.innerWidth), window.innerHeight / 2 -75);
        this.b1 = new Ball(window.innerWidth  / 2, window.innerHeight / 2, .011* window.innerWidth, Math.random()* (300+200) -200);
        this.blocker1 = new Blocker1((window.innerWidth / 2) - (.1 *window.innerWidth) , window.innerHeight/2, 23, .05 * window.innerWidth, .05 * window.innerWidth, Math.random() > 0.5 ? 15 : -15);
        this.blocker2 = new Blocker2((window.innerWidth / 2) + (.1 *window.innerWidth), window.innerHeight/2, 23, .05 * window.innerWidth, .05 * window.innerWidth, Math.random() > 0.5 ? 15 : -15);

        //old speed generator Math.random() *(20+10) -10
        //variable for soundplay
        this.leftSoundPlayed= false;
        this.rightSoundPlayed= false;
        this.sound.play('Theme1', { volume: 0.3 , loop: true });

        // Screen Shake
        this.isShaking = false;
        this.shakeTime = 0;
        this.shakeIntensity = 0;
        this.shakeXScale = 0;
        this.shakeYScale = 0;
        this.shakeSpeed = 0;

    }
    // onSerialMessage(msg) {
    //     // Put your serial reading code in here. msg will be a string
    //     console.log(msg);
    //   }

      startScreenShake(intensity, duration, speed) {
        this.isShaking = true;
        this.shakeIntensity = intensity;
        this.shakeTime = duration;
        this.shakeSpeed = speed;
    
        this.shakeXScale = Math.random() > 0.5 ? 1 : -1;
        this.shakeYScale = Math.random() > 0.5 ? 1 : -1;
        // this.shakeXScale = xDirectionShake;
        // this.shakeYScale = yDirectionShake;
      }

      updateScreenShake(deltaTime) {
        if (this.isShaking) {
          this.shakeTime -= deltaTime;
    
          const shakeAmount = this.shakeTime / this.shakeSpeed;
          this.game.canvas.style.left = "" + (Math.cos(shakeAmount) * this.shakeXScale * this.shakeIntensity) + "px";
          this.game.canvas.style.top = "" + (Math.sin(shakeAmount) * this.shakeYScale * this.shakeIntensity) + "px";
    
          if (this.shakeTime < 0) {
            this.isShaking = false;
            this.game.canvas.style.left = '0px';
            this.game.canvas.style.top = '0px';
          }
    
        }
      }
      playtick(){
        this.sound.play('HoldTick');
      }
    update(totalTime, deltaTime) {
      if(this.gamevars){
        const vals = this.gamevars.split(':');
        player1Pos = parseFloat(vals[0]);
        player2Pos = parseFloat(vals[1]);
        player1Bend = parseInt(vals[2]);
        player2Bend = parseInt(vals[3]);
        player1Rot = parseFloat(vals[4]);
        player2Rot = parseFloat(vals[5]);
        player1Pos = player1Pos/1023 * (window.innerHeight * .8) + (window.innerHeight *.1);
        player2Pos = player2Pos/1023 * (window.innerHeight *.8) + (window.innerHeight *.1);
      }
  // Update Player
        this.updateScreenShake(deltaTime);

        this.pL1.update(deltaTime, this.keys, player1Bend, player1Pos, player1Rot, this.sound);

        this.pR1.update(deltaTime, this.keys, player2Bend, player2Pos, player2Rot, this.sound);
        this.b1.update(deltaTime, this.ballState, this.pL1.y,this.pR1.y);
  this.blocker1.update(deltaTime,this.player1Score,this.player2Score);
  this.blocker2.update(deltaTime,this.player1Score,this.player2Score);
//update score
        document.getElementById('score1').textContent = 'Score: ' + this.player1Score;
        document.getElementById('score2').textContent = 'Score: ' + this.player2Score;
  
// Keep player on screen
        if (this.b1.x > window.innerWidth + 5) {
            this.b1.hitSide();
            this.sound.play('ScoreSound', { volume: 0.3});
            this.startScreenShake(7, 500, 75);
            this.player1Score++;
            this.blocker1.blockerResetSpeed();
            this.blocker2.blockerResetSpeed();
            // this.score1Text.setText('Score: ' + this.player1Score);
        }

        if (this.b1.x < -5) {
            this.b1.hitSide();
            this.sound.play('ScoreSound', { volume: 0.3});
            this.startScreenShake(7, 500, 75);
            this.player2Score++;
            this.blocker1.blockerResetSpeed();
            this.blocker2.blockerResetSpeed();
            // this.score2Text.setText('Score: ' + this.player2Score);
        }

        if (this.b1.y > this.game.config.height + 5) {
            this.b1.hitTopyBot();
            this.sound.play('BlockerHitSound');
            this.startScreenShake(2, 750, 75);
        }

        if (this.b1.y < 0) {
            this.b1.hitTopyBot();
            this.sound.play('BlockerHitSound');
            this.startScreenShake(2, 750, 75);
        }

        if(this.blocker1.y<0){
          this.blocker1.blockerHitTop();
        }
        if(this.blocker1.y > this.game.config.height-this.blocker1.height-5){
          this.blocker1.blockerHitBot();
        }
        if(this.blocker2.y<0){
          this.blocker2.blockerHitTop();
        }
        if(this.blocker2.y > this.game.config.height-this.blocker1.height-5){
          this.blocker2.blockerHitBot();
        }

  // Draw everything
        this.graphics.clear();
        this.pL1.draw(this.graphics);
  // pL2.draw(graphics);
  // pL3.draw(graphics);
        this.pR1.draw(this.graphics);
  // pR2.draw(graphics);
  // pR3.draw(graphics);
        this.b1.draw(this.graphics);
        this.blocker1.draw(this.graphics);
        this.blocker2.draw(this.graphics);

        //Checks to see if ball collided with blockers
        if(RectCircleColliding(this.b1,this.blocker1)){
          if(this.collided1 == false){
              if(this.b1.y < this.blocker1.y - (this.blocker1.height/2)){
                  this.b1.forwardY = -this.b1.forwardY;
                  // console.log("hit bot");
                  this.collided1 =true;
              }
              else if(this.b1.y > this.blocker1.y + (this.blocker1.height/2)){
                  this.b1.forwardY = -this.b1.forwardY;
                  // console.log("hit top");
                  this.collided1 =true;
              }
              if(this.b1.x > this.blocker1.x){
                  this.b1.forwardX = -this.b1.forwardX;
                  // console.log("hit right");
                  this.collided1 =true;
              }
              else if(this.b1.x < this.blocker1.x){
                  this.b1.forwardX = -this.b1.forwardX;
                  // console.log("hit left");
                  this.collided1 = true;
              }
              this.blocker1.blockerIncreaseSpeed();
              this.sound.play('BlockerHitSound', { name: 'markername',start:0,duration: 0.1 });
              this.startScreenShake(1, 500, 75);
              this.b1.colorChange =true;
          }
          // console.log("yeah collide");
          // this.sound.play('BlockerHitSound');    
      }
      else{
          this.collided1 = false;
      }

      if(RectCircleColliding(this.b1,this.blocker2)){
          if(this.collided2 == false){
              if(this.b1.y < this.blocker2.y - (this.blocker2.height/2)){
                  this.b1.forwardY = -this.b1.forwardY;
                  // console.log("hit bot");
                  this.collided2 =true;
              }
              else if(this.b1.y > this.blocker2.y + (this.blocker2.height/2)){
                  this.b1.forwardY = -this.b1.forwardY;
                  // console.log("hit top");
                  this.collided2 =true;
              }
              if(this.b1.x > this.blocker2.x){
                  this.b1.forwardX = -this.b1.forwardX;
                  // console.log("hit right");
                  this.collided2 =true;
              }
              else if(this.b1.x < this.blocker2.x){
                  this.b1.forwardX = -this.b1.forwardX;
                  // console.log("hit left");
                  this.collided2 =true;
              }
              this.sound.play('BlockerHitSound', { name: 'markername',start:0,duration: 0.1 });
              this.blocker2.blockerIncreaseSpeed();
              this.startScreenShake(1, 500, 75);
              this.b1.colorChange =true;
          }
          // console.log("yeah collide");
          // this.sound.play('BlockerHitSound');
          
      }
      else{
          this.collided2 = false;
      }

        if(isCircleCollision(this.b1,this.pR1) && this.pR1.giveState()){
    // console.log("collide");
            this.b1.caughtR(this.pR1.x,this.pR1.y);
            this.ballState = true;
            this.rightCaught = true;
            if(this.rightSoundPlayed==false){
              this.sound.play('CatchSound');
          }
          this.rightSoundPlayed=true;
        }

        if(this.rightCaught ==true && !this.pR1.giveState()){
            this.rightCaught =false;
            this.b1.free(this.b1.x,this.b1.y,this.pR1.forwardRot-3.13, this.sound);
            this.rightSoundPlayed=false;
        }
        if(isCircleCollision(this.b1,this.pL1) && this.pL1.giveState()){
    // console.log("collide");
            this.b1.caughtL(this.pL1.x,this.pL1.y);
            this.ballState = true;
            this.leftCaught = true;
            if(this.leftSoundPlayed==false){
              this.sound.play('CatchSound');
          }
          this.leftSoundPlayed=true;
        }

        if(this.leftCaught ==true && !this.pL1.giveState()){
            this.leftCaught =false;
            this.b1.free(this.b1.x,this.b1.y,this.pL1.forwardRot, this.sound);
            this.leftSoundPlayed=false;
        }

        if(this.player1Score >=7){
            document.getElementById("game-score").style.display ='none';
            this.sound.sounds.find(s=> s.key == 'Theme1').destroy();
            this.scene.start('EndScreen1');
        }
        if(this.player2Score >=7){
            document.getElementById("game-score").style.display ='none';
            this.sound.sounds.find(s=> s.key == 'Theme1').destroy();
            this.scene.start('EndScreen2');
        }
        
}



// Exported Module
}
module.exports = GameScreen;