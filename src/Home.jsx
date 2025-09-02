import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import './Home.css';
import { useLocation } from 'react-router-dom';

function Home(){
    const [storyIndex, setStoryIndex] = useState(0);
    const location = useLocation();
    const themeRef = useRef(null);
    const scenarioData = 
    [
        [
            {
                text: 'Reportings from campers and climbers in Fury Gorge have cropped up over the last several decades.',
            },        
            {
                text: 'Weird shadows in the night, strange calls. Missing people with no bodies ever found.',
            },
            {
                text: 'A recent group discovered evidence of an old settlement at the base of the waterfall, the Devil\'s Tongue.',
            },
        ],
        [
            {
                text: 'You are part of the research group investigating the ruins...',
            },
            {
                text: 'One of your team members disappeared overnight.',
            },            
            {
                text: 'The only building left from the settlement, an old chapel, seems to be the source of the evil, but can you solve the mystery before time runs out?',
            },
        ]
    ];

    function buttonClick(){
        setStoryIndex(storyIndex + 1);
        themeRef.current = new Howl({src: "/assets/IntroChime.wav", volume: 0.5, loop: false});
        themeRef.current.play();
    }

    useEffect(() => {
        return () => {
            themeRef.current?.stop();
        }
    }, [location]);

    return (
        <>
            <div className="scenario-container">
                {scenarioData[storyIndex].map((item, index) => (
                    <p 
                        key={`${storyIndex}-${index}`} 
                        className="story-note fade-in" 
                        style={{
                            animationDelay: `${index}s`
                        }}>{item.text}</p>
                ))}
                {(storyIndex + 1 < scenarioData.length) && <button
                    className="fade-in" onClick={() => {buttonClick();}}
                    style={{
                        animationDelay: `${scenarioData[storyIndex].length}s`
                    }}
                    >
                    Continue
                </button>}
            </div>
        </>
    );
}

export {Home};