import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcardExecutionStep } from './dcard_execution_step';

describe('DcardExecutionStep', () => {
  let component: DcardExecutionStep;
  let fixture: ComponentFixture<DcardExecutionStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcardExecutionStep ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcardExecutionStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
