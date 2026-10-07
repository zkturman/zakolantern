import { TextStyle } from "pixi.js";

const BaseButtonStyle = () => new TextStyle({
    fontFamily: ['Chunky Heart'],
    fontSize: 32,
    fill: 'white',
    align: 'center'
});

const BaseParagraphStyle = () => new TextStyle({
    fontFamily: ['Bombard'],
    fontSize: 16,
    fill: 'black',
    align: 'left',
    wordWrap: true
});

const BaseTitleStyle = () => new TextStyle({
    fontFamily: ['Crystal Radio Kit']
})


export {BaseButtonStyle, BaseParagraphStyle, BaseTitleStyle}