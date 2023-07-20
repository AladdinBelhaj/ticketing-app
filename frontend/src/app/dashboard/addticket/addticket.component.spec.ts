import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddticketComponent } from './addticket.component';

describe('AddticketComponent', () => {
  let component: AddticketComponent;
  let fixture: ComponentFixture<AddticketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddticketComponent]
    });
    fixture = TestBed.createComponent(AddticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
