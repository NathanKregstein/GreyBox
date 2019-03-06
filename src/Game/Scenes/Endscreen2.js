const Phaser = require('phaser');

class EndScreen2 extends Phaser.Scene {
  constructor() {
    super('EndScreen2');
  }

  create() {
    this.overlay = document.querySelector('#end-screen2');
    this.overlay.classList.remove('hidden');

    this.keys = {
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };
  }

  update() {
    if (this.keys.space.isDown) {
      this.overlay.classList.add('hidden');
      // Transition to gameplay
      this.scene.start('GameScreen');
    }
  }
}

module.exports = EndScreen2;