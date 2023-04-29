import { TestBed } from '@angular/core/testing';

import { DcardService } from './dcard.service';

describe('DcardService', () => {
  let service: DcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
