class ObjectState{
    constructor(context){
        this.context = context;
    }

    get nextState(){
        return this;
    }

    get isInitialised(){
        return false;
    }

    onEnter(){

    }

    updateState(secondsPassed){

    }

    onExit(){

    }
}

export {ObjectState}