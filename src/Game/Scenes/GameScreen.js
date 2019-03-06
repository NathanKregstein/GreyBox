// Import outside libraries
const Phaser = require('phaser');

const Player = require('../LeftPlayer');
const Player2 = require('../RightPlayer');
const Ball = require('../Ball');

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

class GameScreen extends Phaser.Scene {
    constructor() {
      super('GameScreen');
    }
    create() {
        console.log("gameScreen");
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
          this.score1Text = this.add.text(50, 50, 'score: 0', { fontSize: '24px', fill: '#FFF' });
          this.score2Text = this.add.text(600, 50, 'score: 0', { fontSize: '24px', fill: '#FFF' });
          this.graphics = this.add.graphics({
              fillStyle: { color: 0xeeeeee },
              lineStyle: { width: 3, color: 0xeeeeee }
          });
      



        this.pL1 = new Player((this.game.config.width / 4) -125, this.game.config.height / 2 -75);
//      const pL2 = new Player((phaserConfig.width / 4 -100), phaserConfig.height / 3 - 125);
// const pL3 = new Player((phaserConfig.width / 4 -100), phaserConfig.height * (2/3) -25);
        this.pR1 = new Player2((this.game.config.width* .75) + 100, this.game.config.height / 2 -75);
// const pR2 = new Player2((phaserConfig.width * .75 +100), phaserConfig.height / 3 -125);
// const pR3 = new Player2((phaserConfig.width * .75 +100), phaserConfig.height * (2/3) -25);
        this.b1 = new Ball(this.game.config.width / 2, this.game.config.height / 2, 10, Math.random()* (300+200) -200);




    }



    update(totalTime, deltaTime) {
  // Update Player
        this.pL1.update(deltaTime, this.keys);
  // pL2.update(deltaTime, keys);
  // pL3.update(deltaTime, keys);
        this.pR1.update(deltaTime, this.keys);
  // pR2.update(deltaTime, keys);
  // pR3.update(deltaTime, keys);
        this.b1.update(deltaTime, this.ballState);

  // Keep player on screen
        if (this.b1.x > this.game.config.width + 5) {
            this.b1.hitSide();
            this.player1Score++;
            this.score1Text.setText('Score: ' + this.player1Score);
        }

        if (this.b1.x < -5) {
            this.b1.hitSide();
            this.player2Score++;
            this.score2Text.setText('Score: ' + this.player2Score);
        }

        if (this.b1.y > this.game.config.height + 5) {
            this.b1.hitTopyBot();
        }

        if (this.b1.y < 0) {
            this.b1.hitTopyBot();
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
  

        if(isCircleCollision(this.b1,this.pR1) && this.pR1.giveState()){
    // console.log("collide");
            this.b1.caught(this.pR1.x,this.pR1.y);
            this.ballState = true;
            this.rightCaught = true;
        }

        if(this.rightCaught ==true && !this.pR1.giveState()){
            this.rightCaught =false;
            this.b1.free(this.b1.x,this.b1.y,this.pR1.forwardRot-3.13);
        }
        if(isCircleCollision(this.b1,this.pL1) && this.pL1.giveState()){
    // console.log("collide");
            this.b1.caught(this.pL1.x,this.pL1.y);
            this.ballState = true;
            this.leftCaught = true;
        }

        if(this.leftCaught ==true && !this.pL1.giveState()){
            this.leftCaught =false;
            this.b1.free(this.b1.x,this.b1.y,this.pL1.forwardRot);
        }

        if(this.player1Score >=10){
            this.scene.start('EndScreen1');
        }
        if(this.player2Score >=10){
            this.scene.start('EndScreen2');
        }
}



// Exported Module
}
module.exports = GameScreen;