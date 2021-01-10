import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedErrorComponent } from './view-assigned-error.component';

describe('ViewAssignedErrorComponent', () => {
  let component: ViewAssignedErrorComponent;
  let fixture: ComponentFixture<ViewAssignedErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignedErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignedErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
