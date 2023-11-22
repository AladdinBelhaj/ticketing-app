import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerTicketComponent } from './answer-ticket.component';

describe('AnswerTicketComponent', () => {
  let component: AnswerTicketComponent;
  let fixture: ComponentFixture<AnswerTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerTicketComponent]
    });
    fixture = TestBed.createComponent(AnswerTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
