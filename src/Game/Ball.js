class Ball {
    constructor(x, y, r , f) {
      this.x = x;
      this.y = y;
      this.radius = r;
      this.forward = f;
      this.forwardX = Math.cos(this.forward);
      this.forwardY = Math.sin(this.forward);
      this.moveSpeed = 200;
      this.isCaught = false;
      this.hitTop  =false;
    }
    
    free(x,y,forward){
        this.x = x;
        this.y = y;
        this.forward = forward;
        this.isCaught = false;
        this.forwardX = Math.cos(this.forward);
         this.forwardY = Math.sin(this.forward);
         console.log(this.forward)
        //  this.forwardX = -this.forwardX;
        //  this.forwardY = -this.forwardY;
    }

    hitTopyBot(){
        // console.log("hit");
        this.forwardY = -this.forwardY;
        this.moveSpeed = this.moveSpeed +100;
    }

    hitSide(){
        this.x = 400;
        this.y = 300;
        this.forward = Math.random()* (300+200) -200;
        this.forwardX = Math.cos(this.forward);
        this.forwardY = Math.sin(this.forward);
        this.moveSpeed =200;
    }
    caught(x,y) {
        this.x=x;
        this.y=y;
        this.isCaught = true;
      }

      update(deltaTime, state) {
        //   console.log(this.forwardY);
        if (this.isCaught){
             this.forwardX =0;
             this.forwardY =0;
            //  console.log("caught");
        }
          // Calculate forward vector
        //   else{
        //          this.forwardX = Math.cos(this.forward);
        //      this.forwardY = -Math.sin(this.forward);
        //   }
          this.x += this.moveSpeed * this.forwardX * deltaTime / 1000;
          this.y += this.moveSpeed * this.forwardY * deltaTime / 1000;
      }
      draw(graphics) {
          graphics.save();
          graphics.translate(this.x, this.y);
          graphics.fillCircle(0, 0, this.radius);
          graphics.restore();
      }
    }    

    module.exports = Ball;