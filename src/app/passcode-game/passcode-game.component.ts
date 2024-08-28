import { Component, OnInit } from '@angular/core';
import { CoreGameLogic } from './game-logic/core-game-loop';

@Component({
  selector: 'app-passcode-game',
  templateUrl: './passcode-game.component.html',
  styleUrls: ['./passcode-game.component.css']
})
export class PasscodeGameComponent implements OnInit {
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
