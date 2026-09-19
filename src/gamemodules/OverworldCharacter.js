import { Graphics, Sprite, Container } from "pixi.js";
import { GameObject } from "../gamecore/GameObject";
import { Vector2D } from "../gamecore/Vector2D";

class OverworldCharacter extends GameObject{
    dialogEndEvent = null;

    constructor(context, data, position){
        const dimensions = new Vector2D(30, 30);
        super(context, position, dimensions);
        this.data = data;
        this.postion = new Vector2D(Math.round(position.x), Math.round(position.y));
        this.overworldSprite = new Graphics();
        this.overworldSprite.rect(0, 0, dimensions.x, dimensions.y);
        this.overworldSprite.fill('#FFFFFF');
        this.overworldSprite.position.set(this.position.x, this.position.y);
        this.context.app.stage.addChild(this.overworldSprite);
        this.overworldSprite.eventMode = 'static';
        this.overworldSprite.on('mousedown', () => {this.overworldSpriteClick()});
        this.overworldSprite.on('touchstart', () => {this.overworldSpriteClick()});
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
        this.overworldSprite.visible = false;
    }
}

export {OverworldCharacter}