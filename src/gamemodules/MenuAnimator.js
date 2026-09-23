class Animator{
    constructor(uiObject, duration){
        this.uiObject = uiObject;
        this.duration = duration;
    }

    play(){

    }

    isDone(){
        return true;
    }

    reset(){

    }
}

class ShakeAnimator extends Animator{
    constructor(uiObject, duration){
        super(uiObject, duration);
        this.moveInterval = uiObject.width / 50;
        this.totalIntervals = 4;
        this.totalDistance = this.moveInterval * this.totalIntervals * 2;
        this.velocity = this.totalDistance / (this.duration * 1000);
        this.completedIntervals = 0;
        this.originalX = uiObject.x;
        this.elapsedTime = 0;
        this.intervalTime = 0;
    }

    play(deltaTime){
        let lastX = this.uiObject.x;
        this.uiObject.x += (this.velocity * deltaTime);

        if (this.completedIntervals < this.totalIntervals) { 
            if (Math.abs(this.uiObject.x - this.originalX) > Math.abs(this.moveInterval)){
                console.log(this.uiObject.width, this.uiObject.x, this.moveInterval, this.totalIntervals, this.duration, deltaTime);
                this.velocity *= -1;
                this.completedIntervals++;
            }
        }
        else if (this.uiObject.x > this.originalX){
            this.finished = true;
            this.uiObject.x = this.originalX;
        }
    }

    isDone(){
        return this.finished;
    }
}

class FadeAnimator extends Animator{
    constructor(uiObject, duration, type){
        super(uiObject, duration);
        this.originalAlpha = this.uiObject.alpha;
        if (!type){
            type = "in";
        }
        this.sign = -1;
        this.target = 0;
        if (type === "in"){
            this.sign = 1;
            this.uiObject.alpha = 0;
            this.target = this.originalAlpha;
        }

        this.velocity = this.sign * this.originalAlpha / (this.duration * 1000);
        console.log(this.velocity, this.target);
        this.reset();
    }
    
    play(deltaTime){
        console.log('fade', this.sign, this.uiObject.alpha, this.target);
        this.uiObject.alpha += this.velocity * deltaTime;
        if (this.sign * this.uiObject.alpha - this.target > 0){
            this.finished = true;
            this.uiObject.alpha = this.originalAlpha;
        }
    }

    isDone(){
        return this.finished;
    }

    reset(){
        if (this.sign > 0){
            this.uiObject.alpha = 0;
        }
        else{
            this.uiObject.alpha = this.originalAlpha;
        }
        this.finished = false;
    }
}

class FloatAnimator extends Animator{
    constructor(uiObject, duration){
        super(uiObject, duration);
        this.originalY = this.uiObject.y;
        this.reset();
        this.velocity = this.uiObject.y / (duration * 1000);
    }
    
    play(deltaTime){
        this.uiObject.y -= this.velocity * deltaTime;
        if (this.uiObject.y < this.originalY){
            this.finished = true;
            this.uiObject.y = this.originalY;
        }
    }

    isDone(){
        return this.finished;
    }

    reset(){
        this.uiObject.y = 400;
        this.finished = false;
    }
}

export {ShakeAnimator, FadeAnimator, FloatAnimator}