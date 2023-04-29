import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PttResultsStep } from './ptt_results_step';

describe('PttResultsStep', () => {
  let component: PttResultsStep;
  let fixture: ComponentFixture<PttResultsStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PttResultsStep ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PttResultsStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
