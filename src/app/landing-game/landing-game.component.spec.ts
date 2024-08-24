import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingGameComponent } from './landing-game.component';

describe('LandingGameComponent', () => {
  let component: LandingGameComponent;
  let fixture: ComponentFixture<LandingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
