import { useState, useEffect, useRef } from 'react';
import { Howler, Howl } from 'howler';
import './Home.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    function launchGame(){
        document.body.requestFullscreen();
        navigate('/game');
    }
    return (
        <>
            <div id="homeContainer">
                <div>
                    <p className="title-large">
                        The Haunting
                    </p>
                    <p className="title-small">
                        at
                    </p>
                    <p className="title-largest">
                        Club Mysterio
                    </p>
                </div>
                <button onClick={() => launchGame()}>
                    <span id="playButton">Play</span>
                </button> 
            </div>
        </>
    );
}

export {Home};