import { Container, Graphics, Text } from "pixi.js";
import { GameObject } from "../gamecore/GameObject";
import { FadeAnimator } from "./MenuAnimator";
import { Vector2D } from "../gamecore/Vector2D";
import { BaseButtonStyle, BaseParagraphStyle } from "./TextStyling";

class IntroScreen extends GameObject{
    intro = [
        "Deep in the woods, where no humans go, there is a large door at the base of an ancient oak tree. At night, the heavy bass of music can be heard mixed with the screams of monsters.",
        "But they're not screaming for any of the usual reasons. This is Club Mysterio, and it's monsters only. No heroes or heroines are around to stop them from letting their hair down and claws out.",
        "Tonight you've decided to give the club a try. However, the Bog Witch Hagatha, who runs the place, is annoyingly particular. Only monsters that can dance the right dance for her Guardian Eye may enter.",
        "Maybe another monster knows the code..."
    ]

    actions = []
    elapsedTimeInMs = 0;
    readyToStart = false;

    constructor(context){
        super(context, new Vector2D(0, 0,), new Vector2D(0, 0));
        this.screen = new Container();
        
        let background = new Graphics();
        background.rect(0, 0, this.context.app.canvas.width, this.context.app.canvas.height);
        background.fill('black');
        this.screen.addChild(background);
        this.lines = new Container();
        this.screen.addChild(this.lines);
        let style = BaseParagraphStyle();
        style.fill = 'white';
        style.fontSize = 22;
        if (this.context.app.canvas.height < 700){
            style.fontSize = 20;
        }

        style.wordWrapWidth = this.context.app.canvas.width * 0.9;

        for (let i = 0; i < this.intro.length; i++){
            let line = new Text({
                    text: this.intro[i],
                    style: style
            });
            this.lines.addChild(line);
            line.position.set(0, i * (this.context.app.canvas.height / this.intro.length));
            this.actions.push({ 
                action: new FadeAnimator(line, 1, "in"),
                duration: 3000
            });
        }

        this.lines.position.set(this.context.app.canvas.width / 2 - this.lines.width / 2, 
            this.context.app.canvas.height / 2 - this.lines.height / 2);

        this.screen.eventMode = 'static';
        this.screen.on('mousedown', () => {
            this.onClick();
        });
        this.screen.on('touchstart', () => {
            this.onClick();
        })

        let messageStyle = BaseButtonStyle();
        messageStyle.fontSize = 24;
        this.continueMessage = new Text({text: "Tap to continue",
            style: messageStyle
        })
        this.screen.addChild(this.continueMessage);
        this.continueMessage.position.set(this.context.app.canvas.width - this.continueMessage.width - 10, 
            this.context.app.canvas.height - this.continueMessage.height - 10);

        this.continueFader = new FadeAnimator(this.continueMessage, 1, "in");
        this.screenFader = new FadeAnimator(this.screen, 1, "out");
        this.context.app.stage.addChild(this.screen);
    }

    onClick(){
        if (this.actions.length == 0){
            this.continueMessage.visible = false;
            this.readyToStart = true;
        }
    }

    update(deltaTime){
        this.elapsedTimeInMs += deltaTime;
        if (this.actions.length > 0){
            this.actions[0].action.play(deltaTime);
            if (this.elapsedTimeInMs > this.actions[0].duration){
                this.actions.splice(0, 1);
                this.elapsedTimeInMs = 0;
            }
        }
        else if (this.readyToStart){
            this.screenFader.play(deltaTime);

            if (this.screenFader.isDone()){
                this.screen.visible = false;
                GameObject.destroy(this);
            }
        }
        else{
            this.continueFader.play(deltaTime);
        }
    }
}

export { IntroScreen }