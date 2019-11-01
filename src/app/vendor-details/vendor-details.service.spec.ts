import { TestBed } from '@angular/core/testing';

import { VendorDetailsService } from './vendor-details.service';

describe('VendorDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorDetailsService = TestBed.get(VendorDetailsService);
    expect(service).toBeTruthy();
  });
});
