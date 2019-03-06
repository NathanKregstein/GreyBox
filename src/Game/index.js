// Import outside libraries
const Phaser = require('phaser');

// const Player = require('./LeftPlayer');
// const Player2 = require('./RightPlayer');
// const Ball = require('./Ball');

const StartScreen = require('./Scenes/StartScreen');
const GameScreen = require('./Scenes/GameScreen');
const EndScreen1 = require('./Scenes/EndScreen');
const EndScreen2 = require('./Scenes/EndScreen2');

const phaserConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [StartScreen, GameScreen,EndScreen1, EndScreen2],
};

let game;

// Exported Module
const GameManager = {
  init: () => {
    game = new Phaser.Game(phaserConfig);
  },
};

module.exports = GameManager;

// let graphics;
// let keys;

// let player1Score =0;
// var score1Text;
// var score2Text;
// let player2Score =0;

// let ballState;

// let leftCaught =false;
// let rightCaught =false;

// const pL1 = new Player((phaserConfig.width / 4) -125, phaserConfig.height / 2 -75);
// // const pL2 = new Player((phaserConfig.width / 4 -100), phaserConfig.height / 3 - 125);
// // const pL3 = new Player((phaserConfig.width / 4 -100), phaserConfig.height * (2/3) -25);
// const pR1 = new Player2((phaserConfig.width* .75) + 100, phaserConfig.height / 2 -75);
// // const pR2 = new Player2((phaserConfig.width * .75 +100), phaserConfig.height / 3 -125);
// // const pR3 = new Player2((phaserConfig.width * .75 +100), phaserConfig.height * (2/3) -25);
// const b1 = new Ball(phaserConfig.width / 2, phaserConfig.height / 2, 10, Math.random()* (300+200) -200);



// /**
//  * Helper function for checking if two circles are colliding
//  * 
//  * @param {object} c1 : must have x, y, and radius property
//  * @param {object} c2 : must have x, y, and radius property
//  */
// function isCircleCollision(c1, c2) {
//   // Get the distance between the two circles
//   const distSq = (c1.x - c2.x) * (c1.x - c2.x) + (c1.y - c2.y) * (c1.y - c2.y);
//   const radiiSq = (c1.radius * c1.radius) + (c2.radius * c2.radius);

//   // Returns true if the distance btw the circle's center points is less than the sum of the radii
//   return (distSq < radiiSq);
// }



// function create() {
//   ballState = false;
//   keys = {
//     left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
//     right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
//     up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
//     down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
//     space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
//     shift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
//     a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
//     d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
//     w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
//     s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
//     }
//   score1Text = this.add.text(50, 50, 'score: 0', { fontSize: '24px', fill: '#FFF' });
//   score2Text = this.add.text(600, 50, 'score: 0', { fontSize: '24px', fill: '#FFF' });
//   graphics = this.add.graphics({
//     fillStyle: { color: 0xeeeeee },
//     lineStyle: { width: 3, color: 0xeeeeee }
//   });
// }

// function update(totalTime, deltaTime) {
//   // Update Player
//   pL1.update(deltaTime, keys);
//   // pL2.update(deltaTime, keys);
//   // pL3.update(deltaTime, keys);
//   pR1.update(deltaTime, keys);
//   // pR2.update(deltaTime, keys);
//   // pR3.update(deltaTime, keys);
//   b1.update(deltaTime, ballState);

//   // Keep player on screen
//   if (b1.x > phaserConfig.width + 5) {
//     b1.hitSide();
//     player1Score++;
//     score1Text.setText('Score: ' + player1Score);
//   }

//   if (b1.x < -5) {
//     b1.hitSide();
//     player2Score++;
//     score2Text.setText('Score: ' + player2Score);
//   };

//   if (b1.y > phaserConfig.height + 5) {
//     b1.hitTopyBot();
//   }

//   if (b1.y < 0) {
//    b1.hitTopyBot();
//   }

//   // Fire bullet once when space key is pressed
//   // if (keys.space.isDown && !isLastSpaceDown) {
//   //   const newBullet = bullets.find(b => !b.isActive);
//   //   if (newBullet) newBullet.activate(p1.x, p1.y, p1.forwardRot);
//   // }
//   // isLastSpaceDown = keys.space.isDown;

//   // Update bullets
//   // bullets.forEach(b => b.update(deltaTime));

//   // Draw everything
//   graphics.clear();
//   pL1.draw(graphics);
//   // pL2.draw(graphics);
//   // pL3.draw(graphics);
//   pR1.draw(graphics);
//   // pR2.draw(graphics);
//   // pR3.draw(graphics);
//   b1.draw(graphics);
  

//   if(isCircleCollision(b1,pR1) && pR1.giveState()){
//     // console.log("collide");
//     b1.caught(pR1.x,pR1.y);
//     ballState = true;
//     rightCaught = true;
//   }

//   if(rightCaught ==true && !pR1.giveState()){
//     rightCaught =false;
//     b1.free(b1.x,b1.y,pR1.forwardRot-3.13);
//   }
//   if(isCircleCollision(b1,pL1) && pL1.giveState()){
//     // console.log("collide");
//     b1.caught(pL1.x,pL1.y);
//     ballState = true;
//     leftCaught = true;
//   }

//   if(leftCaught ==true && !pL1.giveState()){
//     leftCaught =false;
//     b1.free(b1.x,b1.y,pL1.forwardRot);
//   }
// }


// phaserConfig.scene = {
//   create: create,
//   update: update
// };

