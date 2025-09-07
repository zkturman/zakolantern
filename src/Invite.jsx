import './Invite.css';

function Invite(){
    const partyDetails = [
        {
            header: "Seal the Demon",
            body: [
                `The adventures continues during this year's annual Halloween party. 
                It's up to you to seal the demon that your team has unleashed!`
            ]
        },
    ]

    return (
        <>
            <div className="invite-container">
            </div>
            <div>
                {partyDetails.map(item => (
                    <div key={item}>
                        <h2 className='body-text-color'>{item.header}</h2>
                        <p className='body-text-color'>{item.body}</p>
                    </div>
                ))}
                <h2 className="body-text-color">Halloween Party</h2>
                <p>

                </p>
                <h2 className="body-text-color">Details</h2>
                <p>
                    When: 18:30 on 31 October, 2025
                </p>
                <p>
                    Where: My flat
                </p>
                <h2 className='body-text-color'>Theme</h2>
                <p>
                    Join the investigation of the Devil's Tongue Settlement in Fury Gorge. Be 
                    part of the team in the 1960s trying re-seal the demon they accidentally 
                    unleashed. Indiana Jones meets The Exorcist. 
                </p>
                <h2 className='body-text-color'>Party</h2>
                <p>
                    Dress up, yada yada
                </p>
            </div>
        </>
    );
}

export {Invite};