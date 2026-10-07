import './Invite.css';

function Invite(){
    const partyDetails = [
        {
            header: "The Haunting at Club Mysterio",
            body: [
                <p className='body-text-color story-body'>
                    This year's theme is <strong>Monster Nightclub</strong>! Become a 
                    monster for the night as you return to Club Mysterio. You're first 
                    time at Club Mysterio was so fun you don't even remember it. If you had a blast 
                    getting to hang with Arturo and Boris, there's even more in store next time.
                </p>,
                <p className='body-text-color story-body'>
                    Since you're last visit, the club has been infested with an evil spirit. 
                    The witch Hagatha has asked you and your friends to help rid the club of 
                    its presence. 'It's no good for business, you see' was the only reason she 
                    gave. But why couldn't she ask someone (or anyone) else?
                </p>,
                <p className='body-text-color story-body'>
                    No matter. No one turns down a demand from Hagatha.  
                    Release your inner monster to squash evil with your best ghoul friends. 
                    Hey, if you survive, maybe it'll actualy be fun.
                </p>
            ]
        },
        {
            header: "Details",
            body: [
                <p className='body-text-color'><strong>When: </strong>31 October 2026 at 18:15</p>,
                <p className='body-text-color'><strong>Where: </strong>1 Hanbury</p>,
                <p className='body-text-color'><strong>What to wear? </strong> Fancy dress</p>,
                <p className='body-text-color'><strong>What to bring? </strong> Yourself!</p>,
            ]
        },
        {
            header: 'Timeline',
            body: [
                <div className='invite-timeline'>
                    <p className='body-text-color screening-title'>Screening 1: Monster Madness</p>
                    <p className='body-text-color screening-note'>During the film:</p>
                    <ul>
                        <li className='body-text-color'>- Games- </li>
                        <li className='body-text-color'>- Fish-n-Chips -</li>
                    </ul>
                    <hr />
                    <p className='body-text-color screening-title'>Screening 2: The Beast Within</p>
                    <p className='body-text-color screening-note'>During the film:</p>
                    <ul>
                        <li className='body-text-color'>- Cocktails -</li>
                        <li className='body-text-color'>- Dessert -</li>
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
                        <h2>{item.header}</h2>
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