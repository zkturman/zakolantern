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
      document.getElementById("passcode-entry").classList.add("completed-passcode");
      console.log("Entering website");
    }
  }
}
