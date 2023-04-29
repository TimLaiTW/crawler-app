import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcardPage } from './dcard-page';

describe('DcardPage', () => {
  let component: DcardPage;
  let fixture: ComponentFixture<DcardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcardPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
