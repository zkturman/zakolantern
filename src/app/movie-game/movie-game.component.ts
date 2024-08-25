import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-movie-game',
  templateUrl: './movie-game.component.html',
  styleUrls: ['./movie-game.component.css']
})
export class MovieGameComponent implements OnInit {

  private app: PIXI.Application;
  private skullImage: PIXI.Texture;
  private enemies: PIXI.Sprite[] = [];
  private enemyData: any[] = [];
  private playerImage: PIXI.Texture;
  private player: PIXI.Sprite;
  private playerDirection: number = 0;
  private laserShots: PIXI.Sprite[] = [];

  
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
    }
    this.createPlayer();
    this.app.ticker.add((time) => this.gameUpdate(time));
  }

  gameUpdate(delta){
    this.playerUpdate(delta);
    this.laserUpdate(delta);
    this.enemyUpdate(delta);
  }

  createTarget(xPosition, yPosition): PIXI.Sprite{
    let skull = new PIXI.Sprite(this.skullImage);
    skull.height = this.app.screen.width * 0.05;
    skull.width = this.app.screen.width * 0.05;
    skull.anchor.set(0.5);
    skull.x = xPosition;
    skull.y = yPosition;
    let direction = Math.round(Math.random()) === 1 ? 1 : -1;
    this.enemies.push(skull);
    this.enemyData.push({
      "x": skull.x, 
      "y": skull.y, 
      "direction": direction
    });
    this.app.stage.addChild(skull);
    return skull;
  }

  enemyUpdate(time){
    for (let i = 0; i < this.enemies.length; i++){
      let enemy = this.enemies[i];
      let originalX = this.enemyData[i].x;
      let maxMovement = 10;
      let currentDirection = this.enemyData[i].direction;
      let currentRelativeX = enemy.x - originalX;
      if (currentDirection === 1 && currentRelativeX > maxMovement){
        this.enemyData[i].direction = Math.round(Math.random()) - 1;
      }
      else if (currentDirection === -1 && currentRelativeX < (maxMovement * -1)){
        this.enemyData[i].direction = Math.round(Math.random());
      }
      else if (currentDirection === 0){
        this.enemyData[i].direction = Math.round((Math.random() * 2) - 1);
      }
      enemy.x += 0.1 * time.deltaTime * currentDirection * 3;
    }
  }

  createPlayer(){
    this.player = new PIXI.Sprite(this.skullImage);
    this.player.height = this.app.screen.width * 0.05;
    this.player.width = this.app.screen.width * 0.05;
    this.player.anchor.set(0.5);
    this.player.x = this.app.screen.width / 2;
    this.player.y = this.app.screen.height - 50;
    this.app.stage.addChild(this.player);
  }

  playerUpdate(time){
    if (!this.playerWithinBound()){
      this.playerDirection = 0;
    }
    this.player.x += 0.1 * time.deltaTime * this.playerDirection * 15;
  }

  movePlayer(value){
    this.playerDirection = value;
    if (!this.playerWithinBound()){
      this.playerDirection = 0;
    }
  }

  playerWithinBound(): boolean{
    if (this.playerDirection > 0){
      if (this.player.x + (this.player.width / 2) >= this.app.canvas.width){
        return false;
      }
    }
    else if (this.playerDirection < 0){
      if (this.player.x - (this.player.width / 2) <= 0){
        return false;
      }
    }
    return true;
  }


  fireLaser(){
    let laserBar = new PIXI.Sprite(this.skullImage);
    laserBar.height = this.app.screen.width * 0.05;
    laserBar.width = this.app.screen.width * 0.01;
    laserBar.anchor.set(0.5);
    laserBar.x = this.player.x;
    laserBar.y = this.player.y - (this.player.height / 2);
    this.app.stage.addChild(laserBar);
    this.laserShots.push(laserBar);
  }

  laserUpdate(time){
    for (let i = this.laserShots.length - 1; i >= 0; i--){
      this.laserShots[i].y -= 0.1 * 20;
    }
  }
}
