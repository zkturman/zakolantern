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
  private playableZones: number = 6;
  public gameCompleteTrigger: () => void;
  
  constructor(public deviceSize: DeviceSizeFinderService){
    this.app = new PIXI.Application();
  }

  public async initialiseGame(){
    await this.createCanvas();

    this.enemyController = new EnemyController(this.app, this.deviceSize);
    this.enemyController.BossY = (this.app.screen.height * (2 / this.playableZones))
    await this.enemyController.create();
    let targetNumber = 4;
    let targetWidth = this.app.screen.width / 1.5 / targetNumber;
    for (let i = 0; i < targetNumber; i++){
      this.enemyController.createInstance(targetWidth * i + (targetWidth / 2), this.app.screen.height * (3 / this.playableZones));
    }
    for (let i = 0; i < targetNumber; i++){
      let offset = (targetWidth / 2) + (this.app.screen.width - (this.app.screen.width / 1.5));
      this.enemyController.createInstance(targetWidth * i + offset, this.app.screen.height * (4 / this.playableZones));
    }
    this.enemyController.ArrowY = (this.app.screen.height * (6 / this.playableZones));
    this.enemyController.BossY = (this.app.screen.height * (3 / this.playableZones))
    for (let i = 0; i < this.arrowAnswers.length; i++){
      this.enemyController.getInstance(i).arrowKey = this.arrowAnswers[i];
    }
    this.player = new PlayerController(this.app, this.deviceSize);
    await this.player.create();
    this.player.setPosition(this.app.screen.width / 2, this.app.screen.height * (5/ 6));
    this.laserController = new LaserController(this.app, this.deviceSize);
    await this.laserController.create();
    this.app.ticker.add((time) => this.gameUpdate(time));
  }

  private async createCanvas(){
    let gameScreen = document.getElementsByClassName("game-container")[0];
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
      this.isGameComplete = this.enemyController.getFinalBoss() === null;
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
      let laserSprite = this.laserController.getInstance(i);
      for (let j = 0; j < this.enemyController.totalEnemies(); j++){
        let enemySprite = this.enemyController.getInstance(j).sprite;
        if (this.isLaserEnemyCollision(laserSprite, enemySprite)){
            this.laserController.destroyInstance(i);
            this.enemyController.destroyInstance(j);
            j--;
            break;
          }
      }
    }
    for (let i = this.laserController.getTotalShots() -1; i >= 0; i--){
      let laserSprite = this.laserController.getInstance(i);
      if (this.enemyController.totalEnemies() == 0){
        let finalBoss = this.enemyController.getFinalBoss();
        if (finalBoss != null){
          if (this.isLaserEnemyCollision(laserSprite, finalBoss.data.sprite)){
            this.laserController.destroyInstance(i);
            finalBoss.reduceHealth();
          }
        }
      }
    }
  }

  private isLaserEnemyCollision(laserSprite, enemySprite): boolean{
    let laserY = laserSprite.y;
    let laserX = laserSprite.x;
    let enemyYMin = enemySprite.y - (enemySprite.height / 2);
    let enemyYMax = enemySprite.y + (enemySprite.height / 2);
    let enemyXMin = enemySprite.x - (enemySprite.width / 2);
    let enemyXMax = enemySprite.x + (enemySprite.width / 2);
    return (laserY > enemyYMin && laserY < enemyYMax)
      && (laserX > enemyXMin && laserX < enemyXMax); 
  }
} 