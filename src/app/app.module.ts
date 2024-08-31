import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule  } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartyHomeComponent } from './party-home/party-home.component';
import { PartyAgendaComponent } from './party-agenda/party-agenda.component';
import { MovieGameComponent } from './movie-game/movie-game.component';
import { GameButtonsComponent } from './passcode-game/game-buttons/game-buttons.component';
import { PasscodeGameComponent } from './passcode-game/passcode-game.component';

@NgModule({
  declarations: [
    AppComponent,
    PartyHomeComponent,
    PartyAgendaComponent,
    MovieGameComponent,
    PasscodeGameComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'home', component: PartyHomeComponent},
      {path: 'game', component: MovieGameComponent},
      {path: 'game/pre', component: PasscodeGameComponent},
      {path: 'agenda', component: PartyAgendaComponent},
      {path: '**', redirectTo: '/home', pathMatch: 'full'}
    ]),
    GameButtonsComponent
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
