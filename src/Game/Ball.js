class Ball {
    constructor(x, y, r , f) {
      this.x = x;
      this.y = y;
      this.radius = r;
      this.forward = f;
      this.forwardX = Math.cos(this.forward);
      this.forwardY = Math.sin(this.forward);
      this.moveSpeed = 400;
      this.isCaught = false;
      this.hitTop  =false;
      this.capSpeed =1750;

      this.originalColor = "0x000000";
      this.currentColor = "0x000000";
      this.colorDuration = 250;
      this.colorChange=false;
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
        if(this.moveSpeed<this.capSpeed){
          this.moveSpeed = this.moveSpeed +100;
        }
        this.colorChange = true;

    }

    hitSide(){
        this.x = 400;
        this.y = 300;
        this.forward = Math.random();
        this.forward *= Math.PI;
        if(this.forward >= (Math.PI/2)){
          this.forward += (Math.PI/4);
        }
        else{
          this.forward -= (Math.PI/4);
        }
        this.forwardX = Math.cos(this.forward);
        this.forwardY = Math.sin(this.forward);
        this.moveSpeed =400;
    }
    caught(x,y) {
        this.x=x;
        this.y=y;
        console.log("ball x value =")
        console.log(this.x);
        console.log("ball y value =")
        console.log(this.y);
        this.isCaught = true;
      }

      updateChangeColor(deltaTime){
        if(this.colorChange){
          // console.log('gettingCalled?');
          // this.currentColor = "0xA799B7";
          this.currentColor = "0xEBDEAE";
          this.colorDuration -=deltaTime;

          if(this.colorDuration < 0){
            this.colorChange=false;
            this.colorDuration = 250;
            this.currentColor = this.originalColor;
          }
        }
        // console.log(this.currentColor);
      }

      update(deltaTime, state) {
        //   console.log(this.forwardY);
        this.updateChangeColor(deltaTime);
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
          graphics.fillStyle(0x000000,1);
          graphics.translate(this.x, this.y);
          graphics.fillCircle(0, 0, this.radius);
          graphics.restore();
      }
    }    

    module.exports = Ball;