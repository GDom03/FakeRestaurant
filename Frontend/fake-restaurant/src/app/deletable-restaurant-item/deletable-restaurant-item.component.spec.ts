import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletableRestaurantItemComponent } from './deletable-restaurant-item.component';

describe('DeletableRestaurantItemComponent', () => {
  let component: DeletableRestaurantItemComponent;
  let fixture: ComponentFixture<DeletableRestaurantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletableRestaurantItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletableRestaurantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
