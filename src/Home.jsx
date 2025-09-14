import { useState, useEffect, useRef } from 'react';
import { Howler, Howl } from 'howler';
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
                text: 'Weird shadows in the night, strange sounds. Missing people. No bodies.',
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
                text: 'One of your team members disappeared overnight into the shadows.',
            },            
            {
                text: 'The only building left from the settlement, an old chapel, seems to be the source of the evil, but can you solve the mystery of its opressive chimes?',
            },
        ]
    ];

    function buttonClick(){
        setStoryIndex(storyIndex + 1);
        themeRef.current.play();
        themeRef.current = new Howl({src: ['/assets/IntroTheme.wav', '/assets/IntroTheme.mp3'], volume: 0.5, loop: true, preload: true});
        themeRef.current.play();
    }

    useEffect(() => {
        themeRef.current = new Howl({ src: ['/assets/IntroChime.wav', '/assets/IntroChime.mp3'], volume: 0.5, loop: false, preload: true });

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
                        className="story-note body-text-color fade-in" 
                        style={{
                            animationDelay: `${index}s`
                        }}>{item.text}</p>
                ))}
                {(storyIndex + 1 < scenarioData.length) && <button
                    className="fade-in body-text-color" onClick={() => {buttonClick();}}
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