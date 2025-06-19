import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRestaurantComponent } from './map-restaurant.component';

describe('MapRestaurantComponent', () => {
  let component: MapRestaurantComponent;
  let fixture: ComponentFixture<MapRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
