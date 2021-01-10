import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsInfoComponent } from './errors-info.component';

describe('ErrorsInfoComponent', () => {
  let component: ErrorsInfoComponent;
  let fixture: ComponentFixture<ErrorsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
