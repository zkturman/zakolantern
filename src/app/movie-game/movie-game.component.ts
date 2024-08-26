import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { CoreGameLogic } from './game-logic/core-game-loop';

@Component({
  selector: 'app-movie-game',
  templateUrl: './movie-game.component.html',
  styleUrls: ['./movie-game.component.css']
})
export class MovieGameComponent implements OnInit {
  private gameLogic : CoreGameLogic;
  
  constructor() { 
    this.gameLogic = new CoreGameLogic();
  }

  async ngOnInit(): Promise<void> {
    window.addEventListener('orientationchange', function(){
      this.window.location.reload();
    });
    await this.gameLogic.initialiseGame();
  }

  movePlayer(value){
    this.gameLogic.movePlayer(value);
  }

  fireLaser(){
    this.gameLogic.fireLaser();
  }
}
