import { TestBed } from '@angular/core/testing';

import { RestBackendServiceService } from './rest-backend.service';

describe('RestBackendServiceService', () => {
  let service: RestBackendServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestBackendServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
