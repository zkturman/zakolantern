import {Application, Graphics, Container} from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Howl } from 'howler';
import './ChimeAction.css';

function ChimeAction(){

    const containerRef = useRef(null);
    const appRef = useRef(null);
    const loadingRef = useRef(false);
    const solutionPattern = [4, 2, 4, 3];
    const currentAnswer = [0];
    const chimeSounds = 
    [
        new Howl({src: ["assets/Chime1.wav"], volume: 1.0}),
        new Howl({src: ["assets/Chime2.wav"], volume: 1.0}),
        new Howl({src: ["assets/Chime4.wav"], volume: 1.0}),
        new Howl({src: ["assets/Chime3.wav"], volume: 1.0}),
    ];
    const themeMusicRef = useRef(null);    const navigate = useNavigate();
    const location = useLocation();

    function chimeClick(chimeIndex){
        chimeSounds[chimeIndex].play();
        let numberCorrect = 0;
        for (let i = 0; i < currentAnswer.length; i++){
            if (currentAnswer[i] === solutionPattern[i]){
                numberCorrect++;
            }
        }
        
        if (numberCorrect === chimeIndex){
            let newCount = ++currentAnswer[chimeIndex];
            if (newCount === solutionPattern[chimeIndex]){
                currentAnswer.push(0);
            }
        }
        else{
            currentAnswer.length = 0;
            currentAnswer.push(0);
        }

        if (currentAnswer.length > solutionPattern.length){
            navigate("/invite");
        }
    }

    function generateChimes(app){
        const ratio = app.canvas.width / app.canvas.height;
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
            themeMusicRef.current = new Howl({src: ["assets/ChimeTheme.wav"], loop: true, volume: 0.8});
            themeMusicRef.current.play();
        };
        init();

        return () => {
            if (appRef.current) {
                appRef.current.destroy(true, true);
                appRef.current = null;
                themeMusicRef.current.stop();
            }
        };
    }, []);

    useEffect(() => {
        return () => {
            themeMusicRef.current?.stop();
        }
    }, [location]);

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