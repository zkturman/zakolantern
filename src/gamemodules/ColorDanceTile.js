import { Graphics } from "pixi.js";
import { CodeValues } from "./CodeGenerator";

function CreateDanceTile(){
    let danceTile = new Graphics();
    danceTile.rect(0, 0, 65, 65);
    danceTile.fill('white');
    danceTile.colorCode = -1;
    danceTile.eventMode = 'static';
    danceTile.on('mousedown', () => SwitchColor(danceTile));
    danceTile.on('touchstart', () => SwitchColor(danceTile));
    danceTile.GetColorValue = () => GetColorValue(danceTile);
    danceTile.ResetColor = () => {
        danceTile.colorCode = -1;
        danceTile.tint = 'white';
    }
    return danceTile;
}

function SwitchColor(danceTile){
    switch(danceTile.colorCode){
        case -1:
            danceTile.colorCode++;
            danceTile.tint = 'red';
            break;
        case 0:
            danceTile.colorCode++;
            danceTile.tint = 'blue';
            break;
        case 1:
            danceTile.colorCode++;
            danceTile.tint = 'yellow';
            break;
        case 2:
            danceTile.colorCode = 0;
            danceTile.tint = 'red';
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