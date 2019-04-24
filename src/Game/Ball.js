class Ball {
    constructor(x, y, r , f) {
      this.x = x;
      this.y = y;
      this.radius = r;
      // this.forward = f;
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
      this.moveSpeed = .300 * window.innerWidth;
      this.isCaughtL = false;
      this.isCaughtR = false;
      this.hitTop  =false;
      this.capSpeed = .8 * window.innerWidth;

      this.originalColor = "0x000000";
      this.currentColor = "0x000000";
      this.colorDuration = 250;
      this.colorChange=false;
    }
    
    free(x,y,forward){
        this.x = x;
        this.y = y;
        this.forward = forward;
        this.isCaughtL = false;
        this.isCaughtR = false;
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
        this.x = .5 * window.innerWidth;
        this.y = .5 *window.innerHeight;
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
        this.moveSpeed =.300 * window.innerWidth;
    }
    caughtL(x,y) {
        this.x=x;
        this.y=y;
        console.log("ball x value =")
        console.log(this.x);
        console.log("ball y value =")
        console.log(this.y);
        this.isCaughtL = true;
      }
      caughtR(x,y) {
        this.x=x;
        this.y=y;
        console.log("ball x value =")
        console.log(this.x);
        console.log("ball y value =")
        console.log(this.y);
        this.isCaughtR = true;
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

      update(deltaTime, state, Ly, Ry) {
        //   console.log(this.forwardY);
        this.updateChangeColor(deltaTime);
        if (this.isCaughtL){
             this.forwardX =0;
             this.forwardY =0;
            //  console.log("caught");
            this.y = Ly;
        }
        if (this.isCaughtR){
          this.forwardX =0;
          this.forwardY =0;
          this.y = Ry;
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
          graphics.fillStyle(this.currentColor,1);
          graphics.translate(this.x, this.y);
          graphics.fillCircle(0, 0, this.radius);
          graphics.restore();
      }
    }    

    module.exports = Ball;