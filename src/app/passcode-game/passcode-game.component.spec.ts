import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasscodeGameComponent } from './passcode-game.component';

describe('PasscodeGameComponent', () => {
  let component: PasscodeGameComponent;
  let fixture: ComponentFixture<PasscodeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasscodeGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasscodeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
