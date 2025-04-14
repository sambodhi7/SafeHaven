import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeeRequestsComponent } from './refugee-requests.component';

describe('RefugeeRequestsComponent', () => {
  let component: RefugeeRequestsComponent;
  let fixture: ComponentFixture<RefugeeRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefugeeRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefugeeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
