import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DeviceSizeFinderService } from '../device-size-finder.service';

@Component({
  selector: 'app-landing-area',
  templateUrl: './landing-area.component.html',
  styleUrls: ['./landing-area.component.css']
})
export class LandingAreaComponent implements OnInit {
  private answerContainerElement: Element;
  private passcode: Array<string> = [
    'up',
    'up',
    'up',
    'up',
    'up',
    'up',
    'up',
    'up'
  ];
  userCode: Array<string> = [];

  @Output() passcodeCompleteEvent = new EventEmitter<boolean>();

  constructor(public deviceSize: DeviceSizeFinderService) { }

  ngOnInit(): void {
    let upArrow = document.getElementById('up-entry-arrow');
    let leftArrow = document.getElementById('left-entry-arrow');
    let rightArrow = document.getElementById('right-entry-arrow');
    let downArrow = document.getElementById('down-entry-arrow');
    this.answerContainerElement = document.getElementById('answer-container');
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
    if (this.userCode.length === this.passcode.length){
      this.evaluateCode();
      this.userCode = [];
    }
  }

  private arrowButtonTouchEnd(event: any){
    event?.preventDefault();
    event?.target.classList.remove('active');
  }

  private evaluateCode(){
    if (this.userCode.length === this.passcode.length){
      let i = 0;
      let isMatch = true;
      while (i < this.passcode.length && isMatch){
        if (this.userCode[i] !== this.passcode[i]){
          isMatch = false;
        }
        i++;
      }
      if (isMatch){
        this.passcodeCompleteEvent.emit(true);
        console.log('woohoo');
      }
      else{
        console.log('failure');
      }
    }
  }
}
