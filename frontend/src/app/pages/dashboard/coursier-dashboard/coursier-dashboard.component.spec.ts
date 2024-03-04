import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursierDashboardComponent } from './coursier-dashboard.component';

describe('CoursierDashboardComponent', () => {
  let component: CoursierDashboardComponent;
  let fixture: ComponentFixture<CoursierDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CoursierDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursierDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
