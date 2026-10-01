import { Sprite } from "pixi.js";
import { GameObject } from "../gamecore/GameObject";
import { Vector2D } from "../gamecore/Vector2D";
import { PasscodeScreen } from "./PasscodeScreen";
import { GetTexture } from "../gamecore/AssetStore";

class OverworldClubEntrance extends GameObject{
    constructor(context){
        super(context, new Vector2D(0, 0), new Vector2D(0, 0));
        let texture = GetTexture('/assets/ClubEntrance_Overworld.png');
        let entranceSprite = new Sprite(texture);
        entranceSprite.position.set((this.context.app.canvas.width / 2) - (entranceSprite.width / 2), 0);
        entranceSprite.eventMode = 'static';
        this.context.app.stage.addChild(entranceSprite);

        this.passcodeScreen = new PasscodeScreen(context);
        this.context.gameObjects.push(this.passcodeScreen);
        entranceSprite.on('mousedown', () => {this.openPasscodeScreen()});
        entranceSprite.on('touchstart', () => {this.openPasscodeScreen()});
    }

    openPasscodeScreen(){
        this.passcodeScreen.show();
    }
}

export {OverworldClubEntrance}