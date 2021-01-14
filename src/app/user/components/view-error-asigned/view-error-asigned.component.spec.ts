import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewErrorAsignedComponent } from './view-error-asigned.component';

describe('ViewErrorAsignedComponent', () => {
  let component: ViewErrorAsignedComponent;
  let fixture: ComponentFixture<ViewErrorAsignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewErrorAsignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewErrorAsignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
