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
    name: "Arturuo",
    dialog: [
        "Hagatha doesn't like us telling newbies that code. No she sure doesn't. She's really protective of her club.",
        "But me, I'm what you could call... a fun guy. And I know a way around her little magical protections.",
        "I can't give you the full code, but between be a Boris over there, I think we can.",
        "The first part of the puzzle is really important. The password is a dance, and it goes like this...",
        "LEFT!",
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
        "Boris no like words...",
        "Hagatha no like Boris, but Boris like you.",
        "Red is up. Red is hot and so it means up.",
        "Blue is left. She left and now Boris blue.",
        "Yellow is right. Yellow is happy, and happy is right.",
        "Boris wish Boris was happy..."
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