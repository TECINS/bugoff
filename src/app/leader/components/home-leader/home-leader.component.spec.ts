import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLeaderComponent } from './home-leader.component';

describe('HomeLeaderComponent', () => {
  let component: HomeLeaderComponent;
  let fixture: ComponentFixture<HomeLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
