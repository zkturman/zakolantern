import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-party-home',
  templateUrl: './party-home.component.html',
  styleUrls: ['./party-home.component.css']
})
export class PartyHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enterSite(canEnter: boolean){
    if(canEnter){
      var entryElement = document.getElementById("passcode-entry");
      entryElement.classList.add("completed-passcode");
      entryElement.addEventListener("transitionend", () => this.loadAgenda())
    }
  }

  hidePasscode(){
    var entryElement = document.getElementById("passcode-entry");
    entryElement.classList.add("disabled");
  }

  loadAgenda(){
    this.hidePasscode();
    window.scroll(0,0);
    var agendaElement = document.getElementById("party-agenda");
    agendaElement.classList.remove("disabled");
    agendaElement.classList.add("party-agenda");
    agendaElement.classList.add("agenda-started");
  }
}
