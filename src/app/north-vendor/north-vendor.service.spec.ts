import { TestBed } from '@angular/core/testing';

import { NorthVendorService } from './north-vendor.service';

describe('NorthVendorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NorthVendorService = TestBed.get(NorthVendorService);
    expect(service).toBeTruthy();
  });
});
