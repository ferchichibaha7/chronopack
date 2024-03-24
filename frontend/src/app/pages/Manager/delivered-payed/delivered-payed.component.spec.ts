import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredPayedComponent } from './delivered-payed.component';

describe('DeliveredPayedComponent', () => {
  let component: DeliveredPayedComponent;
  let fixture: ComponentFixture<DeliveredPayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DeliveredPayedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveredPayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
