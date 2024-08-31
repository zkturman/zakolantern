import { Component, OnInit } from '@angular/core';
import { CoreGameLogic } from './game-logic/core-game-loop';
import { Router } from '@angular/router';
import { DeviceSizeFinderService } from '../device-size-finder.service';

@Component({
  selector: 'app-passcode-game',
  templateUrl: './passcode-game.component.html',
  styleUrls: ['./passcode-game.component.css'],
})
export class PasscodeGameComponent implements OnInit {
  private gameLogic : CoreGameLogic;
  
  constructor(public router: Router, public deviceSize: DeviceSizeFinderService) { 
    console.log(deviceSize);
    this.gameLogic = new CoreGameLogic(deviceSize);
  }

  async ngOnInit(): Promise<void> {
    window.addEventListener('orientationchange', function(){
      this.window.location.reload();
    });
    let gameScreen = document.getElementsByClassName("game-container")[0];
    let cabinetArt = document.getElementById('cabinet-logo');
    let gameButtons = document.getElementById('game-buttons');
    let gamePad = document.getElementById('gamePad');
    if (this.deviceSize.getIsPhonePortrait()){
      gameScreen.classList.add('phone-portrait');
      cabinetArt.classList.add('phone-portrait');
    }
    else if (this.deviceSize.getIsPhoneLandscape()){
      gameScreen.classList.add('phone-landscape');
      document.getElementById('game-buttons').classList.add('phone-landscape');
    }
    else{
      gameScreen.classList.add('default-size');
      cabinetArt.classList.add('default-size');
    }
    await this.gameLogic.initialiseGame();
    this.gameLogic.gameCompleteTrigger = () => this.completeGame();
  }

  completeGame(){
    console.log(this.router);
    this.router.navigate(['/home']);
  }

  movePlayer(value){
    this.gameLogic.movePlayer(value);
  }

  fireLaser(){
    this.gameLogic.fireLaser();
  }
}
