import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupComponent } from './pickup.component';

describe('PickupComponent', () => {
  let component: PickupComponent;
  let fixture: ComponentFixture<PickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PickupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
