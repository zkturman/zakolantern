import {Application, Graphics, Container, Assets, Sprite} from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Howl } from 'howler';
import { ChimeSfx, ChimeTheme, ChimeTextures, ChimeDoomSfx, ChapelBeamTexture, ChapelWallTexture } from './data/assetkeys';
import './ChimeAction.css';

function ChimeAction(){

    const containerRef = useRef(null);
    const appRef = useRef(null);
    const loadingRef = useRef(false);
    const solutionPattern = [4, 2, 4, 3];
    const currentAnswer = [0];
    const chimeSounds = ChimeSfx.map(asset => new Howl({
        src: [asset],
        volume: 0.8
    }));
    const unleashedSound = new Howl({src: ChimeDoomSfx, volume: 0.6});
    const themeMusicRef = useRef(null);  
    const chimeTextureRef = useRef(null);  
    const wallTextureRef = useRef(null);
    const beamTextureRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    function chimeClick(chimeIndex){
        let numberCorrect = 0;
        for (let i = 0; i < currentAnswer.length; i++){
            if (currentAnswer[i] === solutionPattern[i]){
                numberCorrect++;
            }
        }

        if (numberCorrect < solutionPattern.length){
            chimeSounds[chimeIndex].play();
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
            unleashedSound.play();
            navigate("/invite");
        }
    }

    function generateWalls(app){
        let scale = 1;
        if (app.canvas.width / app.canvas.height < 1){
            scale = 0.5;
        }
        let leftWall = new Sprite(wallTextureRef.current);
        leftWall.height = app.canvas.height;
        leftWall.scale.x = scale;
        app.stage.addChild(leftWall);
        let rightWall = new Sprite(wallTextureRef.current);
        rightWall.height = app.canvas.height;
        rightWall.scale.x = -1 * scale;
        rightWall.position.set(app.canvas.width, 0);
        app.stage.addChild(rightWall);
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
            console.log(chimeTextureRef.current[i]);
            let chimeSprite = new Sprite(chimeTextureRef.current[i]);
            chimeSprite.width = width;
            chimeSprite.height = height;
            chimeSprite.position.set((i * (width + buffer)), 0);
            chimeSprite.eventMode = 'static';
            chimeSprite.on('pointerdown', () => chimeClick(i));
            container.addChild(chimeSprite);
        }
        container.position.set(app.canvas.width / 2 - (container.width / 2),
            app.canvas.height / 2 - (container.height / 2));
        app.stage.addChild(container);
        let crossbeam = new Sprite(beamTextureRef.current);
        crossbeam.width = app.canvas.width;
        crossbeam.height = width * 1.5;
        crossbeam.position.set(0, 0);
        app.stage.addChild(crossbeam);
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
            chimeTextureRef.current = await Promise.all(ChimeTextures.map(asset => Assets.load(asset)));
            console.log(chimeTextureRef.current);
            wallTextureRef.current = await Assets.load(ChapelWallTexture);
            beamTextureRef.current = await Assets.load(ChapelBeamTexture);
            generateWalls(app);
            generateChimes(app);
            appRef.current = app;
            themeMusicRef.current = new Howl({src: [ChimeTheme], loop: true, volume: 0.5, preload: true});
            themeMusicRef.current.play();
            console.log(themeMusicRef.current);
        };
        init();

        return () => {
            if (appRef.current) {
                appRef.current.destroy(true, true);
                appRef.current = null;
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