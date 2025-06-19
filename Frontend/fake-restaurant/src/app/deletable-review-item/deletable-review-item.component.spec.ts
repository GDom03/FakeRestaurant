import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletableReviewItemComponent } from './deletable-review-item.component';

describe('DeletableReviewItemComponent', () => {
  let component: DeletableReviewItemComponent;
  let fixture: ComponentFixture<DeletableReviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletableReviewItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletableReviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
