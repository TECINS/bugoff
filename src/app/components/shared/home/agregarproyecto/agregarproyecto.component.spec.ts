import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarproyectoComponent } from './agregarproyecto.component';

describe('AgregarproyectoComponent', () => {
  let component: AgregarproyectoComponent;
  let fixture: ComponentFixture<AgregarproyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarproyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
