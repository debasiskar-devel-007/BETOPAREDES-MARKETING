import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingreviewNewComponent } from './marketingreview-new.component';

describe('MarketingreviewNewComponent', () => {
  let component: MarketingreviewNewComponent;
  let fixture: ComponentFixture<MarketingreviewNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingreviewNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingreviewNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
