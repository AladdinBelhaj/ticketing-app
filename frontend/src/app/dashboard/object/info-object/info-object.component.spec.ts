import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoObjectComponent } from './info-object.component';

describe('InfoObjectComponent', () => {
  let component: InfoObjectComponent;
  let fixture: ComponentFixture<InfoObjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoObjectComponent]
    });
    fixture = TestBed.createComponent(InfoObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
