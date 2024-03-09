import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnAttenteComponent } from './en-attente.component';

describe('EnAttenteComponent', () => {
  let component: EnAttenteComponent;
  let fixture: ComponentFixture<EnAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EnAttenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
