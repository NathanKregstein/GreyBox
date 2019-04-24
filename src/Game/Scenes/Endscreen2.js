const Phaser = require('phaser');

class EndScreen2 extends Phaser.Scene {
  constructor() {
    super('EndScreen2');
  }
  preload(){
    this.load.audio('WinSound',['../Assets/WinSound2.wav']);
}
  create() {
    this.overlay = document.querySelector('#end-screen2');
    this.overlay.classList.remove('hidden');

    this.keys = {
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };
    this.sound.play('WinSound', { volume: 1 });
  }

  update() {
    if (this.keys.space.isDown) {
      document.getElementById("Player1ready").innerHTML= "Player 1 Bend to Ready Up";
      document.getElementById("Player2ready").innerHTML= "Player 2 Bend to Ready Up";
      this.overlay.classList.add('hidden');
      // Transition to gameplay
      this.scene.start('GameScreen');
    }
  }
}

module.exports = EndScreen2;