import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatioCountryComponent } from './ratio-country.component';

describe('RatioCountryComponent', () => {
  let component: RatioCountryComponent;
  let fixture: ComponentFixture<RatioCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatioCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatioCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
