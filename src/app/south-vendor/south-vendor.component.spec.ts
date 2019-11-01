import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouthVendorComponent } from './south-vendor.component';

describe('SouthVendorComponent', () => {
  let component: SouthVendorComponent;
  let fixture: ComponentFixture<SouthVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouthVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouthVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
