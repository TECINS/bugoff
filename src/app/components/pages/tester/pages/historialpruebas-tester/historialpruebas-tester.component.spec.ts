import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialpruebasTesterComponent } from './historialpruebas-tester.component';

describe('HistorialpruebasTesterComponent', () => {
  let component: HistorialpruebasTesterComponent;
  let fixture: ComponentFixture<HistorialpruebasTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialpruebasTesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialpruebasTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
