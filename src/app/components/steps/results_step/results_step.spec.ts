import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsStep } from './results_step';

describe('ResultsStep', () => {
  let component: ResultsStep;
  let fixture: ComponentFixture<ResultsStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsStep ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
