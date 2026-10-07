class Collision{
    constructor(colliderA, colliderB){
        this.colliderA = colliderA;
        this.colliderB = colliderB;
    }

    startCollision(){
        this.colliderA.enterCollision(this.colliderA, this.colliderB);
        this.colliderB.enterCollision(this.colliderB, this.colliderA);
    }

    isInCollision(){
        return Collision.checkOverlap(this.colliderA, this.colliderB);
    }

    static checkOverlap(colliderA, colliderB){
        if (colliderA === null || colliderB === null){
            return false;
        }
        if (colliderA.isDestroyed || colliderB.isDestroyed){
            return false;
        }
        if (!colliderA.enabled || !colliderB.enabled){
            return false;
        }
        let ax1 = colliderA.position.x;
        let ax2 = colliderA.position.x + colliderA.dimension.x;
        let ay1 = colliderA.position.y;
        let ay2 = colliderA.position.y + colliderA.dimension.y;
        let bx1 = colliderB.position.x;
        let bx2 = colliderB.position.x + colliderB.dimension.x;
        let by1 = colliderB.position.y;
        let by2 = colliderB.position.y + colliderB.dimension.y;
        return (
            ax1 < bx2 
            && ax2 > bx1
            && ay1 < by2
            && ay2 > by1
        );
    }
}

export {Collision}