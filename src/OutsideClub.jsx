import {Application, Assets, Cache, TilingSprite} from 'pixi.js'
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OverworldCharacter } from './gamemodules/OverworldCharacter.js';
import { Howl } from 'howler';
import './OutsideClub.css';
import { Vector2D } from './gamecore/Vector2D.js';
import { Arturo, BorisBlank, BorisHelpful, DanceTile, DoorEye, HagathaDance } from './gamemodules/CharacterData.js';
import { GameObject } from './gamecore/GameObject.js';
import { OverworldClubEntrance } from './gamemodules/OverworldClubEntrance.js';
import { DialogTemplate } from './gamemodules/DialogTemplate.js';
import { LoadAnimatedSpriteData, LoadSpriteData } from './gamecore/AssetStore.js';
import { IntroScreen } from './gamemodules/IntroScreen.js';

function OutsideClub(){
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const appRef = useRef(null);
    const loadingRef = useRef(false);

    useEffect(() => {
        if (loadingRef.current) return;

        async function init(){
            loadingRef.current = true;
            const app = new Application();
            Cache.reset();
            await app.init({backgroundColor: 'black', resizeTo: containerRef.current});
            Howler.stop();
            containerRef.current.appendChild(app.canvas);
            
              let context = {
                app: app,
                gameObjects: [],
                colliderId: 0,
                colliders: [],
                collisions: new Map(),
                controllerKey: 'keyboard',
                code: ["yellow", "pink", "yellow", "blue"],
                endGameEvent: () => navigate('/2026/invite'),
                mainTheme: new Howl({src: ['/assets/OutsideClub.wav'], loop: true, volume: 0.3, preload: true}),
                danceTheme: new Howl({src: ['/assets/ClubMysterio.wav'], loop: true, volume: 0.4, preload: true})
            };

            let clubOverworld = {
                sprite: '/assets/ClubEntrance_Overworld.png',
                animations: '/assets/ClubEntrance_Overworld.json',
                speed: 0.07,
                loop: true,
                default: 'pulse'
            }

            let danceBackground = {
                sprite: '/assets/Dance_Background.png',
                animations: '/assets/Dance_Background.json',
                speed: 0.2,
                loop: true,
                default: 'flash'
            }
            await Assets.load({alias: 'Bombard', src: '/assets/BOMBARD_.otf', data:{ family: 'Bombard'}});
            await Assets.load({alias: 'Chunky Heart', src: '/assets/CHUNKY HEART SOLID.otf', data:{ family: 'Chunky Heart'}});
            await Assets.load({alias: 'Crystal Radio Kit', src: '/assets/Crystal Radio Kit.otf', data:{ family: 'Crystal Radio Kit'}});
            await LoadAnimatedSpriteData(clubOverworld);
            await LoadAnimatedSpriteData(danceBackground);
            await LoadSpriteData('/assets/Dialog_Background.png');
            await LoadSpriteData('/assets/Dance_Floor.png');
            await LoadSpriteData(BorisBlank.sprites[0]);
            await LoadSpriteData(BorisHelpful.sprites[0]);
            await LoadSpriteData(Arturo.sprites[0]);
            await LoadAnimatedSpriteData(Arturo.overworld);
            await LoadAnimatedSpriteData(BorisBlank.overworld);
            await LoadAnimatedSpriteData(BorisHelpful.overworld);
            await LoadAnimatedSpriteData(DoorEye.overworld);
            await LoadAnimatedSpriteData(DanceTile.overworld);
            await LoadAnimatedSpriteData(HagathaDance.overworld);

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

            let clubEntrance = new OverworldClubEntrance(context, clubOverworld, DoorEye.overworld, DanceTile.overworld, HagathaDance.overworld, danceBackground);
            context.gameObjects.push(clubEntrance);
            context.dialog = new DialogTemplate(context);
            context.gameObjects.push(context.dialog);

            let introScreen = new IntroScreen(context);
            context.gameObjects.push(introScreen);

            app.ticker.add((time) => {
                for (let i = 0; i < context.gameObjects.length; i++){
                    if (!context.gameObjects[i].isDestroyed && context.gameObjects[i].isEnabled){
                        context.gameObjects[i].update(time.deltaMS);
                        context.gameObjects[i].draw();
                    }
                }
            });
            context.mainTheme.play();
            appRef.current = app;
        }

        init();

        return () => {
            if (appRef.current){
                appRef.current.destroy(true, true);
                appRef.current = null;
            }
        };
    }, []);

    return(
        <>
            <div
                id="game-container"
                ref={containerRef} 
            />
        </>
    );
}

export {OutsideClub};