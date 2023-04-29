import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkTable } from './link-table';

describe('LinkTable', () => {
  let component: LinkTable;
  let fixture: ComponentFixture<LinkTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkTable ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
