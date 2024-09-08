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
  isDefaultDeviceSize: boolean;
  
  constructor(public router: Router, public deviceSize: DeviceSizeFinderService) { 
    this.gameLogic = new CoreGameLogic(deviceSize);
  }

  async ngOnInit(): Promise<void> {
    window.addEventListener('orientationchange', function(){
      this.window.location.reload();
    });
    this.isDefaultDeviceSize = this.deviceSize.getIsDefault([
      this.deviceSize.getIsPhonePortrait(),
      this.deviceSize.getIsPhoneLandscape()
    ])
    let gameScreen = document.getElementsByClassName("game-container")[0];
    if (this.deviceSize.getIsPhonePortrait()){
      gameScreen.classList.add('phone-portrait');
    }
    else if (this.deviceSize.getIsPhoneLandscape()){
      gameScreen.classList.add('phone-landscape');
    }
    else{
      gameScreen.classList.add('default-size');
    }
    await this.gameLogic.initialiseGame();
    this.gameLogic.gameCompleteTrigger = () => this.completeGame();
  }

  completeGame(){
    let component = document.getElementsByClassName('game-parent')[0];
    component.classList.add('game-complete');
    component.addEventListener('transitionend', () => {this.router.navigate(['/home']);});
  }

  movePlayer(value){
    this.gameLogic.movePlayer(value);
  }

  fireLaser(){
    this.gameLogic.fireLaser();
  }
}
