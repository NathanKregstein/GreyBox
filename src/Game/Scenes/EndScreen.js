const Phaser = require('phaser');

class EndScreen1 extends Phaser.Scene {
  constructor() {
    super('EndScreen1');
  }
  preload(){
    this.load.audio('WinSound',['../Assets/WinSound2.wav']);
}
  create() {
    this.overlay = document.querySelector('#end-screen1');
    this.overlay.classList.remove('hidden');

    this.keys = {
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };
    this.sound.play('WinSound', { volume: 1 });
  }

  update() {
    if (this.keys.space.isDown) {
      this.overlay.classList.add('hidden');
      // Transition to gameplay
      this.scene.start('GameScreen');
    }
  }
}

module.exports = EndScreen1;