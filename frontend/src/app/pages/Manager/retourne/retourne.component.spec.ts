import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourneComponent } from './retourne.component';

describe('RetourneComponent', () => {
  let component: RetourneComponent;
  let fixture: ComponentFixture<RetourneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RetourneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetourneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
