import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HwEditComponent } from './hw-edit.component';

describe('HwEditComponent', () => {
  let component: HwEditComponent;
  let fixture: ComponentFixture<HwEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HwEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HwEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
