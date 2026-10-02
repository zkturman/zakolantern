import { AnimatedSprite } from "pixi.js";
import { GameObject } from "../gamecore/GameObject";
import { Vector2D } from "../gamecore/Vector2D";
import { GetTexture } from "../gamecore/AssetStore";

class OverworldCharacter extends GameObject{
    dialogEndEvent = null;

    constructor(context, data, position){
        const dimensions = new Vector2D(30, 30);
        super(context, position, dimensions);
        this.data = data;
        this.postion = new Vector2D(Math.round(position.x), Math.round(position.y));

        this.generateOverworldSprite(data.overworld)
        // this.overworldSprite.rect(0, 0, dimensions.x, dimensions.y);
        // this.overworldSprite.fill('#FFFFFF');
        this.overworldSprite.position.set(this.position.x, this.position.y);
        this.context.app.stage.addChild(this.overworldSprite);
        this.overworldSprite.eventMode = 'static';
        this.overworldSprite.on('mousedown', () => {this.overworldSpriteClick()});
        this.overworldSprite.on('touchstart', () => {this.overworldSpriteClick()});
    }

    generateOverworldSprite(overworld){
        let spritesheet = GetTexture(overworld.sprite);
        this.overworldSprite = new AnimatedSprite(spritesheet.animations[overworld.default]);
        this.overworldSprite.loop = overworld.loop;
        this.overworldSprite.animationSpeed = overworld.speed / 5;
        this.overworldSprite.scale = 1.5;
        this.overworldSprite.play();
    }

    overworldSpriteClick(event){
        this.context.dialog.injectDialogData(this.data);
        this.context.dialog.show();
        this.context.dialog.closedEvent = () => 
            {
                if (this.dialogEndEvent !== null){
                    this.dialogEndEvent();
                }
            }
    }

    draw(){
    }

    update(secondsPassed){
    }

    show(){
        this.overworldSprite.visible = true;
    }

    hide(){
        console.log(this);
        this.overworldSprite.visible = false;
    }

    onDestroy(){
        this.overworldSprite.destroy();
    }
}

export {OverworldCharacter}