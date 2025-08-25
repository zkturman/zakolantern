import {Application, Graphics, Container} from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import './ChimeAction.css';

function ChimeAction(){

    const containerRef = useRef(null);
    const appRef = useRef(null);
    const loadingRef = useRef(false);
    const answers = [4, 2, 4, 3];

    function chimeClick(chimeIndex){
        console.log(chimeIndex);
    }

    function generateChimes(app){
        const ratio = app.canvas.width / app.canvas.height;
        console.log(app.canvas);
        const container = new Container();
        const height = app.canvas.height * .8;
        let width;
        let buffer;
        if (ratio > 1){
            width = app.canvas.width * 0.05;
            buffer = app.canvas.width * 0.03;
        }
        else{
            width = app.canvas.width * 0.15;
            buffer = app.canvas.width * 0.05;
        }

        for (let i = 0; i < 4; i ++){
            let chimeSprite = new Graphics();
            chimeSprite
                .rect((i * (width + buffer)), 0, width, height)
                .fill({color: '#6c6b6bff'});
            chimeSprite.eventMode = 'static';
            chimeSprite.on('pointerdown', () => chimeClick(i));
            container.addChild(chimeSprite);
        }
        container.position.set(app.canvas.width / 2 - (container.width / 2),
            app.canvas.height / 2 - (container.height / 2));
        app.stage.addChild(container);
    }

    useEffect(() => {
        if (loadingRef.current) return; 
        let app;
        async function init () {
            loadingRef.current = true;
            app = new Application();
            await app.init({ background: 'black', resizeTo: containerRef.current});
            containerRef.current?.appendChild(app.canvas);
            app.resize();
            generateChimes(app);
            appRef.current = app;
        };
        init();
        return () => {
            if (appRef.current) {
            appRef.current.destroy(true, true);
            appRef.current = null;
            }
        };
    }, []);



    return (
        <>
            <div
                id="chime-container"
                ref={containerRef}
            />
        </>
    );
}

export {ChimeAction};