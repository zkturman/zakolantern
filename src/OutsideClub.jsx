import {Application, Graphics, Container, Text, TextStyle, Assets, TilingSprite, Sprite} from 'pixi.js'
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { OverworldCharacter } from './gamemodules/OverworldCharacter.js';
import { JournalEntryData } from './data/database.js';
import { JournalSfx, JournalTheme } from './data/assetkeys.js';
import { Howl } from 'howler';
import './OutsideClub.css';
import { Vector2D } from './gamecore/Vector2D.js';
import { Arturo, BorisBlank, BorisHelpful, DanceTile, DoorEye } from './gamemodules/CharacterData.js';
import { GameObject } from './gamecore/GameObject.js';
import { OverworldClubEntrance } from './gamemodules/OverworldClubEntrance.js';
import { DialogTemplate } from './gamemodules/DialogTemplate.js';
import { GenerateCode } from './gamemodules/CodeGenerator.js';
import { LoadAnimatedSpriteData, LoadSpriteData } from './gamecore/AssetStore.js';

function OutsideClub(){
    const containerRef = useRef(null);
    const appRef = useRef(null);
    const loadingRef = useRef(false);
    const leftButtonRef = useRef(null);
    const rightButtonRef = useRef(null);
    let currentPage = 0;
    const pageSounds = JournalSfx.map(asset => new Howl({
        src: [asset],
        volumen: 1.0
    }));
    const themeMusicRef = useRef(null);
    const journalTextureRef = useRef(null);
    const buttonTextureRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (loadingRef.current) return;

        async function init(){
            loadingRef.current = true;
            const app = new Application();
            await app.init({backgroundColor: 'black', resizeTo: containerRef.current});
            containerRef.current.appendChild(app.canvas);
            
              let context = {
                app: app,
                gameObjects: [],
                colliderId: 0,
                colliders: [],
                collisions: new Map(),
                controllerKey: 'keyboard',
                code: GenerateCode(4),
                endGameEvent: () => navigate('/2026/invite'),
            };
            await LoadSpriteData('/assets/ClubEntrance_Overworld.png');
            await LoadSpriteData(BorisBlank.sprites[0]);
            await LoadSpriteData(BorisHelpful.sprites[0]);
            await LoadSpriteData(Arturo.sprites[0]);
            await LoadAnimatedSpriteData(Arturo.overworld);
            await LoadAnimatedSpriteData(BorisBlank.overworld);
            await LoadAnimatedSpriteData(BorisHelpful.overworld);
            await LoadAnimatedSpriteData(DoorEye.overworld);
            await LoadAnimatedSpriteData(DanceTile.overworld);

            let backgroundTexture = await Assets.load('/assets/FloorTile.png');
            let background = new TilingSprite({
                texture: backgroundTexture,
                width: backgroundTexture.width,
                height: app.screen.height
            });
            app.stage.addChild(background);
            background.position.set(app.canvas.width / 2 - backgroundTexture.width / 2, 0);

            let BorisBlankCharacter = new OverworldCharacter(context, BorisBlank, new Vector2D(200, 500));
            context.gameObjects.push(BorisBlankCharacter);
            let ArturoCharacter = new OverworldCharacter(context, Arturo, new Vector2D(40, 300));
            ArturoCharacter.hide();
            context.gameObjects.push(ArturoCharacter);

            let BorisFinalCharacter = new OverworldCharacter(context, BorisHelpful, new Vector2D(200, 500));
            BorisFinalCharacter.hide();
            context.gameObjects.push(BorisFinalCharacter);
            
            BorisBlankCharacter.dialogEndEvent = () => {
                ArturoCharacter.show();
            }

            ArturoCharacter.dialogEndEvent = () => {
                BorisFinalCharacter.show();
                GameObject.destroy(BorisBlankCharacter);
            }

            let clubEntrance = new OverworldClubEntrance(context, DoorEye.overworld, DanceTile.overworld);
            context.gameObjects.push(clubEntrance);
            context.dialog = new DialogTemplate(context);
            context.gameObjects.push(context.dialog);

            // Assets.addBundle('fonts', [{
            //     alias: 'CasualCursive',
            //     src: "/assets/CasualCursive.ttf"
            // }]);
            // await Assets.loadBundle('fonts');
            app.ticker.add((time) => {
                for (let i = 0; i < context.gameObjects.length; i++){
                    if (!context.gameObjects[i].isDestroyed && context.gameObjects[i].isEnabled){
                        context.gameObjects[i].update(time.deltaMS);
                        context.gameObjects[i].draw();
                    }
                }
            });
            appRef.current = app;
            // themeMusicRef.current = new Howl({src: [JournalTheme], loop: true, volume: 0.2, preload: true});
            // themeMusicRef.current.play();
        }

        init();

        return () => {
            if (appRef.current){
                appRef.current.destroy(true, true);
                appRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        return () => {
            themeMusicRef.current?.stop();
        };
    }, [location]);

    return(
        <>
            <div
                id="journal-container"
                ref={containerRef} 
            />
        </>
    );
}

export {OutsideClub};