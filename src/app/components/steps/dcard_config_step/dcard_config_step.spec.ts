import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcardConfigStep } from './dcard_config_step';

describe('DcardConfigStep', () => {
  let component: DcardConfigStep;
  let fixture: ComponentFixture<DcardConfigStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcardConfigStep ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcardConfigStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
