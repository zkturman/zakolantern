import {Application, Graphics} from 'pixi.js'
import { useEffect, useRef } from 'react';
import './JournalEntries.css';

function JournalEntries(){
    const containerRef = useRef(null);
    const appRef = useRef(null);
    const loadingRef = useRef(false);

    function pageButtonClick(pagesToIncrement){
        console.log(pagesToIncrement);
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
        app.stage.addChild(leftButton);

        const rightButton = new Graphics();
        rightButton
            .rect(app.canvas.width - buttonDimensions.width, centerHeight, buttonDimensions.width, buttonDimensions.height)
            .fill({color: 'black'});
        rightButton.eventMode = 'static';
        rightButton.on('pointerdown', () => pageButtonClick(1));
        app.stage.addChild(rightButton);
    }

    useEffect(() => {
        if (loadingRef.current) return;

        async function init(){
            loadingRef.current = true;
            const app = new Application();
            await app.init({backgroundColor: '#b63fa0ff', resizeTo: containerRef.current});
            containerRef.current.appendChild(app.canvas);
            generateButtons(app);
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