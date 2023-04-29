import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PttPage } from './ptt-page';

describe('PttPage', () => {
  let component: PttPage;
  let fixture: ComponentFixture<PttPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PttPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PttPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
