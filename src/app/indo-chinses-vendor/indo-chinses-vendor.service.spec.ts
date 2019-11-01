import { TestBed } from '@angular/core/testing';

import { IndoChinsesVendorService } from '../indo-chinses-vendor.service';

describe('IndoChinsesVendorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndoChinsesVendorService = TestBed.get(IndoChinsesVendorService);
    expect(service).toBeTruthy();
  });
});
