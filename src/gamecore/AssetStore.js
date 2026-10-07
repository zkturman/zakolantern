import { AnimatedSprite, Assets, Spritesheet } from "pixi.js";

const SpriteTextures = {};

async function LoadSpriteData(path) {
    if (!SpriteTextures[path]){
        let texture = await Assets.load(path);
        texture.source.scaleMode = 'nearest';
        SpriteTextures[path] = texture;
    }
}

async function LoadAnimatedSpriteData(data){
    if (!SpriteTextures[data.sprite]) {
        let atlasResponse = await fetch(data.animations);
        let atlas = await atlasResponse.json();
        let sprite = await Assets.load(data.sprite);
        sprite.source.scaleMode = 'nearest';
        let spritesheet = new Spritesheet(sprite, atlas);
        await spritesheet.parse();
        SpriteTextures[data.sprite] = spritesheet;
    }
}

function GetTexture(path){
    if (!SpriteTextures[path])
        return null;

    return SpriteTextures[path];
}

export {LoadSpriteData, LoadAnimatedSpriteData, GetTexture}