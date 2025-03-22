import { TestBed } from '@angular/core/testing';

import { IbgService } from './ibg.service';

describe('IbgService', () => {
  let service: IbgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
