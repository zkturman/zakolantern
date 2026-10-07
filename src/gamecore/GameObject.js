class GameObject{
    #enabled = true;
    #isDestroyed = false;
    constructor (context, position, dimensions){
        this.context = context;
        this.position = position;
        this.dimensions = dimensions;
        this.inCollision = false;
    }

    get isEnabled(){
        return this.#enabled;
    }

    enable(){
        this.#enabled = true;
    }

    disable(){
        this.#enabled = false;
    }

    get isDestroyed(){
        return this.#isDestroyed;
    }

    draw(){

    }

    update(){

    }

    onDestroy(){

    }

    onCollisionEnter(){

    }

    static destroy(object){
        object.onDestroy();
        object.#isDestroyed = true;
    }
}

export {GameObject};