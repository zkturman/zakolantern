import { AnimatedSprite, Container } from "pixi.js";
import { CodeValues } from "./CodeGenerator";
import { GetTexture } from "../gamecore/AssetStore";

function CreateDanceTile(data){
    let danceTile = new Container();
    let tile1 = new AnimatedSprite(GetTexture(data.sprite).animations[data.default]);
    tile1.loop = data.loop;
    tile1.animationSpeed = data.speed;

    let tile2 = new AnimatedSprite(GetTexture(data.sprite).animations[data.default]); 
    tile2.loop = data.loop;
    tile2.animationSpeed = data.speed;
    tile2.tint = 'magenta';

    danceTile.addChild(tile2);
    danceTile.addChild(tile1);

    danceTile.colorCode = -1;
    danceTile.eventMode = 'static';
    danceTile.ready = true;
    danceTile.event = () => {};
    danceTile.on('mousedown', () => TileClick(danceTile));
    danceTile.on('touchstart', () => TileClick(danceTile));
    danceTile.GetColorValue = () => GetColorValue(danceTile);
    danceTile.ResetColor = () => {
        danceTile.colorCode = -1;
        danceTile.removeChildren();
        danceTile.addChild(tile2);
        danceTile.addChild(tile1);
        tile1.tint = 'white';
        tile2.tint = 'magenta';
    }
    return danceTile;
}

function TileClick(danceTile){
    if (danceTile.ready){
        let primary = danceTile.getChildAt(1);
        primary.play();
        danceTile.ready = false;
        primary.onComplete = () => {
            let previous = primary;
            primary = danceTile.getChildAt(1);
            danceTile.swapChildren(danceTile.getChildAt(0), danceTile.getChildAt(1));
            previous.gotoAndStop(0);
            SwitchColor(danceTile.colorCode, previous);
            danceTile.colorCode++;
            if (danceTile.colorCode > 2) danceTile.colorCode = 0;
            danceTile.ready = true;
        }
    }
    if (danceTile.event){
        danceTile.event();
    }
}

function SwitchColor(colorCode, nextSprite){

    switch(colorCode){
        case -1:
            nextSprite.tint = 'cyan';
            break;
        case 0:
            nextSprite.tint = 'yellow';
            break;
        case 1:
            nextSprite.tint = 'magenta';
            break;
        case 2:
            nextSprite.tint = 'cyan';
            break;
    }
}

function GetColorValue(danceTile){
    switch(danceTile.colorCode){
        case 0:
            return CodeValues[0];
        case 1:
            return CodeValues[1];
        case 2:
            return CodeValues[2];
        default:
            return 'white';
    }
}

export {CreateDanceTile}