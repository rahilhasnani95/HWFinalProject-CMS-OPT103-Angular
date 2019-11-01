import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorthVendorComponent } from './north-vendor.component';

describe('NorthVendorComponent', () => {
  let component: NorthVendorComponent;
  let fixture: ComponentFixture<NorthVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorthVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorthVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
