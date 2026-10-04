import { AnimatedSprite } from "pixi.js";
import { GameObject } from "../gamecore/GameObject";
import { Vector2D } from "../gamecore/Vector2D";
import { PasscodeScreen } from "./PasscodeScreen";
import { GetTexture } from "../gamecore/AssetStore";

class OverworldClubEntrance extends GameObject{
    constructor(context, doorData, hagathaEye, danceTile, hagatha){
        super(context, new Vector2D(0, 0), new Vector2D(0, 0));
        let doorTexture = GetTexture('/assets/ClubEntrance_Overworld.png');
        let entranceSprite = new AnimatedSprite(doorTexture.animations[doorData.default]);
        entranceSprite.animationSpeed = doorData.speed;
        entranceSprite.loop = doorData.loop;
        entranceSprite.play();
        
        entranceSprite.position.set((this.context.app.canvas.width / 2) - (entranceSprite.width / 2), 0);
        entranceSprite.eventMode = 'static';
        this.context.app.stage.addChild(entranceSprite);

        this.passcodeScreen = new PasscodeScreen(context, hagathaEye, danceTile, hagatha);
        this.context.gameObjects.push(this.passcodeScreen);
        entranceSprite.on('mousedown', () => {this.openPasscodeScreen()});
        entranceSprite.on('touchstart', () => {this.openPasscodeScreen()});
    }

    openPasscodeScreen(){
        this.passcodeScreen.show();
    }
}

export {OverworldClubEntrance}