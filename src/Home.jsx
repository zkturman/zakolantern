import { useState, useEffect, useRef } from 'react';
import { Howler, Howl } from 'howler';
import './Home.css';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Home(){
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
                <NavLink to="/game">
                    <span id="playButton">Play</span>
                </NavLink> 
            </div>
        </>
    );
}

export {Home};