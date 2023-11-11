import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardcomComponent } from './dashboardcom.component';

describe('DashboardcomComponent', () => {
  let component: DashboardcomComponent;
  let fixture: ComponentFixture<DashboardcomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardcomComponent]
    });
    fixture = TestBed.createComponent(DashboardcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
