import {Application, Graphics, Container, Text, TextStyle, Assets, TilingSprite, Sprite} from 'pixi.js'
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { JournalEntryData } from './data/database.js';
import { JournalSfx, JournalTheme } from './data/assetkeys.js';
import { Howl } from 'howler';
import './JournalEntries.css';

function JournalEntries(){
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
            fontSize: 45,
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
        leftButton.scale.set(-1, 1.5);
        leftButton.position.set(leftButton.width, centerHeight);
        leftButton.eventMode = 'static';
        leftButton.on('pointerdown', () => pageButtonClick(-1));
        leftButtonRef.current = leftButton;

        const rightButton = new Sprite(buttonTextureRef.current);
        rightButton.scale.set(1, 1.5);
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
            await app.init({backgroundColor: '#b63fa0ff', resizeTo: containerRef.current});
            containerRef.current.appendChild(app.canvas);
            journalTextureRef.current = await Assets.load("/assets/JournalTexture.png");
            buttonTextureRef.current = await Assets.load("/assets/JournalButton.png");
            Assets.addBundle('fonts', [{
                alias: 'CasualCursive',
                src: "/assets/CasualCursive.ttf"
            }]);
            await Assets.loadBundle('fonts');
            generateButtons(app);
            renderJournalEntry(app, JournalEntryData.Entries[currentPage]);
            renderButtons(app);
            appRef.current = app;
            themeMusicRef.current = new Howl({src: [JournalTheme], loop: true, volume: 0.2, preload: true});
            themeMusicRef.current.play();
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

export {JournalEntries};