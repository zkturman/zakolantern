import * as PIXI from 'pixi.js';
import { PlayerController } from './player-controller';
import { LaserController } from './laser-controller';
import { EnemyController } from './enemy-controller';
import { DeviceSizeFinderService } from 'src/app/device-size-finder.service';

export class CoreGameLogic{
  private isGameComplete: boolean = false;
  private app: PIXI.Application;
  private arrowAnswers = ['up', 'left', 'left', 'down', 'up', 'right', 'left', 'right'];
  private player: PlayerController;
  private laserController: LaserController;
  private enemyController: EnemyController;
  public gameCompleteTrigger: () => void;
  
  constructor(public deviceSize: DeviceSizeFinderService){
    this.app = new PIXI.Application();
  }

  public async initialiseGame(){
    await this.createCanvas();

    this.enemyController = new EnemyController(this.app);
    await this.enemyController.create();
    let targetNumber = 4;
    let targetWidth = this.app.screen.width / 1.5 / targetNumber;
    for (let i = 0; i < targetNumber; i++){
      this.enemyController.createInstance(targetWidth * i + (targetWidth / 2), this.app.screen.height * 0.2);
    }
    for (let i = 0; i < targetNumber; i++){
      let offset = (targetWidth / 2) + (this.app.screen.width - (this.app.screen.width / 1.5));
      this.enemyController.createInstance(targetWidth * i + offset, this.app.screen.height * 0.4);
    }
    for (let i = 0; i < this.arrowAnswers.length; i++){
      this.enemyController.getInstance(i).arrowKey = this.arrowAnswers[i];
    }
    this.player = new PlayerController(this.app);
    await this.player.create();
    this.laserController = new LaserController(this.app);
    await this.laserController.create();
    this.app.ticker.add((time) => this.gameUpdate(time));
  }

  private async createCanvas(){
    let gameScreen = document.getElementsByClassName("game-container")[0];
    console.log('here');
    await this.app.init({
      width: gameScreen.clientWidth,
      height: gameScreen.clientHeight,
      background: '#000300'
    });
    gameScreen.appendChild(this.app.canvas);
  } 
  
  private gameUpdate(delta){
    if (!this.isGameComplete){
      this.player.update(delta);
      this.laserController.update(delta);
      this.enemyController.update(delta);
      this.laserUpdate();
      this.isGameComplete = this.enemyController.totalEnemies() == 0;
      if (this.isGameComplete){
        this.gameCompleteTrigger();
      }
    }
  }

  public movePlayer(value){
    this.player.move(value);
  }
  
  public fireLaser(){
    this.laserController.createInstance(this.player);
  }
  
  private laserUpdate(){
    for (let i = this.laserController.getTotalShots() - 1; i >= 0; i--){
      for (let j = 0; j < this.enemyController.totalEnemies(); j++){
        let laserSprite = this.laserController.getInstance(i);
        let enemySprite = this.enemyController.getInstance(j).sprite;
        let laserY = laserSprite.y;
        let enemyYMin = enemySprite.y - (enemySprite.height / 2);
        let enemyYMax = enemySprite.y + (enemySprite.height / 2);
        if (laserY > enemyYMin && laserY < enemyYMax){
          let laserX = laserSprite.x;
          let enemyXMin = enemySprite.x - (enemySprite.width / 2);
          let enemyXMax = enemySprite.x + (enemySprite.width / 2);
          if (laserX > enemyXMin && laserX < enemyXMax){
            this.laserController.destroyInstance(i);
            this.enemyController.destroyInstance(j);
            j--;
            break;
          }
        }  
      }
    }
  }
} 