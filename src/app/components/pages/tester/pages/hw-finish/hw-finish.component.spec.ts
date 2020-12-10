import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HwFinishComponent } from './hw-finish.component';

describe('HwFinishComponent', () => {
  let component: HwFinishComponent;
  let fixture: ComponentFixture<HwFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HwFinishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HwFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
