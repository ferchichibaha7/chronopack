import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitComponent } from './transit.component';

describe('TransitComponent', () => {
  let component: TransitComponent;
  let fixture: ComponentFixture<TransitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TransitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
