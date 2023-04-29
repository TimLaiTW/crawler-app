import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcardResultsStep } from './dcard_results_step';

describe('DcardResultsStep', () => {
  let component: DcardResultsStep;
  let fixture: ComponentFixture<DcardResultsStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcardResultsStep ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcardResultsStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
