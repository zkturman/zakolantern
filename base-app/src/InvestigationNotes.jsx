import {Application} from 'pixi.js'
import { useEffect, useRef } from 'react';
import './InvestigationNotes.css';

function InvestigationNotes(){
    const containerRef = useRef(null);
    const appRef = useRef(null);
    const loadingRef = useRef(false);

    useEffect(() =>{
        if (loadingRef.current) return;
        async function init(){
            loadingRef.current = true;
            const app = new Application();
            await app.init({backgroundColor: '#891d1d', resizeTo: containerRef.current});
            containerRef.current.appendChild(app.canvas);
            app.resize();
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