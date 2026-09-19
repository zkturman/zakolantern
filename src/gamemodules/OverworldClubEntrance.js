import { Graphics } from "pixi.js";
import { GameObject } from "../gamecore/GameObject";
import { Vector2D } from "../gamecore/Vector2D";
import { PasscodeScreen } from "./PasscodeScreen";

class OverworldClubEntrance extends GameObject{
    constructor(context){
        super(context, new Vector2D(0, 0), new Vector2D(0, 0));
        let entranceSprite = new Graphics();
        entranceSprite.rect(0, 0, this.context.app.canvas.width, 300);
        entranceSprite.fill('green');
        entranceSprite.eventMode = 'static';
        this.context.app.stage.addChild(entranceSprite);
        
        this.passcodeScreen = new PasscodeScreen(context);
        entranceSprite.on('mousedown', () => {this.openPasscodeScreen()});
        entranceSprite.on('touchstart', () => {this.openPasscodeScreen()});
    }

    openPasscodeScreen(){
        this.passcodeScreen.show();
    }
}

export {OverworldClubEntrance}