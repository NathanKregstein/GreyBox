const Phaser = require('phaser');
const SerialPortReader = require('../SerialPortReader');

class EndScreen1 extends Phaser.Scene {
  constructor() {
    super('EndScreen1');
    SerialPortReader.addListener(this.onSerialMessage.bind(this));
  }
  onSerialMessage(msg){
    this.gamevars = msg;
  }
  preload(){
    this.load.audio('WinSound',['../Assets/WinSound2.wav']);
}
  create() {
    document.body.style.backgroundImage = "";
    this.overlay = document.querySelector('#end-screen1');
    this.overlay.classList.remove('hidden');

    this.keys = {
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };
    this.sound.play('WinSound', { volume: 1 });
    this.P1Ready = false;
    this.P2Ready = false;
  }

  update() {
    if(this.gamevars){
      const vals = this.gamevars.split(':');
      this.player1Pos = parseFloat(vals[0]);
      this.player2Pos = parseFloat(vals[1]);
      this.player1Bend = parseInt(vals[2]);
      this.player2Bend = parseInt(vals[3]);
      this.player1Rot = parseFloat(vals[4]);
      this.player2Rot = parseFloat(vals[5]);
      this.player1Pos = this.player1Pos/1023 * (window.innerHeight * .8) + (window.innerHeight *.1);
      this.player2Pos = this.player2Pos/1023 * (window.innerHeight *.8) + (window.innerHeight *.1);
    }
    // if(this.P1Ready == false ){
      if (this.player1Bend ==1 && this.P1Ready == false ) {
        // document.getElementById("Player1ready").innerHTML= "Player 1 Ready!";
        this.P1Ready = true;
      }
      if (this.player2Bend ==1 && this.P2Ready == false) {
        // document.getElementById("Player2ready").innerHTML= "Player 2 Ready!";
        this.P2Ready =true;
      }
      // if(this.player1Bend == 1 && this.player2Bend == 1 ){
      //   this.bothReady =true;
      // }
    // }
    if(this.P2Ready == true && this.P1Ready == true){
      // document.getElementById("Player1ready").innerHTML= "Unbend to Start!";
      // document.getElementById("Player2ready").innerHTML= "";

      if(this.player1Bend == 0 && this.player2Bend == 0 ){
        this.overlay.classList.add('hidden');
        // Transition to gameplay
        this.scene.start('GameScreen');
      }
    }
  }
}

module.exports = EndScreen1;