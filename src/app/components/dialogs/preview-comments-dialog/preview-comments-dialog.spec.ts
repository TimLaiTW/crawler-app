import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCommentsDialog } from './preview-comments-dialog';

describe('PreviewCommentsDialog', () => {
  let component: PreviewCommentsDialog;
  let fixture: ComponentFixture<PreviewCommentsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewCommentsDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCommentsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
