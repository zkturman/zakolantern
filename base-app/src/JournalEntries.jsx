import {Application, Graphics, Container, Text, TextStyle} from 'pixi.js'
import { useEffect, useRef } from 'react';
import { JournalEntryData } from '../data/database.js';
import './JournalEntries.css';

function JournalEntries(){
    const containerRef = useRef(null);
    const appRef = useRef(null);
    const loadingRef = useRef(false);
    const leftButtonRef = useRef(null);
    const rightButtonRef = useRef(null);
    let currentPage = 0;

    function pageButtonClick(pagesToIncrement){
        let numberOfPages = JournalEntryData.Entries.length;
        let nextPage = currentPage + pagesToIncrement;
        if ((nextPage >= 0) && (nextPage < numberOfPages)){
            currentPage = nextPage;
            appRef.current.stage.removeChildren();
            renderButtons(appRef.current);
            renderJournalEntry(appRef.current, JournalEntryData.Entries[currentPage]);
        }
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
            wordWrapWidth: width
        });
        const dateText = new Text({text: entry.Date, style: style});
        container.addChild(dateText);
        const journalText = new Text({text: entry.Text, style: style});
        journalText.position.set(0, 100);
        // journalText.width = width;
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
        const leftButton = new Graphics();
        leftButton
            .rect(0, centerHeight, buttonDimensions.width, buttonDimensions.height)
            .fill({color: 'black'});
        leftButton.eventMode = 'static';
        leftButton.on('pointerdown', () => pageButtonClick(-1));
        leftButtonRef.current = leftButton;

        const rightButton = new Graphics();
        rightButton
            .rect(app.canvas.width - buttonDimensions.width, centerHeight, buttonDimensions.width, buttonDimensions.height)
            .fill({color: 'black'});
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
            generateButtons(app);
            renderButtons(app);
            renderJournalEntry(app, JournalEntryData.Entries[currentPage]);
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
                id="journal-container"
                ref={containerRef} 
            />
        </>
    );
}

export {JournalEntries};