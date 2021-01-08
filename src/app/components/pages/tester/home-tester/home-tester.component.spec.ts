import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTesterComponent } from './home-tester.component';

describe('HomeTesterComponent', () => {
  let component: HomeTesterComponent;
  let fixture: ComponentFixture<HomeTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
