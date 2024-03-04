import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinierDashboardComponent } from './magasinier-dashboard.component';

describe('MagasinierDashboardComponent', () => {
  let component: MagasinierDashboardComponent;
  let fixture: ComponentFixture<MagasinierDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MagasinierDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagasinierDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
