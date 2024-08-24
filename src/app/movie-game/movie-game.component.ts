import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-movie-game',
  templateUrl: './movie-game.component.html',
  styleUrls: ['./movie-game.component.css']
})
export class MovieGameComponent implements OnInit, AfterViewInit {

  private app: PIXI.Application;
  private skullImage: PIXI.Texture;
  
  constructor() { 
    this.app = new PIXI.Application();
    const app2 = new PIXI.Application();

  }

  async ngOnInit(): Promise<void> {
    let gameScreen = document.getElementsByClassName("game-container")[0];
    await this.app.init({
        width: gameScreen.clientWidth,
        height: gameScreen.clientHeight,
        background: '#1099bb'
    });
    gameScreen.appendChild(this.app.canvas);
    this.skullImage = await PIXI.Assets.load('../../assets/skull-skeleton-icon.png');
    let targetNumber = 5;
    let targetWidth = this.app.screen.width / targetNumber;
    for (let i = 0; i < targetNumber; i++){
      this.createTarget(targetWidth * i + (targetWidth / 2), this.app.screen.height / 2);
    }
    // this.createTarget(this.app.screen.width / 2, this.app.screen.height / 2);
  }

  createTarget(xPosition, yPosition){
    const skull = new PIXI.Sprite(this.skullImage);
    skull.height = 50;
    skull.width = 50;
    skull.anchor.set(0.5);
    skull.x = xPosition; this.app.screen.width / 2;
    skull.y = yPosition; this.app.screen.height / 2;

    this.app.stage.addChild(skull);
    let originalX = skull.x;
    let maxMovement = 10;
    let currentDirection = 1;
    this.app.ticker.add((time) =>{
      let currentRelativeX = skull.x - originalX;
      if (currentDirection === 1 && currentRelativeX > maxMovement){
        currentDirection = -1;
      }
      if (currentDirection === -1 && currentRelativeX < (maxMovement * -1)){
        currentDirection = 1;
      }
      skull.x += 0.1 * time.deltaTime * currentDirection * 3;
    });
  }

  ngAfterViewInit(): void {
  }

}
