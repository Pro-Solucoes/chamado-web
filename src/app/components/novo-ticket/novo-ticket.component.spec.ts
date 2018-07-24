import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoTicketComponent } from './novo-ticket.component';

describe('NovoTicketComponent', () => {
  let component: NovoTicketComponent;
  let fixture: ComponentFixture<NovoTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
