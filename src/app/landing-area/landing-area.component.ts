import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DeviceSizeFinderService } from '../device-size-finder.service';

@Component({
  selector: 'app-landing-area',
  templateUrl: './landing-area.component.html',
  styleUrls: ['./landing-area.component.css']
})
export class LandingAreaComponent implements OnInit {
  passcode: Array<string> = [
    "D",
    "O",
    "O",
    "M",
    "W",
    "E",
    "A",
    "V",
    "E",
    "R"
  ];

  @Output() passcodeCompleteEvent = new EventEmitter<boolean>();

  constructor(public deviceSize: DeviceSizeFinderService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    document.getElementById("char-0").focus();
  }

  onCodeInput(event: any, index: number){
    if (this.passcode[index] == event.target.value.toUpperCase()){
      if (index < this.passcode.length - 1){
        this.focusNextElement(index);
      }
      if (index == this.passcode.length - 1){
        this.passcodeCompleteEvent.emit(true);
      }
    }
  }

  onBackspace(event: any, index: number){
    var previousIndex: number = index - 1;
    var currentElement = document.getElementById("char-" + index.toString()) as any;
    var shouldGoToPreviousElement = event.key === 'Backspace' && (currentElement.value.toUpperCase() === this.passcode[index] || currentElement.value === "");
     if (shouldGoToPreviousElement && previousIndex >= 0){
      currentElement.value = "";
      currentElement.disabled = true;
      var previousElement = document.getElementById("char-" + previousIndex.toString()) as any; 
      previousElement.focus();
      previousElement.select();
    }

  }

  focusNextElement(currentIndex: number){
    var nextIndex: number = currentIndex + 1;
    (document.getElementById("char-" + nextIndex.toString()) as any).disabled = false;
    document.getElementById("char-" + nextIndex.toString()).focus();
  }

}
