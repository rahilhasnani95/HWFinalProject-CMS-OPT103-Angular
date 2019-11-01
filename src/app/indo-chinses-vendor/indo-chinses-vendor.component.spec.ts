import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndoChinsesVendorComponent } from './indo-chinses-vendor.component';

describe('IndoChinsesVendorComponent', () => {
  let component: IndoChinsesVendorComponent;
  let fixture: ComponentFixture<IndoChinsesVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndoChinsesVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndoChinsesVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
