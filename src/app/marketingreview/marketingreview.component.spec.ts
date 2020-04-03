import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingreviewComponent } from './marketingreview.component';

describe('MarketingreviewComponent', () => {
  let component: MarketingreviewComponent;
  let fixture: ComponentFixture<MarketingreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
