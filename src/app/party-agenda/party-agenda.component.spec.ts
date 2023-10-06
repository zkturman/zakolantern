import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyAgendaComponent } from './party-agenda.component';

describe('PartyAgendaComponent', () => {
  let component: PartyAgendaComponent;
  let fixture: ComponentFixture<PartyAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
