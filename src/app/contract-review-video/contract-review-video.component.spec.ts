import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractReviewVideoComponent } from './contract-review-video.component';

describe('ContractReviewVideoComponent', () => {
  let component: ContractReviewVideoComponent;
  let fixture: ComponentFixture<ContractReviewVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractReviewVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractReviewVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
