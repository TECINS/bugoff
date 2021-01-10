import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeveloperComponent } from './home-developer.component';

describe('HomeDeveloperComponent', () => {
  let component: HomeDeveloperComponent;
  let fixture: ComponentFixture<HomeDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDeveloperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
