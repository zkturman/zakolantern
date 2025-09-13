import {Application, Container, Graphics, Text, TextStyle, Assets, Sprite} from 'pixi.js'
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ResearchEntryData } from './data/database.js';
import { ChestSfx, ResearchTheme } from './data/assetkeys.js';
import './InvestigationNotes.css';

function InvestigationNotes(){
    const containerRef = useRef(null);
    const appRef = useRef(null);
    const loadingRef = useRef(false);
    const themeMusicRef = useRef(null);
    const tabSfx = ChestSfx.map(asset => new Howl({
        src: [asset],
        volume: 1.0
    }));
    const labelTextureRef = useRef(null);
    const location = useLocation();
    let currentNoteIndex = -1;

    function tabClick(index){
        currentNoteIndex = index;
        renderNotebookTabs(appRef.current, ResearchEntryData.Entries);
        if (currentNoteIndex >= 0){
            renderNote(appRef.current, ResearchEntryData.Entries[currentNoteIndex]);
        }
        let sfxIndex = Math.floor(Math.random() * 4);
        tabSfx[sfxIndex].play();
    }

    function renderNote(app, entry){
        const container = new Container();
        const noteBackground = new Graphics();
        noteBackground
            .rect(0, 0, app.canvas.width * 0.8, app.canvas.height * 0.6)
            .fill({color: '#efefe7ff'})
            .stroke({ width: 10, color: '#efefe7ff' });
        const shadow = new Graphics();
        shadow
            .rect(10, 10, app.canvas.width * 0.8, app.canvas.height * 0.6)
            .fill({color: '#1f1e1eff'});
        container.addChild(shadow);
        container.addChild(noteBackground);
        const style = new TextStyle({
            fontFamily: 'OldNewspaperTypes',
            wordWrap: true, 
            wordWrapWidth: app.canvas.width * 0.8
        });
        const authorLabel = new Text({text: entry.Author, style: style});
        container.addChild(authorLabel);
        const detailsText = new Text({
            text: entry.Text, 
            style: style, 
        });
        detailsText.position.set(0, 100);
        container.addChild(detailsText);
        container.position.set((app.canvas.width / 2) - (container.width / 2), 
            (app.canvas.height * 0.8 / 2) - (container.height / 2) + (app.canvas.height * .2));
        app.stage.addChild(container);
    }

    function renderNotebookTabs(app, entries){
        app.stage.removeChildren();
        const container = new Container();
        let tabWidth = app.canvas.width / 3;
        let tabHeight = app.canvas.height / 10;
        const style = new TextStyle({
            align: 'center',
            wordWrap: true,
            wordWrapWidth: tabWidth * 0.8,
            fontFamily: 'OldNewspaperTypes'
        });
        const selectedStyle = new TextStyle({
            align: 'center',
            wordWrap: true,
            wordWrapWidth: tabWidth * 0.8,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontFamily: 'OldNewspaperTypes'
        })
        for (let i = 0; i < entries.length; i++){
            let x = (i % 3) * tabWidth;
            let y = Math.floor(i / 3) * tabHeight;
            let tabContainer = new Container();
            let labelSprite = new Sprite(labelTextureRef.current);
            labelSprite.width = tabWidth;
            labelSprite.height = tabHeight;
            tabContainer.addChild(labelSprite);
            let labelText = new Text({text: entries[i].Date, style: i == currentNoteIndex ? selectedStyle: style});
            tabContainer.addChild(labelText);
            labelText.position.set((tabWidth / 2) - (labelText.width / 2), (tabHeight / 2) - labelText.height / 2);
            tabContainer.position.set(x, y);
            tabContainer.eventMode = 'static';
            tabContainer.on('pointerdown', () => tabClick(i));
            container.addChild(tabContainer);
        }
        app.stage.addChild(container);
    }

    useEffect(() =>{
        if (loadingRef.current) return;
        async function init(){
            loadingRef.current = true;
            const app = new Application();
            await app.init({backgroundColor: '#4a1a0d', resizeTo: containerRef.current});
            containerRef.current.appendChild(app.canvas);
            labelTextureRef.current = await Assets.load('/assets/DrawerTab.png');
            Assets.addBundle('fonts', [{
                alias: 'OldNewspaperTypes',
                src: '/assets/OldNewspaperTypes.ttf'
            }])
            await Assets.loadBundle('fonts');
            app.resize();
            renderNotebookTabs(app, ResearchEntryData.Entries);
            themeMusicRef.current = new Howl({src: [ResearchTheme], loop: true, volume: 0.2, preload: true});
            themeMusicRef.current.play();
            appRef.current = app;
        }
        init();

        return () => {
            if (appRef.current){
                appRef.current.destroy(true, true);
                appRef.current = null;
            }
        }
    }, []);

    useEffect(() => {
        return () => {
            themeMusicRef.current?.stop();
        }
    }, [location]);

    return (
        <>
            <div
                ref={containerRef} 
                id="investigation-container"
            />
        </>
    );
}

export {InvestigationNotes};