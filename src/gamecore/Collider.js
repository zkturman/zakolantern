class Collider{
    onCollisionEnter = null;
    enabled = true;
    isDestroyed = false;
    tag = '';

    constructor(context, position, dimension){
        this.context = context;
        this.position = position;
        this.dimension = dimension;
        this.id = context.colliderId++;
    }

    enterCollision(collider, other){
        if (this.onCollisionEnter){
            this.onCollisionEnter(collider, other)
        }
    }
}

export {Collider}