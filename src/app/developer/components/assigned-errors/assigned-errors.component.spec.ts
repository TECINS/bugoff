import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedErrorsComponent } from './assigned-errors.component';

describe('AssignedErrorsComponent', () => {
  let component: AssignedErrorsComponent;
  let fixture: ComponentFixture<AssignedErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
