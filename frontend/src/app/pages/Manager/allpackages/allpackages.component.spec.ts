import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpackagesComponent } from './allpackages.component';

describe('AllpackagesComponent', () => {
  let component: AllpackagesComponent;
  let fixture: ComponentFixture<AllpackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AllpackagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllpackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
