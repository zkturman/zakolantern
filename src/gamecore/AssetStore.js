import { Assets } from "pixi.js";

const SpriteTextures = {};

async function LoadSpriteData(path) {
    if (!SpriteTextures[path]){
        let texture = await Assets.load(path);
        texture.source.scaleMode = 'nearest';
        SpriteTextures[path] = texture;
    }
}

function GetTexture(path){
    if (!SpriteTextures[path])
        return null;

    return SpriteTextures[path];
}

export {LoadSpriteData, GetTexture}