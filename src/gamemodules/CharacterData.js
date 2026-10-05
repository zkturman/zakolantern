const BorisBlank = {
    name: "Boris",
    dialog: [
        "..."
    ],
    sprites: [
        '/assets/Boris_Dialog.png'
    ],
    overworld: {
        sprite: '/assets/Boris_Overworld.png',
        animations: '/assets/Boris_Overworld.json',
        default: 'idle',
        loop: true,
        speed: 0.8
    }
}

const Arturo = {
    name: "Arturo",
    dialog: [
        "Hagatha doesn't like us telling newbies that code. No she sure doesn't. She's really protective of her club.",
        "But me, I'm what you could call... a fun guy. And I know a way around her little magical protections.",
        "I can't give you the actual code, but between me and Boris over there, I think we can get you in.",
        "The first clue is really important. The password is a dance, and it goes like this...",
        "RIGHT!",
        "And then... ",
        "UP!",
        "Followed by a... ",
        "RIGHT!",
        "And finally, you gotta move... ",
        "LEFT!",
        "Now, Boris, help 'em out."
    ],
    sprites: [
        '/assets/Arturo_Dialog.png'
    ],
    overworld: {
        sprite: '/assets/Arturo_Overworld.png',
        animations: '/assets/Arturo_Overworld.json',
        default: 'idle',
        loop: true,
        speed: 1.0
    }
}

const BorisHelpful = {
    name: "Boris",
    dialog: [
        "Boris no good with words...",
        "Hagatha no like Boris, but Boris think he like you.",
        "Code not hard, just need tricks.",
        "Pink is up because pink is hot.",
        "Yellow is happy, and happy is right. Yellow mean up.",
        "And blue left. She left and now Boris blue.",
        "Boris wish Boris was happy...",
        "That how Boris remember dance."
    ],
    sprites: [
        '/assets/Boris_Dialog.png'
    ],
    overworld: {
        sprite: '/assets/Boris_Overworld.png',
        animations: '/assets/Boris_Overworld.json',
        default: 'idle',
        loop: true,
        speed: 0.8
    }
}

const DoorEye = {
    overworld: {
        sprite: '/assets/DoorEye.png',
        animations: '/assets/DoorEye.json',
        default: 'move',
        loop: true,
        speed: 0.1
    }
}

const DanceTile = {
    overworld: {
        sprite: '/assets/DanceTile.png',
        animations: '/assets/DanceTile.json',
        default: 'fade',
        loop: false,
        speed: 0.5
    }
}

const HagathaDance = {
       overworld: {
        sprite: '/assets/HagathaDance.png',
        animations: '/assets/HagathaDance.json',
        default: 'dance',
        loop: true,
        speed: 0.05
    } 
}

export {BorisBlank, BorisHelpful, Arturo, DoorEye, DanceTile, HagathaDance}