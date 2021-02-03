import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryErrorsComponent } from './history-errors.component';

describe('HistoryErrorsComponent', () => {
  let component: HistoryErrorsComponent;
  let fixture: ComponentFixture<HistoryErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
