import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObjectComponent } from './add-object.component';

describe('AddObjectComponent', () => {
  let component: AddObjectComponent;
  let fixture: ComponentFixture<AddObjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddObjectComponent]
    });
    fixture = TestBed.createComponent(AddObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
