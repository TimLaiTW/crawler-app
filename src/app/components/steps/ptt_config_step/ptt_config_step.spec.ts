import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PttConfigStep } from './ptt_config_step';

describe('PttConfigStep', () => {
  let component: PttConfigStep;
  let fixture: ComponentFixture<PttConfigStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PttConfigStep ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PttConfigStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
