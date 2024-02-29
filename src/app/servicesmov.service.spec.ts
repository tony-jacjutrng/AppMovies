import { TestBed } from '@angular/core/testing';

import { ServicesmovService } from './servicesmov.service';

describe('ServicesmovService', () => {
  let service: ServicesmovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesmovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
