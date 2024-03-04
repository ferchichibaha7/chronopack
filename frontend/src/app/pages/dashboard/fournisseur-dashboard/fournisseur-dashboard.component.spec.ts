import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurDashboardComponent } from './fournisseur-dashboard.component';

describe('FournisseurDashboardComponent', () => {
  let component: FournisseurDashboardComponent;
  let fixture: ComponentFixture<FournisseurDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FournisseurDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseurDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
