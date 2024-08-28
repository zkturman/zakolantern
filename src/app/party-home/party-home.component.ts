import { Component, OnInit } from '@angular/core';
import { DeviceSizeFinderService } from '../device-size-finder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-party-home',
  templateUrl: './party-home.component.html',
  styleUrls: ['./party-home.component.css']
})
export class PartyHomeComponent implements OnInit {
  private gamePasscode: Array<string> = [
    'up',
    'up',
    'up',
    'up',
    'up',
    'up',
    'up',
    'up'
  ];
  private agendaPasscode: Array<string> = [
    'up', 
    'left', 
    'left', 
    'down', 
    'up', 
    'right', 
    'left', 
    'right'
  ];
  userCode: Array<string> = [];

  constructor(public deviceSize: DeviceSizeFinderService, public router: Router) { }

  ngOnInit(): void {
    let upArrow = document.getElementById('up-entry-arrow');
    let leftArrow = document.getElementById('left-entry-arrow');
    let rightArrow = document.getElementById('right-entry-arrow');
    let downArrow = document.getElementById('down-entry-arrow');
    document.getElementsByClassName('button-container')[0].addEventListener('contextmenu', (event) => {event.preventDefault(); return false;})
    upArrow.addEventListener('mousedown', () => this.arrowButtonDown(null, 'up'));
    upArrow.addEventListener('touchstart', (event) => {this.arrowButtonDown(event, 'up');});
    upArrow.addEventListener('touchend', (event) => {this.arrowButtonTouchEnd(event);});    
    leftArrow.addEventListener('mousedown', () => this.arrowButtonDown(null, 'left'));
    leftArrow.addEventListener('touchstart', (event) => {this.arrowButtonDown(event, 'left');});
    leftArrow.addEventListener('touchend', (event) => {this.arrowButtonTouchEnd(event);});
    rightArrow.addEventListener('mousedown', () => this.arrowButtonDown(null, 'right'));
    rightArrow.addEventListener('touchstart', (event) => {this.arrowButtonDown(event, 'right');});
    rightArrow.addEventListener('touchend', (event) => {this.arrowButtonTouchEnd(event);});
    downArrow.addEventListener('mousedown', () => this.arrowButtonDown(null, 'down'));
    downArrow.addEventListener('touchstart', (event) => {this.arrowButtonDown(event, 'down');});
    downArrow.addEventListener('touchend', (event) => {this.arrowButtonTouchEnd(event);});

  }

  private arrowButtonDown(event: any, arrowKey: string){
    event?.preventDefault();
    event?.target.classList.add('active');
    this.userCode.push(arrowKey);
    if (this.userCode.length === this.gamePasscode.length){
      this.evaluateCode();
      this.userCode = [];
    }
  }

  private arrowButtonTouchEnd(event: any){
    event?.preventDefault();
    event?.target.classList.remove('active');
  }

  private evaluateCode(){
    if (this.userCode.length === this.gamePasscode.length){
      if (this.userCodeMatchesGivenCode(this.gamePasscode)){
        this.router.navigate(['/game/pre']);
      }
      else if (this.userCodeMatchesGivenCode(this.agendaPasscode)){
        this.router.navigate(['/agenda']);
      }
      else{
        console.log('bad code...');
      }
    }
  }

  private userCodeMatchesGivenCode(passcode: Array<string>): boolean{
    let i = 0;
    let isMatch = false;
    if (this.userCode.length === passcode.length){
      while (i < passcode.length && (this.userCode[i] === passcode[i])){
        i++;
      }
      isMatch = (i == passcode.length);
    }
    return isMatch;
  }
}
