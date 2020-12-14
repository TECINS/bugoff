import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricErrorsComponent } from './historic-errors.component';

describe('HistoricErrorsComponent', () => {
  let component: HistoricErrorsComponent;
  let fixture: ComponentFixture<HistoricErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
