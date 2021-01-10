import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProyectComponent } from './manage-proyect.component';

describe('ManageProyectComponent', () => {
  let component: ManageProyectComponent;
  let fixture: ComponentFixture<ManageProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProyectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
