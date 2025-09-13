import './Invite.css';

function Invite(){
    const partyDetails = [
        {
            header: "Banish the Watcher",
            body: [
                <p className='body-text-color'>The adventures continues during this year's 
                annual Halloween party. Join the 60s research team at the Devil's Tongue Settlement 
                in Fury Gorge. It's up to you to seal the demon that your team has 
                accidentally unleashed!</p>
            ]
        },
        {
            header: "Details",
            body: [
                <p className='body-text-color'><strong>When: </strong>1 November 2025'</p>,
                <p className='body-text-color'><strong>Where: </strong>1 Hanbury</p>,
                <p className='body-text-color'><strong>What to wear? </strong> Fancy dress</p>,
                <p className='body-text-color'><strong>Theme: </strong>Indiana Jones meets The Exorcist. The 60s.</p>
            ]
        },
        {
            header: 'Timeline',
            body: [
                <div>
                <p className='body-text-color'><strong>18:15</strong> - Party Start</p>
                <p className='body-text-color'><strong>18:30</strong> - Screening 1: Unleashed Classic</p>
                <p className='body-text-color screening-note'>The following activities will be occur alongside the film:</p>
                <ul>
                    <li className='body-text-color'>Cocktails and snacks</li>
                    <li className='body-text-color'>Games</li>
                    <li className='body-text-color'>Light dinner</li>
                </ul>
                <p className='body-text-color'><strong>20:00</strong> - Screening 2: From the Shadows</p>
                <p className='body-text-color screening-note'>The following activities will be occur alongside the film:</p>
                    <ul>
                        <li className='body-text-color'>Cocktails</li>
                        <li className='body-text-color'>Dessert</li>
                    </ul>
                </div>
            ]
        }
    ]

    return (
        <>
            <div className="invite-container">
            </div>
            <div className='invite-details'>
                {partyDetails.map((item, index) => (
                    <div key={`${item}-${index}`}>
                        <h2 className='body-text-color'>{item.header}</h2>
                        {item.body.map((detail, index) => (
                            <div key={`${detail}-${index}`} 
                            className='details-body'>
                                {detail}
                            </div>                        
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export {Invite};