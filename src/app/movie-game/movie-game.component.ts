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
  private enemies: PIXI.Sprite[] = [];
  private playerImage: PIXI.Texture;
  private player: PIXI.Sprite;

  
  constructor() { 
    this.app = new PIXI.Application();
    const app2 = new PIXI.Application();
  }

  async ngOnInit(): Promise<void> {
    window.addEventListener('orientationchange', function(){
      this.window.location.reload();
    });
    await this.initialiseGame();
  }

  async initialiseGame(){
    let gameScreen = document.getElementsByClassName("game-container")[0];
    await this.app.init({
        width: gameScreen.clientWidth,
        height: gameScreen.clientHeight,
        background: '#000300'
    });
    gameScreen.appendChild(this.app.canvas);
    this.skullImage = await PIXI.Assets.load('../../assets/skull-skeleton-icon.png');
    let targetNumber = 5;
    let targetWidth = this.app.screen.width / targetNumber;
    for (let i = 0; i < targetNumber; i++){
      let newSprite = this.createTarget(targetWidth * i + (targetWidth / 2), this.app.screen.height / 2);
      this.enemies.push(newSprite);
    }
    this.createPlayer();
  }

  createTarget(xPosition, yPosition): PIXI.Sprite{
    let skull = new PIXI.Sprite(this.skullImage);
    skull.height = this.app.screen.width * 0.05;
    skull.width = this.app.screen.width * 0.05;
    skull.anchor.set(0.5);
    skull.x = xPosition;
    skull.y = yPosition;

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
    return skull;
  }

  createPlayer(){
    this.player = new PIXI.Sprite(this.skullImage);
    this.player.height = 50;
    this.player.width = 50;
    this.player.anchor.set(0.5);
    this.player.x = this.app.screen.width / 2;
    this.player.y = this.app.screen.height - 50;

    this.app.stage.addChild(this.player);
  }

  movePlayer(value){
    console.log('move player ' + value);
  }

  fireLaser(){
    console.log('laser fired!');
  }

  ngAfterViewInit(): void {
  }

}
