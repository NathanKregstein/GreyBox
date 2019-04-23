const Phaser = require('phaser');

class Blocker2 {
    constructor(x, y, r, w ,h, f) {
       
      this.x = x;
      this.half =x;
      this.y = y;
      this.radius = r;
      this.forward = f;
      this.startHeight =h;
      this.width = w;
      this.height = h;
    //   this.forwardX = Math.cos(this.forward);
      this.forwardY = Math.sin(this.forward);
      this.moveSpeed = 200;
      this.deafaultSpeed =200;
    //   console.log(this.x);
    //   console.log(this.y);
    this.player2Prev =0;
    this.maxSpeed =1000;
    }

    update(deltaTime,player1Score,player2Score) {
        
        this.y += this.moveSpeed * this.forwardY * deltaTime / 1000;

        // if( player1Score>player2Score){
        //     this.x = this.half + ((player1Score - player2Score)*20);
        //     this.height = this.startHeight +((player1Score - player2Score)*10);
        // }
        // else if(player2Score > player1Score){
        //     this.x = this.half - ((player2Score - player1Score)*20);
        //     this.height = this.startHeight +((player2Score - player1Score)*10);
        // }
        // else{
        //     this.x = this.half;
        //     this.height =this.startHeight;
        // }

        if(player2Score >this.player2Prev){
            this.x = this.half + ((player2Score)*10);
            this.height = this.startHeight +((player2Score)*10);
            this.player2Prev = player2Score;
        }

    }

    draw(graphics) {
        graphics.save();
        graphics.fillStyle(0x5C2751,1);
        graphics.translate(this.x, this.y);
        // ball.x=this.x;
        // ball.y=this.y;
        // graphics.lineStyle(2,0x000000);
        graphics.fillRect(0,0,this.width,this.height);
        // graphics.strokeRect(0,0,this.width,this.heights);
         
        // graphics.fillCircle(0, 0, this.radius);

  
        graphics.restore();
    }

    blockerHitTop(){
        this.forwardY = -this.forwardY;
    }

    blockerHitBot(){
        this.forwardY = -this.forwardY;
        this.y = this.y-5;
    }

    blockerResetSpeed(){
        this.moveSpeed =this.deafaultSpeed;
    }
    blockerIncreaseSpeed(){
        if(this.moveSpeed<this.maxSpeed){
            this.moveSpeed =this.moveSpeed +10;
        }
    }

}

module.exports = Blocker2;