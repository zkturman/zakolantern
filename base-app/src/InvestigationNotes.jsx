import {Application, Container, Graphics, Text, TextStyle, transformVertices} from 'pixi.js'
import { useEffect, useRef } from 'react';
import { ResearchEntryData } from '../data/database';
import './InvestigationNotes.css';

function InvestigationNotes(){
    const containerRef = useRef(null);
    const appRef = useRef(null);
    const loadingRef = useRef(false);
    let currentNoteIndex = -1;

    function tabClick(index){
        currentNoteIndex = index;
        renderNotebookTabs(appRef.current, ResearchEntryData.Entries);
        if (currentNoteIndex >= 0){
            renderNote(appRef.current, ResearchEntryData.Entries[currentNoteIndex]);
        }
    }

    function renderNote(app, entry){
        const container = new Container();
        const authorLabel = new Text({text: entry.Author});
        container.addChild(authorLabel);
        const detailsText = new Text({text: entry.Text});
        detailsText.position.set(0, 100);
        container.addChild(detailsText);
        container.position.set(0, app.canvas.height * .2);
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
            wordWrapWidth: tabWidth * 0.8
        });
        const selectedStyle = new TextStyle({
            align: 'center',
            wordWrap: true,
            wordWrapWidth: tabWidth * 0.8,
            fontStyle: 'italic',
            fill: 'blue'
        })
        for (let i = 0; i < entries.length; i++){
            let x = (i % 3) * tabWidth;
            let y = Math.floor(i / 3) * tabHeight;
            let tabRect = new Graphics();
            tabRect
                .rect(x, y, tabWidth, tabHeight)
                .fill({color: 'red', })
                .stroke({ width: 2, color: 0x000000 });
            tabRect.eventMode = 'static';
            tabRect.on('pointerdown', () => tabClick(i));
            container.addChild(tabRect);
            let labelText = new Text({text: entries[i].Date, style: i == currentNoteIndex ? selectedStyle: style});
            container.addChild(labelText);
            labelText.position.set(x + (tabWidth / 2) - (labelText.width / 2), y + (tabHeight / 2) - labelText.height / 2);
        }
        app.stage.addChild(container);
    }

    useEffect(() =>{
        if (loadingRef.current) return;
        async function init(){
            loadingRef.current = true;
            const app = new Application();
            await app.init({backgroundColor: '#891d1d', resizeTo: containerRef.current});
            containerRef.current.appendChild(app.canvas);
            app.resize();
            renderNotebookTabs(app, ResearchEntryData.Entries);
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