import {Application, Graphics, Container, Text, TextStyle, Assets, TilingSprite, Sprite} from 'pixi.js'
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { OverworldCharacter } from './gamemodules/OverworldCharacter.js';
import { JournalEntryData } from './data/database.js';
import { JournalSfx, JournalTheme } from './data/assetkeys.js';
import { Howl } from 'howler';
import './OutsideClub.css';
import { Vector2D } from './gamecore/Vector2D.js';
import { Arturo, BorisBlank, BorisHelpful } from './gamemodules/CharacterData.js';
import { GameObject } from './gamecore/GameObject.js';
import { OverworldClubEntrance } from './gamemodules/OverworldClubEntrance.js';
import { DialogTemplate } from './gamemodules/DialogTemplate.js';
import { GenerateCode } from './gamemodules/CodeGenerator.js';

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

    function pageButtonClick(pagesToIncrement){
        let numberOfPages = JournalEntryData.Entries.length;
        let nextPage = currentPage + pagesToIncrement;
        if ((nextPage >= 0) && (nextPage < numberOfPages)){
            currentPage = nextPage;
            appRef.current.stage.removeChildren();
            renderJournalEntry(appRef.current, JournalEntryData.Entries[currentPage]);
            renderButtons(appRef.current);
        }
        let soundIndex = Math.floor(Math.random() * 4);
        pageSounds[soundIndex].play();
    }

    function renderJournalEntry(app, entry){
        const container = new Container();
        const boxSize = new Graphics();
        boxSize.rect(0, 0, app.canvas.width * 0.8, app.canvas.height)
            .fill({color: '#00000000'});
        container.addChild(boxSize);
        let width = app.canvas.width * 0.8;
        const style = new TextStyle({
            align: 'left',
            wordWrap: true,
            wordWrapWidth: width,
            fontFamily: 'CasualCursive',
            fontSize: 30,
        });
        const journalTile = new TilingSprite({
            texture: journalTextureRef.current, 
            width: app.canvas.width,
            height: app.canvas.height,
        });
        app.stage.addChild(journalTile);
        journalTile.tileScale.set(0.5, 0.5);
        const dateText = new Text({text: entry.Date, style: style});
        container.addChild(dateText);
        const journalText = new Text({text: entry.Text, style: style});
        journalText.position.set(0, 100);
        container.addChild(journalText);
        container.position.set((app.canvas.width / 2) - (container.width / 2), 0);
        app.stage.addChild(container);
    }

    function renderButtons(app){
        if (currentPage != 0){
            app.stage.addChild(leftButtonRef.current);
        }
        if (currentPage != JournalEntryData.Entries.length - 1){
            app.stage.addChild(rightButtonRef.current);
        }
    }

    function generateButtons(app){
        const buttonDimensions = {
            height: app.canvas.height / 4, 
            width: app.canvas.width / 6
        };
        let centerHeight = (app.canvas.height / 2) - (buttonDimensions.height / 2);
        const leftButton = new Sprite(buttonTextureRef.current);
        leftButton.scale.set(-0.5, 2);
        leftButton.position.set(leftButton.width, centerHeight);
        leftButton.eventMode = 'static';
        leftButton.on('pointerdown', () => pageButtonClick(-1));
        leftButtonRef.current = leftButton;

        const rightButton = new Sprite(buttonTextureRef.current);
        rightButton.scale.set(0.5, 2);
        rightButton.position.set(app.canvas.width - leftButton.width, centerHeight);
        rightButton.eventMode = 'static';
        rightButton.on('pointerdown', () => pageButtonClick(1));
        rightButtonRef.current = rightButton;
    }

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

            let clubEntrance = new OverworldClubEntrance(context);
            context.gameObjects.push(clubEntrance);
            context.dialog = new DialogTemplate(context);
            context.gameObjects.push(context.dialog);

            // journalTextureRef.current = await Assets.load("/assets/JournalTexture.png");
            // buttonTextureRef.current = await Assets.load("/assets/JournalButton.png");
            // Assets.addBundle('fonts', [{
            //     alias: 'CasualCursive',
            //     src: "/assets/CasualCursive.ttf"
            // }]);
            // await Assets.loadBundle('fonts');
            // generateButtons(app);
            // renderJournalEntry(app, JournalEntryData.Entries[currentPage]);
            // renderButtons(app);
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